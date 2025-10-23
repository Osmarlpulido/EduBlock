require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const ALFAJORES_RPC_URL = "https://alfajores-forno.celo-testnet.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
    console.error("PRIVATE_KEY not set in .env file");
}

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        alfajores: {
            url: ALFAJORES_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 44787,
        }
    }
};