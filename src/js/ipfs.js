const multihash = require('multihashes')

module.exports.hashTo32ByteHexString = function(ipfsHash) {
  let buf = multihash.fromB58String(ipfsHash)
  let digest = multihash.decode(buf).digest
  return '0x' + multihash.toHexString(digest)
}

module.exports.isValidHash = function(ipfsHash) {

  // If decoding of hash succeeds -> return true
  try {
    multihash.decode(multihash.fromB58String(ipfsHash))
    return true
  }

  // Else return false
  catch(err) {
    return false
  }

}
