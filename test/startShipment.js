const hre = require("hardhat");

async function main() {
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  const scm = await SupplyChain.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

  const startShipment = await scm.startShipment(
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    0
  )

  console.log(startShipment);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
