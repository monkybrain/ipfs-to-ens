const Web3 = require('web3')
const eth = require('./eth')

const REGISTRAR_MAIN_NET = "0x314159265dd8dbb310642f98f50c066173c1259b"
const REGISTRAR_ROPSTEN = "0x112234455c3a32fd11230c42e7bccd4a84e02010"

const web3 = eth.web3

// Set registrar according to network (ROPSTEN or MAINNET)
var abi = {
  registrar: JSON.parse(require('../contracts/registrar.js')),
  resolver: JSON.parse(require('../contracts/resolver.js'))
}

module.exports.resolve = function(namehash) {

  let registrarAddress = eth.networkId === 1 ? REGISTRAR_MAIN_NET : REGISTRAR_ROPSTEN
  Registrar = new web3.eth.Contract(abi.registrar, registrarAddress)

  return new Promise((resolve, reject) => {
    Registrar.methods.resolver(namehash).call()
    .then((address) => {
      if (address === '0x0000000000000000000000000000000000000000') {
        reject('Could not find resolver for that domain')
      } else {
        Resolver = new web3.eth.Contract(abi.resolver, address)
        return Resolver.methods.addr(namehash).call()
      }
    })
    .then((address) => {
      console.log("Address: " + address)
      resolve(address)
    })
  })
}

module.exports.setContent = function(namehash, contentHash) {

  let registrarAddress = eth.networkId === 1 ? REGISTRAR_MAIN_NET : REGISTRAR_ROPSTEN

  let Registrar = new web3.eth.Contract(abi.registrar, registrarAddress)
  let account = '0x0'

  // Get current account

  return new Promise((resolve, reject) => {
    Registrar.methods.resolver(namehash).call()
    .then((address) => {
      if (address === '0x0000000000000000000000000000000000000000') {
        let name = document.getElementById('input-ens').value
        return reject('Could not find resolver for ' + name)
      } else {
        console.log("Resolver address: " + address)
        Resolver = new web3.eth.Contract(abi.resolver, address)
        alert('MetaMask will now ask you to sign the transaction.\n\nA link to the transaction on etherscan will appear as soon as it has been broadcast to the network.\n\nPlease be patient as this can take a little while.')
        return Resolver.methods.setContent(namehash, contentHash).send({from: eth.account})
      }
    })
    .then((tx) => {
      resolve(tx.transactionHash)
    })
  })
}
