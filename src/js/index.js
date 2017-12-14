const eth = require('./eth.js')
const ens = require('./ens.js')
const ipfs = require('./ipfs.js')
const resolver = require('./resolver.js')

window.storeHash = function() {

  // Get and validate domain
  let name = document.getElementById('input-ens').value

  console.log("Domain: " + name)

  // If domain invalid -> abort
  if (!ens.isValid(name)) {
    alert('Invalid domain name')
    return
  }

  // Else get namehash for name
  let namehash = ens.hash(name)
  console.log("Name hash: " + namehash)

  // Get and validate IPFS hash
  let ipfsHash = document.getElementById('input-ipfs').value

  if (!ipfs.isValidHash(ipfsHash)) {
    alert('Invalid IPFS hash')
    return
  }

  // Convert IPFS multihash to 32 byte hex string
  let contentHash = ipfs.hashTo32ByteHexString(ipfsHash)
  console.log("IPFS hash: " + ipfsHash)
  console.log("Content hash: " + contentHash)

  // Clear transaction link
  document.getElementById('etherscan').innerHTML = ""
  document.getElementById('etherscan').href = ""

  // Set content
  resolver.setContent(namehash, contentHash)
  .then((txHash) => {
    console.log("TX Hash: " + txHash)
    let url
    if (eth.networkId == 1) {
      url = "https://etherscan.io/tx/" + txHash
    } else {
      url = "https://ropsten.etherscan.io/tx/" + txHash
    }
    let el = document.getElementById('etherscan')
    el.href = url
    el.innerHTML = "View latest transaction on Etherscan"
  })
  .catch((err) => {
    console.error(err)
    alert(err)
  })
}
