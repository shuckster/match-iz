//
// Build with esbuild
//

import fs from 'fs'
import esbuild from 'esbuild'
import nodePath from 'path'
import { moduleTypes, optionsFrom } from './common.mjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

const { outputs, addBanner, globalName } = optionsFrom(pkg)

import * as matchiz from '../src/match-iz.mjs'
const { match, against, when, otherwise } = matchiz
const { defined, anyOf } = matchiz

function main() {
  Promise.all(outputs.map(buildModule))
}

const browserBuildImportMappings = {
  name: 'browser-build-import-mappings',
  setup(build) {
    const mappings = {
      'match-iz': './src/match-iz.mjs',
      'match-iz/dates/utc': './dates/utc/index.mjs'
    }
    Object.entries(mappings).forEach(([importName, relativeToBuildDir]) => {
      build.onResolve({ filter: new RegExp(`^${importName}$`) }, () => ({
        path: nodePath.resolve(relativeToBuildDir)
      }))
    })
  }
}

function buildModule({ src, dist, format, module }) {
  const buildOptions = {
    entryPoints: [src],
    target: ['es6'],
    minify: true,
    write: false,
    bundle: true,

    format,
    ...match(format)(
      when('iife')({
        platform: 'browser',
        globalName: pkg.browserGlobalName ?? globalName,
        plugins: [browserBuildImportMappings]
      }),
      otherwise({
        platform: 'node',
        external: ['match-iz']
      })
    )
  }

  return esbuild
    .build(buildOptions)
    .then(getConcatenatedEsbuildContent)
    .then($ => new TextDecoder().decode($))
    .then(addBanner)
    .then(writeTextFile(dist))
    .then(writePackageJson({ module, format }))
}

const writePackageJson = against(
  when({ module: defined, format: anyOf(Object.keys(moduleTypes)) })(
    ({ module, format }) =>
      writeTextFile(module)(makePackageJsonForType(format))
  ),
  otherwise(() => {
    // noop
  })
)

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
