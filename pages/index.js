import Head from 'next/head'
import { useState } from 'react'
import { ethers } from 'ethers'
import erc20Types from '../artifacts/contracts/erc20Types.sol/Token0.json'
import { Center, Button, Text, Box, Flex, Spacer, Switch, useColorMode } from '@chakra-ui/react'
import Input1 from '../components/Input1'

function Home() {

  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [tokenDecimals, setTokenDecimals] = useState('')

  const [message1, setMessage1] = useState('')

  const { toggleColorMode } = useColorMode()

  const handleCreateToken = async (e) => {
    e.preventDefault()
    console.log('executed handle create')
    setMessage1('')
    if (!window.ethereum) return setMessage1('Metamask is not installed')
    if (tokenName === '') return setMessage1('Provide Token Name')
    if (tokenSymbol === '') return setMessage1('Provide Token Symbol')
    if (totalSupply < 0) return setMessage1('Total Supply could not be negative')
    if (tokenDecimals < 0) return setMessage1('Token Decimals could not be negative')

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
    <div>
      <Head>
        <title>Mint ERC20</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <Flex padding='15px'>
        <Spacer />
        <Text fontSize='xl' fontWeight='bold'>ERC20 Minter</Text>
        <Spacer />
        <Switch size='lg'
          onChange={toggleColorMode}
        />
      </Flex>

      <Center minHeight='90vh'>
        <Flex maxWidth='350px' flexDir='column'>

          <Input1
            placeholder='Token Name'
            value={tokenName}
            onChange={e => setTokenName(e.target.value)}
          />
          <Input1
            placeholder='Token Symbol'
            value={tokenSymbol}
            onChange={e => setTokenSymbol(e.target.value)}
          />
          <Input1
            placeholder='0'
            value={tokenDecimals}
            onChange={e => setTokenDecimals(e.target.value)}
          />
          <Input1
            placeholder='Total Supply'
            value={totalSupply}
            onChange={e => setTotalSupply(e.target.value)}
          />

          <Text>{message1}</Text>

          <Button
            onClick={handleCreateToken}
          >Mint</Button>

        </Flex>
      </Center>

    </div>
  )
}

export default Home
