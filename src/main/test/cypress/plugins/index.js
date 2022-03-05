const cypressTypeScriptPreprocessor = require('./cy-ty-preprocessor')

module.exports = on => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
}
