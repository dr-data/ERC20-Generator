import Head from 'next/head'
import { useState } from 'react'
import { ethers } from 'ethers'
import erc20Types from '../artifacts/contracts/erc20Types.sol/Token0.json'

function Home() {

  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [tokenDecimals, setTokenDecimals] = useState('')
  // const [isMintable, setIsMintable] = useState(false)
  // const [isBurnable, setIsBurnable] = useState(false)

  const [message1, setMessage1] = useState('')

  const handleCreateToken = async (e) => {
    e.preventDefault()
    console.log('executed handle create')
    setMessage1('')
    if (!window.ethereum) return setMessage1('Metamask is not installed')
    if (tokenName === '') return setMessage1('Provide Token Name')
    if (tokenSymbol === '') return setMessage1('Provide Token Symbol')
    if (totalSupply < 0) return setMessage1('Total Supply could not be negative')
    if (tokenDecimals < 0) return setMessage1('Token Decimals could not be negative')

    // const dataObj = {
    //   tokenName, tokenSymbol, tokenDecimals
    // }
    // const resp1 = await fetch(`/api/createErc20`, {
    //   method: 'POST',
    //   body: JSON.stringify(dataObj)
    // })
    // if (resp1.status !== 201) {
    //   return setMessage1('Problem occurred while creation of token. Let us know on email us so we can fix the problem as soon as possible')
    // }
    // const resp2 = await resp1.json()

    // unlock metamask if it is currently locked
    await window.ethereum.request({ method: 'eth_requestAccounts' })

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log('signer', signer, provider.getNetwork())

    const Token0 = new ethers.ContractFactory(erc20Types.abi, erc20Types.bytecode, signer)
    const amount1 = ethers.utils.parseUnits('1000', 18)
    const token0 = await Token0.deploy('Maya', 'MY', 18, amount1)
    await token0.deployTransaction.wait()
    setMessage1('Contract deployed on rinkeby at: ', token0.address)
  }

  return (
    <div className="container">
      <Head>
        <title>Mint ERC20</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2 className='text-center font-medium text-lg md:text-xl mt-4 md:mt-7'>ERC20 Token Minter</h2>

      <main>
        <form className='text-center mt-6 lg:mt-10'>
          <div className='my-2'>
            <label htmlFor="token-name">Token Name: </label>
            <input
              className='border-2 border-green-500 p-1'
              type="text" name="token-name" placeholder='Tether'
              id="token-name" value={tokenName} required
              onChange={e => setTokenName(e.target.value)}
            />
          </div>
          <div className='my-2'>
            <label htmlFor="token-symbol">Token Symbol: </label>
            <input
              className='border-2 border-green-500 p-1'
              type="text" name="token-symbol" placeholder='USDT'
              id="token-symbol" value={tokenSymbol} required
              onChange={e => setTokenSymbol(e.target.value)}
            />
          </div>
          <div className='my-2'>
            <label htmlFor="total-supply">Total Supply: </label>
            <input
              className='border-2 border-green-500 p-1'
              type="number" name="total-supply" placeholder='0'
              id="total-supply" value={totalSupply}
              min={0}
              onChange={e => setTotalSupply(e.target.value)}
            />
          </div>
          <div className='my-2'>
            <label htmlFor="token-decimals">Token Decimals: </label>
            <input
              className='border-2 border-green-500 p-1'
              type="number" name="token-decimals"
              min={0} max={18} placeholder='0'
              id="token-decimals" value={tokenDecimals}
              onChange={e => setTokenDecimals(e.target.value)}
            />
          </div>

          {/* <div>
            <input type="checkbox" id="fixed-supply"
              name="fixed-supply" checked={isMintable}
              onChange={e => setIsMintable(e.target.checked)}
            />
            <label htmlFor="fixed-supply">Fixed Supply</label>
          </div>
          <div>
            <input type="checkbox" id="burnable" name="burnable"
              checked={isBurnable}
              onChange={e => setIsBurnable(e.target.checked)}
            />
            <label htmlFor="burnable">Burnable</label>
          </div> */}

          {message1}
          <div>
            <button
              className='border-2 border-green-600 p-2 bg-green-300 hover:bg-green-400 mt-2 w-20'
              onClick={handleCreateToken}
            >Mint</button>
          </div>
        </form>
      </main>

    </div>
  )
}

export default Home
