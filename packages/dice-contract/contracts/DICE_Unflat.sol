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

contract DICE_NotFlat is ERC721URIStorage {
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

    mapping(address => mapping(uint256 => uint256))
        private issuedCertificateIndices;

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

    function getVerifiedInstitutions(
        address _institution
    ) public view onlyOwner returns (bool) {
        return verifiedInstitutions[_institution];
    }

    function getIssuedCertificatesLength(
        address user
    ) public view returns (uint256) {
        return issuedCertificates[user].length;
    }

    function getIssuedCertificates(
        address user
    ) public view returns (uint[] memory) {
        return issuedCertificates[user];
    }

    function getClaimedCertificatesLength(
        address user
    ) public view returns (uint256) {
        return claimedCertificates[user].length;
    }

    function getClaimedCertificates(
        address user
    ) public view returns (uint[] memory) {
        return claimedCertificates[user];
    }

    function getIssuedBy(uint256 certificateId) public view returns (address) {
        return issuedBy[certificateId];
    }

    function getCurrentCertificateId() public view returns (uint256) {
        return _certificateId.current();
    }

    function issueCertificate(
        address _student,
        string memory _tokenURI
    ) external {
        require(
            verifiedInstitutions[msg.sender],
            "Only verified institutions can issue certificates"
        );
        _certificateId.increment();
        uint256 currentId = _certificateId.current();
        issuedBy[currentId] = msg.sender;
        issuedCertificates[_student].push(currentId);
        certificateToUser[currentId] = _student;
        certificateTokenURI[currentId] = _tokenURI;
        // Store the index of the new certificate ID
        issuedCertificateIndices[_student][currentId] =
            issuedCertificates[_student].length -
            1;
    }

    function claimCertificate(uint256 certificateId) external {
        require(
            certificateToUser[certificateId] == msg.sender,
            "Certificate not yours for claiming"
        );

        _mint(msg.sender, certificateId);
        _setTokenURI(certificateId, certificateTokenURI[certificateId]);

        // Update the index mapping and remove the certificate ID without a loop
        uint256 index = issuedCertificateIndices[msg.sender][certificateId];
        uint256 lastCertificateId = issuedCertificates[msg.sender][
            issuedCertificates[msg.sender].length - 1
        ];
        issuedCertificates[msg.sender][index] = lastCertificateId;
        issuedCertificateIndices[msg.sender][lastCertificateId] = index;
        issuedCertificates[msg.sender].pop();
        delete issuedCertificateIndices[msg.sender][certificateId];

        // Already claimed so not mapped to user anymore
        delete certificateToUser[certificateId];
        delete certificateTokenURI[certificateId];

        // All claimed ones of a user
        claimedCertificates[msg.sender].push(certificateId);
    }

    function declineCertificate(uint256 certificateId) external {
        require(
            certificateToUser[certificateId] == msg.sender,
            "Certificate not yours for declining"
        );

        // Update the index mapping and remove the certificate ID without a loop
        uint256 index = issuedCertificateIndices[msg.sender][certificateId];
        uint256 lastCertificateId = issuedCertificates[msg.sender][
            issuedCertificates[msg.sender].length - 1
        ];
        issuedCertificates[msg.sender][index] = lastCertificateId;
        issuedCertificateIndices[msg.sender][lastCertificateId] = index;
        issuedCertificates[msg.sender].pop();
        delete issuedCertificateIndices[msg.sender][certificateId];

        // Declined so not mapped to user anymore
        delete certificateToUser[certificateId];
        delete certificateTokenURI[certificateId];
    }
}
