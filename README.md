Verify Contract: 
- `npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1 Constructor argument 2 Constructor argument 3 Constructor argument 4"`

👆🏻 No comman between arguments / parameters


- Once the first contract is verified on etherscan, future contracts will be automatically verified by etherscan due to same bytecode
- Auto verification is supported on: 
	- Rinkeby (ERC20_Simple, Mint, Burn, Burn_Mint) 
	- Binance (ERC20_Simple)
	- Polygon (ERC20_Simple)
