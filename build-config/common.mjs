import { composePaths } from 'compose-paths'

const moduleTypes = {
  esm: 'module',
  cjs: 'commonjs'
}

function optionsFrom(pkg) {
  const paths = composePaths(`

    ${process.env.PWD}/

      /src
        /${pkg.name}.mjs                    = SRC_CORE
        /dates
          /index.mjs                        = SRC_DATES
          /utc/index.mjs                    = SRC_DATES_UTC

        /browser.mjs                        = SRC_BROWSER

      /dist
        /esm
          /index.js                         = DIST_ESM
          /dates
            /index.js                       = DIST_ESM_DATES
            /utc/index.js                   = DIST_ESM_DATES_UTC
          /package.json                     = DIST_ESM_PACKAGE_JSON

        /cjs                                = DIST_CJS_DIR
          /index.js                         = DIST_CJS
          /dates
            /index.js                       = DIST_CJS_DATES
            /utc/index.js                   = DIST_CJS_DATES_UTC
          /package.json                     = DIST_CJS_PACKAGE_JSON

        /browser/${pkg.name}.browser.js     = DIST_IIFE

  `)

  const outputs = [
    {
      src: paths.SRC_CORE,
      dist: paths.DIST_ESM,
      module: paths.DIST_ESM_PACKAGE_JSON,
      format: 'esm'
    },
    {
      src: paths.SRC_DATES,
      dist: paths.DIST_ESM_DATES,
      format: 'esm'
    },
    {
      src: paths.SRC_DATES_UTC,
      dist: paths.DIST_ESM_DATES_UTC,
      format: 'esm'
    },
    {
      src: paths.SRC_CORE,
      dist: paths.DIST_CJS,
      module: paths.DIST_CJS_PACKAGE_JSON,
      format: 'cjs'
    },
    {
      src: paths.SRC_DATES,
      dist: paths.DIST_CJS_DATES,
      format: 'cjs'
    },
    {
      src: paths.SRC_DATES_UTC,
      dist: paths.DIST_CJS_DATES_UTC,
      format: 'cjs'
    },
    {
      src: paths.SRC_BROWSER,
      dist: paths.DIST_IIFE,
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
