import Head from 'next/head'
import { useState } from 'react'

function Home() {

  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState(1000000)
  const [decimals, setDecimals] = useState(18)
  const [isMintable, setIsMintable] = useState(false)
  const [isBurnable, setIsBurnable] = useState(false)

  const handleCreateToken = async (e) => {
    e.preventDefault()
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
              id="token-decimals" value={decimals}
              onChange={e => setDecimals(e.target.value)}
            />
          </div>

          <div>
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
          </div>

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
