
class Token {
	constructor(material) {
	  this.material = material;
	}
   
	go() {
	  return `https://go.getblock.io/${this.material}/`;
	}
   
	token() {
	  return this.material;
	}
}

export const getblock = {
	"shared": {
		"btc": {
			"mainnet": {
				"rest": [
					new Token ('ca1eda4af25d45d5a05bacaf43b90a57')
				]
			},
			"testnet": {
				"rest": [
					new Token ('e54609c4b4c6469ba3d0c987fbc0ff6e')
				]
			}
		},
		"eth": {
			"goerli": {
				"jsonRpc": [
					new Token ('1e391968bab843c1bf3f3c42181942b0')
				]
			},
			"mainnet": {
				"jsonRpc": [
					new Token ('67683fa7c6c34f2e88445f4a844c16ec')
				]
			}
		},
		"trx": {
			"mainnet": {
				"fullnodeJsonRpc": [
					new Token ('6e0ae8689fd34c8e9dc03db6321a17df')
				]
			},
			"testnet": {
				"fullnodeJsonRpc": [
					new Token ('a7de3858d08241c4bc969434914ba09b')
				]
			}
		}
	}
}
