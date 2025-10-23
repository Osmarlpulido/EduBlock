const hre = require("hardhat");

async function main() {
    // Obtenemos el contrato a desplegar
    const EduBlockSBT = await hre.ethers.getContractFactory("EduBlockSBT");

    // Desplegamos el contrato
    console.log("Desplegando EduBlockSBT a Alfajores...");
    const eduBlockSBT = await EduBlockSBT.deploy();

    await eduBlockSBT.waitForDeployment();

    console.log("Contrato EduBlockSBT desplegado en:", await eduBlockSBT.getAddress());
    console.log("Deployer (Owner):", eduBlockSBT.runner.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});