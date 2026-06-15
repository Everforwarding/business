const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function loadEnv(file) {
  if (!fs.existsSync(file)) return
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const l = line.trim()
    if (!l || l.startsWith('#')) continue
    const idx = l.indexOf('=')
    if (idx === -1) continue
    const key = l.slice(0, idx).trim()
    let val = l.slice(idx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (key) process.env[key] = val
  }
}

const root = path.join(__dirname, '..')
const envFile = path.join(root, '.env.deploy')
loadEnv(envFile)

try {
  console.log('运行构建...')
  execSync('npm run build', { stdio: 'inherit', cwd: root })
} catch (err) {
  console.error('构建失败:', err && err.message ? err.message : err)
  process.exit(1)
}

try {
  console.log('开始上传到腾讯 COS...')
  execSync('node tools/deploy-to-cos.cjs', { stdio: 'inherit', cwd: root })
  console.log('部署完成。')
} catch (err) {
  console.error('部署失败:', err && err.message ? err.message : err)
  process.exit(1)
}
