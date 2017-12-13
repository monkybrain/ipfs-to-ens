const Web3 = require('web3')

const REGISTRAR_MAIN_NET = "0x314159265dd8dbb310642f98f50c066173c1259b"
const REGISTRAR_ROPSTEN = "0x112234455c3a32fd11230c42e7bccd4a84e02010"

// var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/0pzfHdAhsqakqtBk8Hs6"))
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/0pzfHdAhsqakqtBk8Hs6"))

var abi = {
  registrar: JSON.parse(require('../contracts/registrar.js')),
  resolver: JSON.parse(require('../contracts/resolver.js'))
}

module.exports.resolve = function(namehash) {

  // Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_ROPSTEN)
  Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_MAIN_NET)

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
  Registrar = new web3.eth.Contract(abi.registrar, REGISTRAR_MAIN_NET)

  return new Promise((resolve, reject) => {
    Registrar.methods.resolver(namehash).call()
    .then((address) => {
      if (address === '0x0000000000000000000000000000000000000000') {
        reject(null)
      } else {
        Resolver = new web3.eth.Contract(abi.resolver, address)
        return Resolver.methods.setContent(namehash, contentHash).send()
      }
    })
    .then((tx) => {
      console.log("Tx: " + tx)
      resolve(tx)
    })
  })
}
