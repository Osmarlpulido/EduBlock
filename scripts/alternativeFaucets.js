const hre = require("hardhat");

async function main() {
    console.log("🔗 Alternativas para obtener tokens de prueba de Celo Alfajores:");
    console.log("");
    
    // Obtener la dirección de la wallet
    const [deployer] = await hre.ethers.getSigners();
    const address = await deployer.getAddress();
    
    console.log("📍 Tu dirección de wallet:", address);
    console.log("");
    
    console.log("🚀 ALTERNATIVAS DE FAUCETS:");
    console.log("");
    
    console.log("1. 🌐 Faucet Principal de Celo:");
    console.log("   URL: https://faucet.celo.org/alfajores");
    console.log("   - Espera 5-10 minutos entre requests");
    console.log("   - Usa una VPN si estás en ciertas regiones");
    console.log("");
    
    console.log("2. 🔄 Faucet Alternativo - Discord:");
    console.log("   - Únete al Discord de Celo: https://discord.gg/celo");
    console.log("   - Ve al canal #alfajores-faucet");
    console.log("   - Escribe: !faucet " + address);
    console.log("");
    
    console.log("3. 🛠️ Faucet de Desarrollo:");
    console.log("   URL: https://faucet.celo.org/alfajores");
    console.log("   - Intenta con una dirección diferente");
    console.log("   - Usa un navegador en modo incógnito");
    console.log("");
    
    console.log("4. 📱 Faucet Móvil (Valora App):");
    console.log("   - Descarga la app Valora");
    console.log("   - Cambia a red Alfajores");
    console.log("   - Usa la función de faucet integrada");
    console.log("");
    
    console.log("5. 🔧 Faucet Técnico:");
    console.log("   URL: https://faucet.celo.org/alfajores");
    console.log("   - Espera 24 horas si has usado el faucet recientemente");
    console.log("   - Intenta desde un dispositivo/red diferente");
    console.log("");
    
    console.log("💡 CONSEJOS:");
    console.log("- Los faucets tienen límites de tiempo (24h)");
    console.log("- Algunos requieren verificación de captcha");
    console.log("- Si una dirección no funciona, genera una nueva");
    console.log("- Los tokens pueden tardar 1-2 minutos en llegar");
    console.log("");
    
    console.log("🔍 VERIFICAR BALANCE:");
    console.log("Ejecuta: npx hardhat run scripts/checkBalance.js --network alfajores");
    console.log("");
    
    console.log("📞 SI NADA FUNCIONA:");
    console.log("- Contacta en Discord de Celo");
    console.log("- Usa el canal #support");
    console.log("- Menciona que necesitas tokens para desarrollo");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
