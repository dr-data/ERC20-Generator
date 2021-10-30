export default async function handler(req, res) {
	try {
		const { tokenName, tokenSymbol, tokenDecimals } = await JSON.parse(req.body)

		console.log({ tokenName, tokenSymbol, tokenDecimals })
		res.status(201).json({ contract: 'abcdefg' })
	} catch (createErc20Error) {
		console.log({ createErc20Error })
		res.status(400)
	}
}