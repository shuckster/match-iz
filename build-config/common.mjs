import { composePaths } from 'compose-paths'

const moduleTypes = {
  esm: 'module',
  cjs: 'commonjs'
}

function optionsFrom(pkg) {
  const paths = composePaths(`

    ${process.env.PWD}/

      /src
        /${pkg.name}.mjs            = SRC

      /dist
        /esm/${pkg.name}.esm.js             = DIST_ESM
        /esm/package.json                   = DIST_ESM_PACKAGE_JSON
        /cjs/${pkg.name}.cjs.js             = DIST_CJS
        /cjs/package.json                   = DIST_CJS_PACKAGE_JSON
        /browser/${pkg.name}.browser.js     = DIST_IIFE

  `)

  const outputs = [
    {
      file: paths.DIST_ESM,
      module: paths.DIST_ESM_PACKAGE_JSON,
      format: 'esm'
    },
    {
      file: paths.DIST_CJS,
      module: paths.DIST_CJS_PACKAGE_JSON,
      format: 'cjs'
    },
    {
      file: paths.DIST_IIFE,
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
