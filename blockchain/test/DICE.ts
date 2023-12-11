import { ethers, } from "hardhat";
import { expect } from "chai";

describe("DICE", function () {
  let diceContract: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addr3: any;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const DICEContract = await ethers.getContractFactory("DICE");
    diceContract = await DICEContract.deploy();
  });

  describe("Deployment", function () {
    it("Should deploy the contract", async function () {
      expect(diceContract.address).to.not.equal(0);
    });

    it("Should have the correct owner", async function () {
      expect(await diceContract.owner()).to.equal(owner.address);
    });
  });

  describe("Functionality", function () {
    it("Should add an institution", async function () {
      await diceContract.addInstitution(addr1.address);
      expect(await diceContract.institutions(addr1.address)).to.equal(true);
    });

    it("Should remove an institution", async function () {
      await diceContract.addInstitution(addr1.address);
      await diceContract.removeInstitution(addr1.address);
      expect(await diceContract.institutions(addr1.address)).to.equal(false);
    });

    it("Should issue a certificate", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu";
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI);
      const issuedAddress = await diceContract.issuedCertificates(1);
      const tokenURIMap = await diceContract.tokenURIMap(1);
      expect(issuedAddress).to.equal(addr2.address);
      expect(tokenURIMap).to.equal(tokenURI);
    });

    it("Should allow claiming a certificate", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu";
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI);
      await diceContract.connect(addr2).claimCertificate(1);
      const ownerOfCertificate = await diceContract.ownerOf(1);
      const tokenURIOfCertificate = await diceContract.tokenURI(1);
      expect(ownerOfCertificate).to.equal(addr2.address);
      expect(tokenURIOfCertificate).to.equal(tokenURI);
    });
  });

  describe("Unauthorized Access", function () {
    it("Should fail to remove an institution by a non-owner", async function () {
      await diceContract.addInstitution(addr1.address);
      await expect(diceContract.connect(addr2).removeInstitution(addr1.address))
      .to.be.revertedWith("Caller is not the owner");
    });
  
    it("Should fail to issue a certificate by a non-institution", async function () {
      await expect(diceContract.connect(addr2).issueCertificate(addr3.address, "tokenURI"))
      .to.be.revertedWith("Only institutions can issue certificates");
    });
  
    it("Should fail to claim a certificate not belonging to the caller", async function () {
      await diceContract.addInstitution(addr1.address);
      await diceContract.connect(addr1).issueCertificate(addr2.address, "tokenURI");
      await expect(diceContract.connect(addr3).claimCertificate(1))
      .to.be.revertedWith("Certificate not yours for claiming");
    });
  });
  
});
