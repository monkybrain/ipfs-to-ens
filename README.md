# ipfs-to-ens

Website (dApp) that allows you to easily set an IPFS content hash for your ENS domain.

Converts entered IPFS multihash to 32 byte hex string, finds the resolver for your domain and calls the `setContent` function to store your hash.

Requires MetaMask or equivalent dApp plugin/browser (only tested with MetaMask).

Try it out here: [https://monkybrain.github.io/ipfs-to-ens/](https://monkybrain.github.io/ipfs-to-ens/)

And don't forget that you can resolve the IPFS hash and redirect your browser to the content using my Chrome extension [ENS Content Resolver](https://github.com/monkybrain/ens-content-resolver).

### Todo

- Better UX for transaction receipts
- Publish on IPFS and link to ipfs-to-ens.eth (dogfooding :smiley:)
- Better documentation
