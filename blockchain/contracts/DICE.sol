// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

library Counters {
    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

contract DICE is ERC721URIStorage {
    address public owner;
    using Counters for Counters.Counter;
    Counters.Counter private _certificateId;

    // Address of Institution to true or false ( verified or not )
    mapping(address => bool) public verifiedInstitutions;

    // All certificates issued for a specific user
    mapping(address => uint[]) public issuedCertificates;

    // Certificate ID to the address to whom it's issued
    mapping(uint256 => address) public certificateToUser;

    // Certificate ID to tokenURI of Metadata in IPFS
    mapping(uint256 => string) public certificateTokenURI;

    // User address to all the claimed certificates
    mapping(address => uint[]) public claimedCertificates;

    // Certificate ID to issued by address
    mapping(uint256 => address) public issuedBy;

    constructor() ERC721("Credentials", "Certificate") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function addInstitution(address _institution) external onlyOwner {
        verifiedInstitutions[_institution] = true;
    }

    function removeInstitution(address _institution) external onlyOwner {
        verifiedInstitutions[_institution] = false;
    }

    function getVerifiedInstitutions(address _institution) public  view onlyOwner returns (bool) {
        return verifiedInstitutions[_institution];
    }

    function getIssuedCertificatesLength(address user) public view returns (uint256) {
        return issuedCertificates[user].length;
    }

    function getIssuedCertificates(address user) public view returns (uint[] memory) {
        return issuedCertificates[user];
    }

    function getClaimedCertificatesLength(address user) public view returns (uint256) {
        return claimedCertificates[user].length;
    }

    function getClaimedCertificates(address user) public view returns (uint[] memory) {
        return claimedCertificates[user];
    }

    function issueCertificate(address _student, string memory _tokenURI) external {
        require(verifiedInstitutions[msg.sender], "Only verified institutions can issue certificates");

        _certificateId.increment();
        uint256 currentId = _certificateId.current();
        issuedBy[currentId] = msg.sender;
        issuedCertificates[_student].push(currentId);
        certificateToUser[currentId] = _student;
        certificateTokenURI[currentId] = _tokenURI;
    }

    function getIssuedBy(uint256 certificateId) public view returns (address) {
        return issuedBy[certificateId];
    }

    function claimCertificate(uint256 certificateId) external {
        require(certificateToUser[certificateId] == msg.sender, "Certificate not yours for claiming");
        
        _mint(msg.sender, certificateId);
        _setTokenURI(certificateId, certificateTokenURI[certificateId]);

        // Delete the claimed certificate from issued
        uint256[] storage certificates = issuedCertificates[msg.sender];
        for (uint256 i = 0; i < certificates.length; i++) {
            if (certificates[i] == certificateId) {
                certificates[i] = certificates[certificates.length - 1];
                certificates.pop();
                break;
            }
        }

        // Already claimed so not mapped to user anymore
        delete certificateToUser[certificateId];
        delete certificateTokenURI[certificateId];
        
        // All claimed ones of a user
        claimedCertificates[msg.sender].push(certificateId);
    }

    function declineCertificate(uint256 certificateId) external {
        require(certificateToUser[certificateId] == msg.sender, "Certificate not yours for declining");

        // Delete the declined certificate from issued
        uint256[] storage certificates = issuedCertificates[msg.sender];
        for (uint256 i = 0; i < certificates.length; i++) {
            if (certificates[i] == certificateId) {
                certificates[i] = certificates[certificates.length - 1];
                certificates.pop();
                break;
            }
        }

        // Declined so not mapped to user anymore
        delete certificateToUser[certificateId];
        delete certificateTokenURI[certificateId];
    }
}