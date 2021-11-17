require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

const infuraProjectId = process.env.INFURA_PROJECT_ID
const privateKey0 = process.env.PRIVATE_KEY_0
const etherscanApiKey = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey0]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          }
        }
      }
    ]
  },
  etherscan: {
    apiKey: etherscanApiKey
  }
}