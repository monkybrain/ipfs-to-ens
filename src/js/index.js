const ens = require('./ens.js')
const ipfs = require('./ipfs.js')
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
  console.log(contentHash.length)

  resolver.setContent(namehash, contentHash)
  .then((tx) => {
    console.log(tx)
    let url
    if (tx.networkId == 1) {
      url = "https://etherscan.io/tx/" + tx.hash
    } else {
      url = "https://ropsten.etherscan.io/tx" + tx.hash
    }
    window.open(url, "_blank")
  })
}
