//
// Build with esbuild
//

import fs from 'fs'
import esbuild from 'esbuild'
import { moduleTypes, optionsFrom } from './common.mjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

const { outputs, addBanner, globalName } = optionsFrom(pkg)
import { match, when, otherwise, defined } from '../src/match-iz.mjs'

function main() {
  Promise.all(outputs.map(buildModule))
}

function buildModule({ src, dist, format, module }) {
  const buildOptions = {
    entryPoints: [src],
    format,
    ...match(format)(
      when('iife')({
        platform: 'browser',
        globalName: pkg.browserGlobalName ?? globalName
      }),
      otherwise({ platform: 'node' })
    ),
    target: ['es6'],
    minify: true,
    bundle: true,
    write: false
  }

  return esbuild
    .build(buildOptions)
    .then(getConcatenatedEsbuildContent)
    .then($ => new TextDecoder().decode($))
    .then(addBanner)
    .then(writeTextFile(dist))
    .then(writePackageJson({ module, format }))
}

function writePackageJson({ module, format }) {
  return () =>
    match({ module, format })(
      when({ module: defined, format: Object.keys(moduleTypes) })(() =>
        writeTextFile(module)(makePackageJsonForType(format))
      )
    )
}

function makePackageJsonForType(type = 'esm') {
  return `{ "type": "${moduleTypes[type]}" }\n`
}

//
// Helpers
//

function getConcatenatedEsbuildContent(build) {
  return mergeTypedArrays(
    build.outputFiles.map(out => out.contents),
    Uint8Array
  )
}

// https://stackoverflow.com/a/56993335/127928
const mergeTypedArrays = (arrays, type = Uint8Array) => {
  const result = new type(arrays.reduce((acc, arr) => acc + arr.byteLength, 0))
  let offset = 0
  arrays.forEach(arr => {
    result.set(arr, offset)
    offset += arr.byteLength
  })
  return result
}

function writeTextFile(path) {
  return textContent =>
    Promise.resolve(path).then($ => fs.writeFileSync($, textContent))
}

//
// Entry point
//

main()
