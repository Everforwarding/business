/**
 * ===================================================
 *  release.cjs — 一键发布脚本
 * ===================================================
 *
 * 功能：
 *   1. 构建项目（npm run build）
 *   2. 提交代码变更并推送到 GitHub（自动触发 EdgeOne Pages 部署）
 *   3. 同步推送代码到 Gitee
 *   4. 上传构建产物（dist/）到腾讯云 COS 存储桶
 *
 * 使用方式：
 *   node tools/release.cjs "你的提交信息"
 *   node tools/release.cjs                # 跳过 git 提交，仅构建 + COS 上传
 *
 * 环境变量（从项目根目录 .env.deploy 读取）：
 *   TENCENT_SECRET_ID     腾讯云 API 密钥 ID
 *   TENCENT_SECRET_KEY    腾讯云 API 密钥 Key
 *   TENCENT_REGION        COS 存储桶区域（如 ap-guangzhou）
 *   TENCENT_BUCKET        COS 存储桶名称
 *   TENCENT_FOLDER        （可选）存储桶内子目录前缀
 *
 * 前置条件：
 *   - Git 已配置好 origin（Gitee）和 github 两个远程仓库
 *   - .env.deploy 文件中已填写腾讯云 COS 凭证
 *   - 项目依赖已安装（node_modules 存在）
 * ===================================================
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ===========================================
// 0. 工具函数
// ===========================================

/** 项目根目录 */
const ROOT = path.join(__dirname, '..')

/** 带颜色的日志输出 */
const log = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[OK]\x1b[0m   ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
  error: (msg) => console.log(`\x1b[31m[ERR]\x1b[0m  ${msg}`),
  step: (msg) => console.log(`\n\x1b[1m\x1b[35m>>> ${msg}\x1b[0m\n`),
}

/**
 * 从 .env.deploy 文件加载环境变量到 process.env
 * 仅当该环境变量尚未设置时才覆盖
 */
function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) {
    log.warn(`未找到环境变量文件: ${envPath}，将使用系统环境变量`)
    return
  }
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    // 跳过空行和注释行
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let val = trimmed.slice(idx + 1).trim()
    // 去除首尾引号
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    // 不覆盖已有的环境变量
    if (key && !process.env[key]) {
      process.env[key] = val
    }
  }
  log.info(`已加载环境变量文件: ${envPath}`)
}

/**
 * 检查必需的环境变量，缺失则退出
 */
function requireEnv(...names) {
  const missing = names.filter(n => !process.env[n])
  if (missing.length > 0) {
    log.error(`缺少必需的环境变量: ${missing.join(', ')}`)
    log.info('请在项目根目录的 .env.deploy 文件中配置，或设置系统环境变量')
    process.exit(1)
  }
}

// ===========================================
// 1. 构建项目
// ===========================================

function buildProject() {
  log.step('步骤 1/4：构建项目')

  // 检查 node_modules 是否存在
  if (!fs.existsSync(path.join(ROOT, 'node_modules'))) {
    log.warn('node_modules 不存在，正在安装依赖...')
    execSync('npm install', { stdio: 'inherit', cwd: ROOT })
    log.success('依赖安装完成')
  }

  log.info('开始构建 (npm run build)...')
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT })
    log.success('项目构建成功')
  } catch (err) {
    log.error(`构建失败: ${err.message}`)
    process.exit(1)
  }

  // 验证 dist 目录
  const distDir = path.join(ROOT, 'dist')
  if (!fs.existsSync(distDir)) {
    log.error('dist 目录不存在，构建可能未产生输出')
    process.exit(1)
  }
  const distFiles = fs.readdirSync(distDir).length
  log.info(`dist 目录包含 ${distFiles} 个文件/文件夹`)
}

// ===========================================
// 2. Git 提交 & 推送代码
// ===========================================

function gitPush(commitMessage) {
  log.step('步骤 2/4：提交并推送代码到远程仓库')

  // 2a. 检查是否有未提交的变更
  let hasChanges = false
  try {
    const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' })
    // 过滤掉 dist/ 目录的变更（dist 由构建产生，不应提交源码仓库）
    const filtered = status
      .split(/\r?\n/)
      .filter(line => line.trim() && !line.includes(' dist/'))
      .join('\n')
    if (filtered.trim()) {
      hasChanges = true
      if (!commitMessage) {
        log.warn('检测到未提交的代码变更，但未提供提交信息，将跳过 Git 提交步骤')
        log.info('如需提交，请使用: node tools/release.cjs "你的提交信息"')
      }
    } else {
      log.info('工作区无代码变更，跳过 Git 提交')
    }
  } catch (err) {
    log.error(`Git 状态检查失败: ${err.message}`)
    process.exit(1)
  }

  // 2b. 如果有变更且提供了提交信息，执行提交
  if (hasChanges && commitMessage) {
    log.info(`提交信息: "${commitMessage}"`)
    try {
      // 添加所有变更（排除 dist）
      execSync('git add .', { stdio: 'inherit', cwd: ROOT })
      execSync('git reset -- dist/ 2>/dev/null || true', { cwd: ROOT })
      execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit', cwd: ROOT })
      log.success('代码已提交')
    } catch (err) {
      log.error(`Git 提交失败: ${err.message}`)
      process.exit(1)
    }
  }

  // 2c. 推送到 GitHub（触发 EdgeOne Pages 自动部署）
  log.info('推送到 GitHub (origin: github)...')
  try {
    // 检查 github 远程仓库是否存在
    const remotes = execSync('git remote', { cwd: ROOT, encoding: 'utf8' })
    if (remotes.includes('github')) {
      execSync('git push github main', { stdio: 'inherit', cwd: ROOT })
      log.success('已推送到 GitHub — EdgeOne Pages 将自动部署')
    } else {
      log.warn('未配置 github 远程仓库，跳过 GitHub 推送')
    }
  } catch (err) {
    log.error(`GitHub 推送失败: ${err.message}`)
    log.warn('请检查 GitHub 远程仓库配置: git remote -v')
  }

  // 2d. 推送到 Gitee
  log.info('推送到 Gitee (origin)...')
  try {
    execSync('git push origin main', { stdio: 'inherit', cwd: ROOT })
    log.success('已推送到 Gitee')
  } catch (err) {
    log.error(`Gitee 推送失败: ${err.message}`)
    log.warn('请检查 Gitee 远程仓库配置')
  }
}

