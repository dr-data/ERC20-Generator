import ERC20_Simple from '../artifacts/contracts/ERC20_Simple.sol/ERC20_Simple.json'
import ERC20_Burn from '../artifacts/contracts/ERC20_Burn.sol/ERC20_Burn.json'
import ERC20_Mint from '../artifacts/contracts/ERC20_Mint.sol/ERC20_Mint.json'
import ERC20_Burn_Mint from '../artifacts/contracts/ERC20_Burn_Mint.sol/ERC20_Burn_Mint.json'


export const getTokenAddressPrefix = (chainId) => {
	if (chainId === '0x3') return 'https://ropsten.etherscan.io/token/'
	if (chainId === '0x4') return 'https://rinkeby.etherscan.io/token/'
	return 'https://etherscan.io/token/'
}

export const getAbiAndBytecode = (isMintable, isBurnable) => {
	if (isMintable && isBurnable) {
		return ERC20_Burn_Mint
	}
	else if (isMintable) {
		return ERC20_Mint
	}
	else if (isBurnable) {
		return ERC20_Burn
	}
	else return ERC20_Simple
}