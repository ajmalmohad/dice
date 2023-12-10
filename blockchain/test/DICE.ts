import { ethers } from "hardhat";

describe("DICE", function () {
  async function deploy() {
    const DICE = await ethers.getContractFactory("DICE");
    const dice = await DICE.deploy();
    return dice;
  }

  describe("Deployment", function () {
    it("Should deploy the contract", async function () {
       let contract = await deploy();
       console.log(contract);
    });
  });

});
