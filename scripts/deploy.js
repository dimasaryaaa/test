const hre = require("hardhat");

async function main() {
  try {
    
    const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
    
    const scm = await SupplyChain.deploy();
  
    await scm.deployed();

    console.log(`Smart Contract telah dideploy ke alamat: ${scm.address}`);
  } catch (error) {
    console.error("Kesalahan saat mendeploy smart contract:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("Terdapat Kesalahan:", error);
  process.exitCode = 1;
});
