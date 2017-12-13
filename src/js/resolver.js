const Web3 = require('web3')

const REGISTRAR_MAIN_NET = "0x314159265dd8dbb310642f98f50c066173c1259b"
const REGISTRAR_ROPSTEN = "0x112234455c3a32fd11230c42e7bccd4a84e02010"

// var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/0pzfHdAhsqakqtBk8Hs6"))
// var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/0pzfHdAhsqakqtBk8Hs6"))
const web3 = new Web3(window.web3.currentProvider)

let networkId = 1
let registrarAddress = '0x0'
let account = '0x0'

// Set registrar according to network (ROPSTEN or MAINNET)
web3.eth.net.getId()
.then((id) => {
  networkId = id
  let el = document.getElementById('ethereum-network')
  if (networkId === 3) {
    el.innerHTML = "Ropsten"
    registrarAddress = REGISTRAR_ROPSTEN
  } else {
    el.innerHTML = "Main"
    registrarAddress = REGISTRAR_MAIN_NET
  }
})

var abi = {
  registrar: JSON.parse(require('../contracts/registrar.js')),
  resolver: JSON.parse(require('../contracts/resolver.js'))
}

module.exports.resolve = function(namehash) {

  Registrar = new web3.eth.Contract(abi.registrar, registrarAddress)

  return new Promise((resolve, reject) => {
    Registrar.methods.resolver(namehash).call()
    .then((address) => {
      if (address === '0x0000000000000000000000000000000000000000') {
        reject(null)
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

  // Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_ROPSTEN)
  let Registrar = new web3.eth.Contract(abi.registrar, registrarAddress)
  let account = '0x0'

  // Get current account

  return new Promise((resolve, reject) => {
    return web3.eth.getAccounts()
    .then((accounts) => {
      account = accounts[0]
      console.log("Account: " + account)
    })
    .then(() => {
      return Registrar.methods.resolver(namehash).call()
    })
    .then((address) => {
      if (address === '0x0000000000000000000000000000000000000000') {
        reject(null)
      } else {
        console.log("Resolver address: " + address)
        Resolver = new web3.eth.Contract(abi.resolver, address)
        return Resolver.methods.setContent(namehash, contentHash).send({from: account})
      }
    })
    .then((tx) => {
      console.log("Tx Hash: " + tx.transactionHash)
      resolve({
        networkId: networkId,
        hash: tx.transactionHash
      })
    })
  })
}
