import { ethers } from "hardhat";

async function main() {
  const dice = await ethers.deployContract("DICE");
  await dice.waitForDeployment();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
