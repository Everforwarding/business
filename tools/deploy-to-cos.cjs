const fs = require('fs')
const path = require('path')
const mime = require('mime')
const COS = require('cos-nodejs-sdk-v5')

function walk(dir, filelist = [], base = dir) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    if (stat.isDirectory()) {
      walk(filepath, filelist, base)
    } else {
      filelist.push({ path: filepath, relative: path.relative(base, filepath).replace(/\\/g, '/') })
    }
  })
  return filelist
}

async function main() {
  const distDir = path.join(__dirname, '..', 'dist')
  if (!fs.existsSync(distDir)) {
    console.error('dist 目录不存在，请先运行 `npm run build`')
    process.exit(1)
  }

  const SECRET_ID = process.env.TENCENT_SECRET_ID
  const SECRET_KEY = process.env.TENCENT_SECRET_KEY
  const REGION = process.env.TENCENT_REGION || process.env.TENCENT_REGION_NAME
  const BUCKET = process.env.TENCENT_BUCKET // e.g. my-bucket-1234567890
  const PREFIX = process.env.TENCENT_FOLDER || '' // optional folder prefix in bucket

  if (!SECRET_ID || !SECRET_KEY || !REGION || !BUCKET) {
    console.error('请先设置环境变量：TENCENT_SECRET_ID, TENCENT_SECRET_KEY, TENCENT_REGION, TENCENT_BUCKET')
    process.exit(1)
  }

  const cos = new COS({ SecretId: SECRET_ID, SecretKey: SECRET_KEY })

  const files = walk(distDir).filter(f => {
    // 排除 .git 目录
    if (f.relative.startsWith('.git/') || f.relative === '.git') return false
    return true
  })
  console.log(`准备上传 ${files.length} 个文件到 COS 存储桶 ${BUCKET}（区域 ${REGION}）`)

  const mimeTypeGetter = mime.getType || mime.lookup || mime

  for (const f of files) {
    const key = (PREFIX ? (PREFIX.replace(/(^\/|\/\$)/g, '') + '/') : '') + f.relative
    const contentType = (typeof mimeTypeGetter === 'function' ? mimeTypeGetter(f.path) : 'application/octet-stream') || 'application/octet-stream'
    const body = fs.readFileSync(f.path)

    // set shorter cache for HTML and index, longer for assets
    let cacheControl = 'public, max-age=3600'
    if (/\\.html?$/.test(f.path)) cacheControl = 'no-cache'
    if (/\\.(?:js|css|png|jpg|jpeg|webp|svg|gif)$/.test(f.path)) cacheControl = 'public, max-age=31536000'

    console.log(`上传: ${f.relative} -> ${key} [${contentType}]`)
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: BUCKET,
        Region: REGION,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: cacheControl,
      }, function (err, data) {
        if (err) {
          console.error('上传失败', f.relative, err)
          return reject(err)
        }
        // console.log('上传成功', data.Location)
        resolve(data)
      })
    })
  }

  console.log('文件上传完成。请在腾讯云 COS 控制台确认文件为公有读，或在 CDN 设置中接入该 Bucket。')
}

main().catch(err => { console.error(err); process.exit(1) })
