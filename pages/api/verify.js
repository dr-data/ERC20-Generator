import { verifyContract } from '../../scripts/verify'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		res.end('Verification Endpoint')
	}

	if (req.method === 'POST') {
		try {
			const dataObj = await JSON.parse(req.body)
			await verifyContract(dataObj)
			res.end()
		} catch (err) {
			console.log(err)
			res.end()
		}
	}
}