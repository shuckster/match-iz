/* globals matchiz */
const fs = require('fs')
const srcLib = require('../dist/index.js')

const browserSrc = fs.readFileSync('./dist/match-iz.browser.js', 'utf8')
eval(browserSrc)

const srcExports = Object.keys(srcLib).sort()
const browserExports = Object.keys(matchiz).sort()

let returnCode = 0

srcExports.forEach(exp => {
  if (!browserExports.includes(exp)) {
    console.error(`./src/browser.mjs is missing export: ${exp}`)
    returnCode = 1
  }
})

process.exit(returnCode)
