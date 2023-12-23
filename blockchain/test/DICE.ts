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
      expect(await diceContract.verifiedInstitutions(addr1.address)).to.equal(true);
    });

    it("Should remove an institution", async function () {
      await diceContract.addInstitution(addr1.address);
      await diceContract.removeInstitution(addr1.address);
      expect(await diceContract.verifiedInstitutions(addr1.address)).to.equal(false);
    });

    it("Should issue a certificate", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu";
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI);

      const issuedAddress = await diceContract.certificateToUser(1);
      const tokenURIMap = await diceContract.certificateTokenURI(1);
      const length = await diceContract.getIssuedCertificatesLength(addr2.address);

      expect(issuedAddress).to.equal(addr2.address);
      expect(tokenURIMap).to.equal(tokenURI);
      expect(length).to.equal(1);
    });

    it("Should claim a certificate", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu";
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI);
      let length = await diceContract.getIssuedCertificatesLength(addr2.address);
      expect(length).to.equal(1);

      await diceContract.connect(addr2).claimCertificate(1);
      length = await diceContract.getIssuedCertificatesLength(addr2.address);
      expect(length).to.equal(0);

      const ownerOfCertificate = await diceContract.ownerOf(1);
      const tokenURIOfCertificate = await diceContract.tokenURI(1);

      expect(ownerOfCertificate).to.equal(addr2.address);
      expect(tokenURIOfCertificate).to.equal(tokenURI);
    });

    it("Should decline a certificate and verify the state", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu";
      
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI);
      let issuedCount = await diceContract.getIssuedCertificatesLength(addr2.address);
      expect(issuedCount).to.equal(1);
    
      // Decline the issued certificate
      await diceContract.connect(addr2).declineCertificate(1);
      issuedCount = await diceContract.getIssuedCertificatesLength(addr2.address);
      expect(issuedCount).to.equal(0);
    
      let claimedCount = await diceContract.getClaimedCertificatesLength(addr2.address);
      expect(claimedCount).to.equal(0);
    });
    

    it("Should issue and claim multiple certificates from the same account", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI1 = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu1";
      const tokenURI2 = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu2";
      
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI1);
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI2);
    
      let issuedCount = await diceContract.getIssuedCertificatesLength(addr2.address);
      expect(issuedCount).to.equal(2);
      
      // Claim the second certificate first
      await diceContract.connect(addr2).claimCertificate(2);
      let claimedCount = await diceContract.getClaimedCertificatesLength(addr2.address);
      expect(claimedCount).to.equal(1);
      
      // Then claim the first certificate
      await diceContract.connect(addr2).claimCertificate(1);
      claimedCount = await diceContract.getClaimedCertificatesLength(addr2.address);
      expect(claimedCount).to.equal(2);
    });    

    it("Should issue and claim multiple certificates from multiple accounts", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI1 = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu1";
      const tokenURI2 = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu2";
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI1);
      await diceContract.connect(addr1).issueCertificate(addr3.address, tokenURI2);
    
      let length1 = await diceContract.getIssuedCertificatesLength(addr2.address);
      let length2 = await diceContract.getIssuedCertificatesLength(addr3.address);
      expect(length1).to.equal(1);
      expect(length2).to.equal(1);
      
      await diceContract.connect(addr3).claimCertificate(2);
      await diceContract.connect(addr2).claimCertificate(1);
    
      length1 = await diceContract.getIssuedCertificatesLength(addr2.address);
      length2 = await diceContract.getIssuedCertificatesLength(addr3.address);
      expect(length1).to.equal(0);
      expect(length2).to.equal(0);
    });

    it("Should issue and claim multiple certificates from same account in any order", async function () {
      await diceContract.addInstitution(addr1.address);
      const tokenURI1 = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu1";
      const tokenURI2 = "ipfs.io/AuidfybBSIfsdsnfiuYFsdyiu2";
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI1);
      await diceContract.connect(addr1).issueCertificate(addr2.address, tokenURI2);
    
      let issuedlen = await diceContract.getIssuedCertificatesLength(addr2.address);
      let claimedlen = await diceContract.getClaimedCertificatesLength(addr2.address);
      expect(issuedlen).to.equal(2);
      expect(claimedlen).to.equal(0);
      await diceContract.connect(addr2).claimCertificate(2);

      issuedlen = await diceContract.getIssuedCertificatesLength(addr2.address);
      claimedlen = await diceContract.getClaimedCertificatesLength(addr2.address);
      expect(issuedlen).to.equal(1);
      expect(claimedlen).to.equal(1);
      await diceContract.connect(addr2).claimCertificate(1);
      
      issuedlen = await diceContract.getIssuedCertificatesLength(addr2.address);
      claimedlen = await diceContract.getClaimedCertificatesLength(addr2.address);
      expect(issuedlen).to.equal(0);
      expect(claimedlen).to.equal(2);
    });

  });

  describe("Unauthorized Access", function () {
    it("Should prevent unauthorized addition of institution by a non-owner", async function () {
      await diceContract.addInstitution(addr1.address);
      await expect(diceContract.connect(addr2).addInstitution(addr1.address))
      .to.be.revertedWith("Caller is not the owner");
    });

    it("Should prevent unauthorized removal of institution by a non-owner", async function () {
      await diceContract.addInstitution(addr1.address);
      await expect(diceContract.connect(addr2).removeInstitution(addr1.address))
        .to.be.revertedWith("Caller is not the owner");
    });
  
    it("Should fail to issue a certificate by a non-institution", async function () {
      await expect(diceContract.connect(addr2).issueCertificate(addr3.address, "tokenURI"))
      .to.be.revertedWith("Only verified institutions can issue certificates");
    });
  
    it("Should fail to claim a certificate not belonging to the caller", async function () {
      await diceContract.addInstitution(addr1.address);
      await diceContract.connect(addr1).issueCertificate(addr2.address, "tokenURI");
      await expect(diceContract.connect(addr3).claimCertificate(1))
      .to.be.revertedWith("Certificate not yours for claiming");
    });
    
    it("Should prevent decline a certificate not belonging to the caller", async function () {
      await diceContract.addInstitution(addr1.address);
      await diceContract.connect(addr1).issueCertificate(addr2.address, "tokenURI");
      await expect(diceContract.connect(addr3).declineCertificate(1))
        .to.be.revertedWith("Certificate not yours for declining");
    });    
  });
  
});
