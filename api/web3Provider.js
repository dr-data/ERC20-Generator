export const connectToWeb3 = async () => {
	if (!window.ethereum) {
		window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en')
		return null
	}
	try {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
		return await window.ethereum.request({ method: 'eth_chainId' })
	}
	catch (connectToWeb3Err) {
		console.log({ connectToWeb3Err })
		return null
	}
}