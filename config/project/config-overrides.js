const { override, fixBabelImports, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addDecoratorsLegacy(),
)
