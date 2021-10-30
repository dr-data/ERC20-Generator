const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("ERC20 Creator", function () {

	let token0
	let signers
	const amount1 = ethers.utils.parseUnits('1000', 18)
	const amount2 = '1000000000000000000000'

	beforeEach("Deploy ERC20 Token", async function () {
		signers = await ethers.getSigners()
		const Token0 = await ethers.getContractFactory("Token0")
		token0 = await Token0.deploy('Sati', 'ST', 18, amount1)
		await token0.deployTransaction.wait()
	})

	it('Name', async function () {
		expect(await token0.name()).to.equal('Sati')
	})
	it('Symbol', async function () {
		expect(await token0.symbol()).to.equal('ST')
	})
	it('Decimals', async function () {
		expect(await token0.decimals()).to.equal(18)
	})
	it('Premint Tokens', async function () {
		expect(await token0.totalSupply()).to.equal(amount2)
	})
	it('Account Balance', async function () {
		const [owner] = signers
		expect(await token0.balanceOf(owner.address)).to.equal(amount2)
	})
})