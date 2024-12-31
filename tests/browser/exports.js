/* globals matchiz */

/**
 * A post-build test to ensure that the browser-build has the same
 * "exports" on the `matchiz` variable that the CJS/ESM libs do.
 */

const fs = require('fs')

const browserSrc = fs.readFileSync('./dist/match-iz.browser.js', 'utf8')
eval(browserSrc)

const srcLib = require('../../dist/index.js')
const srcDateLib = require('../../dates/index.js')
const srcExports = Object.keys(srcLib)
const srcDateExports = Object.keys(srcDateLib)
const browserExports = Object.keys(matchiz)

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

const srcDateUtcLib = require('../../dates/utc/index.js')
const srcDateUtcExports = Object.keys(srcDateUtcLib)
const browserUtcExports = Object.keys(matchiz.utc)

srcDateUtcExports.forEach(exp => {
  if (!browserUtcExports.includes(exp)) {
    console.error(`./src/browser.mjs is missing "dates/utc" export: ${exp}`)
    returnCode = 1
  }
})

process.exit(returnCode)
