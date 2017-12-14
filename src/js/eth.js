const Web3 = require('web3')

if (!window.web3) {
  alert("Could not find injected web3 provider.\n\nYou need MetaMask (or equivalent) to run this dApp.")
  return
}

// Instantiate and export web3 object
const web3 = new Web3(window.web3.currentProvider)
module.exports.web3 = web3

// Get and update network id
var updateNetworkId = function() {

  web3.eth.net.getId()
  .then((networkId) => {
    module.exports.networkId = networkId
    if (networkId === 3) {
      document.getElementById('network').innerHTML = "Ropsten"
    } else {
      document.getElementById('network').innerHTML = "Main"
    }
  })
}

// Get and update account
var updateAccount = function() {

  web3.eth.getAccounts()
  .then((accounts) => {
    let account = accounts[0]
    module.exports.account = account
  })
}

// Update account and network id every 5 s
updateNetworkId()
updateAccount()
setInterval(() => {
  updateNetworkId()
  updateAccount()
}, 5000)
