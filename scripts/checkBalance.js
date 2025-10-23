const hre = require("hardhat");

async function main() {
    console.log("🔍 Verificando balance en Celo Alfajores...");
    
    try {
        // Obtener la dirección de la wallet
        const [deployer] = await hre.ethers.getSigners();
        const address = await deployer.getAddress();
        
        console.log("📍 Dirección:", address);
        
        // Obtener balance en CELO
        const balance = await hre.ethers.provider.getBalance(address);
        const balanceInCELO = hre.ethers.formatEther(balance);
        
        console.log("💰 Balance CELO:", balanceInCELO, "CELO");
        
        if (balance > 0) {
            console.log("✅ ¡Tienes tokens! Puedes proceder con el despliegue.");
            console.log("");
            console.log("🚀 Para desplegar el contrato:");
            console.log("npx hardhat run scripts/deploy.js --network alfajores");
        } else {
            console.log("❌ Balance insuficiente. Necesitas obtener tokens de prueba.");
            console.log("");
            console.log("🔄 Ejecuta:");
            console.log("npx hardhat run scripts/alternativeFaucets.js --network alfajores");
        }
        
        // Verificar conexión a la red
        const network = await hre.ethers.provider.getNetwork();
        console.log("🌐 Red conectada:", network.name, "(Chain ID:", network.chainId, ")");
        
        if (network.chainId !== 44787n) {
            console.log("⚠️  ADVERTENCIA: No estás conectado a Celo Alfajores!");
            console.log("   Chain ID esperado: 44787");
            console.log("   Chain ID actual:", network.chainId.toString());
        }
        
    } catch (error) {
        console.error("❌ Error verificando balance:", error.message);
        console.log("");
        console.log("🔧 Posibles soluciones:");
        console.log("1. Verifica que tu .env tenga PRIVATE_KEY configurado");
        console.log("2. Asegúrate de tener conexión a internet");
        console.log("3. Verifica que la RPC de Alfajores esté funcionando");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
