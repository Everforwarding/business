#!/usr/bin/env node
import QRCode from 'qrcode'
import fs from 'fs'

const [,, url, output] = process.argv
if (!url) {
  console.error('Usage: node tools/gen-qr.js <url> [output]')
  process.exit(1)
}

const outFile = output || 'public/qrcode.png'
await fs.promises.mkdir('public', { recursive: true })

try {
  await QRCode.toFile(outFile, url, {
    type: 'png',
    width: 400,
    margin: 2,
  })
  console.log('QR generated at', outFile)
} catch (err) {
  console.error('QR generation failed:', err)
  process.exit(2)
}
