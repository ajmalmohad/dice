import { ethers } from "hardhat";

async function main() {
  const dice = await ethers.deployContract("DICE");
  await dice.waitForDeployment();

  console.log(`Deployed to ${dice.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
