import Head from 'next/head'
import { useState } from 'react'
import { ethers } from 'ethers'
import { abi, bytecode } from '../artifacts/contracts/erc20Types.sol/Token0.json'

function Home() {

  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState(1000000)
  const [tokenDecimals, setTokenDecimals] = useState(18)
  // const [isMintable, setIsMintable] = useState(false)
  // const [isBurnable, setIsBurnable] = useState(false)

  const [message1, setMessage1] = useState('')

  const handleCreateToken = async (e) => {
    e.preventDefault()
    console.log('executed handle create')
    setMessage1('')

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
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log('signer', signer, provider.getNetwork())

    const Token0 = new ethers.ContractFactory(abi, bytecode, signer)
    const amount1 = ethers.utils.parseUnits('1000', 18)
    const token0 = await Token0.deploy('Maya', 'MY', 18, amount1)
    await token0.deployTransaction.wait()
    setMessage1('Contract deployed on rinkeby at: ', token0.address)
  }

  return (
    <div className="container">
      <Head>
        <title>Mint Tokens</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form>
          <div>
            <label for="token-name">Token Name: </label>
            <input
              type="text" name="token-name"
              id="token-name" value={tokenName} required
              onChange={e => setTokenName(e.target.value)}
            />
          </div>
          <div>
            <label for="token-symbol">Token Symbol: </label>
            <input
              type="text" name="token-symbol"
              id="token-symbol" value={tokenSymbol} required
              onChange={e => setTokenSymbol(e.target.value)}
            />
          </div>
          <div>
            <label for="total-supply">Total Supply: </label>
            <input
              type="number" name="total-supply"
              id="total-supply" value={totalSupply} required
              onChange={e => setTotalSupply(e.target.value)}
            />
          </div>
          <div>
            <label for="token-decimals">Token Decimals: </label>
            <input type="number" name="token-decimals"
              min={0} max={18}
              id="token-decimals" value={tokenDecimals}
              onChange={e => setTokenDecimals(e.target.value)}
            />
          </div>

          {/* <div>
            <input type="checkbox" id="fixed-supply"
              name="fixed-supply" checked={isMintable}
              onChange={e => setIsMintable(e.target.checked)}
            />
            <label for="fixed-supply">Fixed Supply</label>
          </div>
          <div>
            <input type="checkbox" id="burnable" name="burnable"
              checked={isBurnable}
              onChange={e => setIsBurnable(e.target.checked)}
            />
            <label for="burnable">Burnable</label>
          </div> */}

          {message1}
          <div>
            <button
              onClick={handleCreateToken}
            >Mint</button>
          </div>
        </form>
      </main>

    </div>
  )
}

export default Home
