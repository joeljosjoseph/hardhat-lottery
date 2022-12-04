/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "http://goerli-api.com"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "00xprivate"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "00xetherscan"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "00xcoinmarketcap"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        goerli: {
            chainId: 5,
            blockConfirmations: 6,
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    gasReporter: { enable: false, currency: "USD", outputFile: "gas-report.txt", noColors: true },
    solidity: "0.8.17",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeOut: 300000, //200s
    },
}
