export const getTokenAddressPrefix = (chainId) => {
	if (chainId === '0x3') return 'https://ropsten.etherscan.io/token/'
	if (chainId === '0x4') return 'https://rinkeby.etherscan.io/token/'
	return 'https://etherscan.io/token/'
}