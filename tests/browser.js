/* globals matchiz */
const fs = require('fs')
const srcLib = require('../dist/index.js')
const srcDateLib = require('../dates/index.js')
const srcDateUtcLib = require('../dates/utc/index.js')

const browserSrc = fs.readFileSync('./dist/match-iz.browser.js', 'utf8')
eval(browserSrc)

const srcExports = Object.keys(srcLib)
const srcDateExports = Object.keys(srcDateLib)
const srcDateUtcExports = Object.keys(srcDateUtcLib)

const browserExports = Object.keys(matchiz)
const browserUtcExports = Object.keys(matchiz.utc)

let returnCode = 0

srcExports.forEach(exp => {
  if (!browserExports.includes(exp)) {
    console.error(`./src/browser.mjs is missing "root" export: ${exp}`)
    returnCode = 1
  }
})

srcDateExports.forEach(exp => {
  if (!browserExports.includes(exp)) {
    console.error(`./src/browser.mjs is missing "dates" export: ${exp}`)
    returnCode = 1
  }
})

srcDateUtcExports.forEach(exp => {
  if (!browserUtcExports.includes(exp)) {
    console.error(`./src/browser.mjs is missing "dates/utc" export: ${exp}`)
    returnCode = 1
  }
})

process.exit(returnCode)
