const hre = require("hardhat");

async function main() {
    console.log("🔗 Conectando a Celo Alfajores...");
    
    // Obtener la dirección de la wallet
    const [deployer] = await hre.ethers.getSigners();
    const address = await deployer.getAddress();
    
    console.log("📍 Dirección de la wallet:", address);
    console.log("💰 Balance actual:", await hre.ethers.provider.getBalance(address));
    
    console.log("\n🚀 Para obtener tokens de prueba de Celo Alfajores:");
    console.log("1. Ve a: https://faucet.celo.org/alfajores");
    console.log("2. Conecta tu wallet o ingresa la dirección:", address);
    console.log("3. Solicita tokens CELO y cUSD");
    console.log("4. Una vez que tengas tokens, ejecuta: npx hardhat run scripts/deploy.js --network alfajores");
    
    console.log("\n📋 Información adicional:");
    console.log("- Red: Celo Alfajores Testnet");
    console.log("- Chain ID: 44787");
    console.log("- RPC URL: https://alfajores-forno.celo-testnet.org");
    console.log("- Explorador: https://alfajores.celoscan.io/");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
