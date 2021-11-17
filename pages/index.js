import Head from 'next/head'
import { useState } from 'react'
import { ethers } from 'ethers'
import ERC20_Normal from '../artifacts/contracts/Token0.sol/Token0.json'
import { Center, Button, Text, Spinner, Flex, Spacer, Switch, useColorMode } from '@chakra-ui/react'
import Input1 from '../components/Input1'
import { connectToWeb3 } from '../api/web3Provider'
import { getTokenAddressPrefix } from '../api/utils'


function Home() {
  const { toggleColorMode } = useColorMode()

  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [tokenDecimals, setTokenDecimals] = useState('')
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  const [currChainId, setCurrChainId] = useState('')
  const [buttonText1, setButtonText1] = useState('Mint')
  const [showBtnSpinner, setShowBtnSpinner] = useState(false)
  const [message1, setMessage1] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')


  const addTokenToMetamsk = async () => {

    await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
        }
      }
    })
  }

  const handleCreateToken = async () => {

    setMessage1('')
    if (tokenName === '') return setMessage1('Provide Token Name')
    if (tokenSymbol === '') return setMessage1('Provide Token Symbol')
    if (totalSupply < 0) return setMessage1('Total Supply could not be negative')
    if (tokenDecimals < 0) return setMessage1('Token Decimals could not be negative')

    const chainId = await connectToWeb3()
    if (chainId === null) {
      setMessage1('Could not able to connect with Web3')
      return
    } else {
      setCurrChainId(chainId)
    }

    try {
      setButtonText1('Creating...')
      setShowBtnSpinner(true)
      setIsFormDisabled(true)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const Token0 = new ethers.ContractFactory(ERC20_Normal.abi, ERC20_Normal.bytecode, signer)
      const amount1 = ethers.utils.parseUnits(totalSupply, tokenDecimals).toString()
      const token0 = await Token0.deploy(tokenName, tokenSymbol, tokenDecimals, amount1)
      const { address, deployTransaction } = token0
      await deployTransaction.wait()

      setButtonText1('Add Token To Wallet')
      setTokenAddress(address)
      setShowBtnSpinner(false)

      // Contract Verification (need not to execute, as etherscan 
      // automatically verifies contract if it has same code 
      // and same or different constructor arguments)
      // const dataObj = {
      //   contractAddr: address,
      //   constructorArgs: [tokenName, tokenSymbol, tokenDecimals, amount1]
      // }
      // console.log(dataObj)
      // await fetch(`/api/verify`, {
      //   method: "POST",
      //   body: JSON.stringify(dataObj)
      // })
    } catch (error) {
      console.log(error)
      setButtonText1('Mint')
      setShowBtnSpinner(false)
      setMessage1('Error Occured while Minting Token')
    }
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
            isDisabled={isFormDisabled}
          />
          <Input1
            placeholder='Token Symbol'
            value={tokenSymbol}
            onChange={e => setTokenSymbol(e.target.value)}
            isDisabled={isFormDisabled}
          />
          <Input1
            placeholder='Token Decimals'
            value={tokenDecimals}
            onChange={e => setTokenDecimals(e.target.value)}
            isDisabled={isFormDisabled}
          />
          <Input1
            placeholder='Total Supply'
            value={totalSupply}
            onChange={e => setTotalSupply(e.target.value)}
            isDisabled={isFormDisabled}
          />

          <Text>{message1}</Text>

          <Button
            onClick={() => {
              if (tokenAddress.length > 0) addTokenToMetamsk()
              else handleCreateToken()
            }}
            isDisabled={isFormDisabled && tokenAddress.length === 0}
          >
            {buttonText1} {'  '} {showBtnSpinner && <Spinner marginLeft='10px' />}
          </Button>

          {tokenAddress.length > 0 &&

            <Text fontWeight='bold' textAlign='center' marginTop='20px'>
              <a href={`${getTokenAddressPrefix(currChainId)}${tokenAddress}`} target='_blank'>
                Check on Etherscan
              </a>
            </Text>
          }

        </Flex>
      </Center>

    </div >
  )
}

export default Home
