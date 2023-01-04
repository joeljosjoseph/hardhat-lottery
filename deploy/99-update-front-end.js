const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE = "../nextjs-hardhat-lottery/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-hardhat-lottery/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front-end...")
        updateContractAddresses()
        updateAbi()
    }
}
async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddressses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8"))
    if (chainId in currentAddressses) {
        if (!currentAddressses[chainId].includes(raffle.address)) {
            currentAddressses[chainId].push(raffle.address)
        }
    }
    {
        currentAddressses[chainId] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddressses))
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

module.exports.tags = ["all", "front-end"]
