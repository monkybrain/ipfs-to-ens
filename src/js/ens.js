const isValidDomain = require('is-valid-domain')
const namehash = require('eth-ens-namehash')

var isEthDomain = function(domain) {
  return domain.substring(domain.lastIndexOf('.'), domain.length) === '.eth'
}

module.exports.isValid = function(domain) {
  if (!isValidDomain(domain)) {
    return false
  } else {
    return isEthDomain(domain)
  }
}

module.exports.hash = function(domain) {
  return namehash.hash(domain)
}
