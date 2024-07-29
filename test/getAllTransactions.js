const hre = require("hardhat");

async function main() {
  const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
  const scm = await SupplyChain.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

  const createShipment = await scm.getAllTransactions();

  console.log(createShipment);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
