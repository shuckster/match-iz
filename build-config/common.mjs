import { composePaths } from 'compose-paths'

const moduleTypes = {
  esm: 'module',
  cjs: 'commonjs'
}

function optionsFrom(pkg) {
  const paths = composePaths(`

    ${process.env.PWD}/

      /src
        /${pkg.name}.mjs                  = ESM_SRC_CORE
        /browser.mjs                      = ESM_SRC_BROWSER

      /dist
        /index.mjs                        = ESM_DIST
        /index.js                         = CJS_DIST
        /${pkg.name}.browser.js           = IIFE_DIST

      /dates
        /index.mjs                        = ESM_SRC_DATES
        /index.js                         = CJS_DIST_DATES
        /utc/index.mjs                    = ESM_SRC_DATES_UTC
        /utc/index.js                     = CJS_DIST_DATES_UTC

  `)

  const outputs = [
    // CORE
    {
      src: paths.ESM_SRC_CORE,
      dist: paths.ESM_DIST,
      format: 'esm'
    },
    {
      src: paths.ESM_SRC_CORE,
      dist: paths.CJS_DIST,
      format: 'cjs'
    },
    // CJS DATES
    {
      src: paths.ESM_SRC_DATES,
      dist: paths.CJS_DIST_DATES,
      format: 'cjs'
    },
    {
      src: paths.ESM_SRC_DATES_UTC,
      dist: paths.CJS_DIST_DATES_UTC,
      format: 'cjs'
    },
    // BROWSER BUILD
    {
      src: paths.ESM_SRC_BROWSER,
      dist: paths.IIFE_DIST,
      format: 'iife'
    }
  ]

  const globalName = pkg.name.replace(/[^a-zA-Z]/gi, '')

  function addBanner(build = '') {
    return `/*
 * ${pkg.name}
 * v${pkg.version}
 * ${pkg.homepage}
 * License: ${pkg.license}
 */
${build}`
  }

  return { paths, outputs, globalName, addBanner }
}

export { moduleTypes, optionsFrom }
