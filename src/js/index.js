const eth = require('./eth.js')
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
  let contentHash = ipfs.hashTo32ByteHexString(ipfsHash)
  console.log("Content hash: " + contentHash)
  console.log(contentHash.length)

  resolver.setContent(namehash, contentHash)
  .then((txHash) => {
    console.log(txHash)
    let url
    if (eth.networkId == 1) {
      url = "https://etherscan.io/tx/" + txHash
    } else {
      url = "https://ropsten.etherscan.io/tx" + txHash
    }
    console.log(url)
    window.open(url, "_blank")
  })
  .catch((err) => {
    console.error(err)
    alert(err)
  })
}
