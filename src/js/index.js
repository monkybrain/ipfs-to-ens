const ens = require('./ens.js')
const ipfs = require('./ipfs.js')
const eth = require('./eth.js')
const resolver = require('./resolver.js')

window.storeHash = function() {

  // Get address and hash
  let name = document.getElementById('input-ens').value
  console.log("Domain: " + name)
  console.log("Valid domain: " + ens.isValid(name))

  let ipfsHash = document.getElementById('input-ipfs').value
  let namehash = ens.hash(name)
  console.log("IPFS hash: " + ipfsHash)
  console.log("Name hash:" + namehash)
  console.log("IPFS hash 32 byte: ")
  let contentHash = ipfs.hashTo32ByteHex(ipfsHash)
  console.log("Content hash: " + contentHash)

  resolver.setContent(namehash, contentHash)
  .then(console.log)
}