// ===========================================
// 3. 生成站点地图（可选后处理）
// ===========================================

function generateSitemap() {
  log.step('步骤 3/4：生成站点地图')

  try {
    execSync('node tools/generate-sitemap.cjs', { stdio: 'inherit', cwd: ROOT })
    log.success('sitemap.xml 已生成')
  } catch (err) {
    log.warn(`站点地图生成失败（非致命）: ${err.message}`)
  }
}

// ===========================================
// 4. 上传到腾讯云 COS 存储桶
// ===========================================

function uploadToCOS() {
  log.step('步骤 4/4：上传构建产物到腾讯云 COS')

  // 4a. 检查 COS 凭证环境变量
  requireEnv('TENCENT_SECRET_ID', 'TENCENT_SECRET_KEY', 'TENCENT_REGION', 'TENCENT_BUCKET')

  const distDir = path.join(ROOT, 'dist')
  const COS = require('cos-nodejs-sdk-v5')
  const mime = require('mime')

  const SECRET_ID = process.env.TENCENT_SECRET_ID
  const SECRET_KEY = process.env.TENCENT_SECRET_KEY
  const REGION = process.env.TENCENT_REGION
  const BUCKET = process.env.TENCENT_BUCKET
  const PREFIX = (process.env.TENCENT_FOLDER || '').replace(/(^\/|\/$)/g, '')

  // 4b. 初始化 COS 实例
  const cos = new COS({ SecretId: SECRET_ID, SecretKey: SECRET_KEY })

  // 4c. 递归收集 dist 目录中的所有文件
  function walk(dir, filelist = [], base = dir) {
    const entries = fs.readdirSync(dir)
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath, filelist, base)
      } else {
        filelist.push({
          absPath: fullPath,
          relPath: path.relative(base, fullPath).replace(/\\/g, '/'),
        })
      }
    }
    return filelist
  }

  const files = walk(distDir)
  log.info(`准备上传 ${files.length} 个文件到存储桶 ${BUCKET} (区域: ${REGION})`)

  // 4d. 逐个上传文件
  let uploaded = 0
  let failed = 0

  for (const file of files) {
    // 构建 COS 对象 Key：前缀 + 相对路径
    const key = PREFIX ? `${PREFIX}/${file.relPath}` : file.relPath

    // 根据文件类型设置 MIME
    const contentType = mime.getType(file.absPath) || 'application/octet-stream'

    // 根据文件类型设置缓存策略
    let cacheControl = 'public, max-age=3600'                  // 默认 1 小时
    if (/\.html?$/.test(file.absPath)) cacheControl = 'no-cache' // HTML 不缓存
    if (/\.(?:js|css|png|jpg|jpeg|webp|svg|gif|ico|woff2?)$/.test(file.absPath)) {
      cacheControl = 'public, max-age=31536000'                // 静态资源缓存 1 年
    }

    const body = fs.readFileSync(file.absPath)

    // 同步上传（避免并发过高）
    try {
      cos.putObject({
        Bucket: BUCKET,
        Region: REGION,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: cacheControl,
      })
      uploaded++
      log.info(`  ✓ ${file.relPath} → ${key} [${contentType}]`)
    } catch (err) {
      failed++
      log.error(`  ✗ ${file.relPath} 上传失败: ${err.message || err}`)
    }
  }

  // 4e. 上传结果汇总
  console.log('')
  if (failed === 0) {
    log.success(`全部 ${uploaded} 个文件上传成功`)
  } else {
    log.warn(`上传完成: ${uploaded} 成功, ${failed} 失败`)
  }
  log.info('请在腾讯云 COS 控制台确认文件为公有读，或已配置 CDN 加速')
}

// ===========================================
// 主流程
// ===========================================

function main() {
  console.log(`
\x1b[1m\x1b[36m  ╔══════════════════════════════════╗
  ║     🚀 一键发布脚本  release.cjs    ║
  ╚══════════════════════════════════╝\x1b[0m
`)

  const startTime = Date.now()

  // 0. 加载环境变量（.env.deploy 优先，系统环境变量次之）
  loadEnvFile(path.join(ROOT, '.env.deploy'))

  // 获取提交信息（命令行参数）
  const commitMessage = process.argv[2] || ''

  // 1. 构建项目
  buildProject()

  // 2. Git 提交 & 推送（GitHub → 自动触发 EdgeOne Pages 部署）
  gitPush(commitMessage)

  // 3. 生成站点地图
  generateSitemap()

  // 4. 上传到腾讯云 COS
  uploadToCOS()

  // 完成
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n\x1b[1m\x1b[32m  ✅ 全部完成！耗时 ${elapsed}s\x1b[0m\n`)
}

// 启动
main().catch(err => {
  log.error(`脚本异常: ${err.message}`)
  console.error(err)
  process.exit(1)
})
