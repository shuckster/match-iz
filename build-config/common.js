import { composePaths } from 'compose-paths'

const paths = composePaths(`

  ${process.env.PWD}/

    /src
      /match-iz.js             = SRC

    /dist
      /match-iz.esm.js         = DIST_ESM
      /match-iz.cjs.js         = DIST_CJS
      /match-iz.browser.js     = DIST_IIFE

`)

const outputs = [
  {
    file: paths.DIST_ESM,
    format: 'esm'
  },
  {
    file: paths.DIST_CJS,
    format: 'cjs'
  },
  {
    file: paths.DIST_IIFE,
    format: 'iife'
  }
]

function banner(pkg, build = '') {
  return `/*
 * match-iz
 * v${pkg.version}
 * ${pkg.homepage}
 * License: ${pkg.license}
 */
${build}`
}

export { paths, outputs, banner }
