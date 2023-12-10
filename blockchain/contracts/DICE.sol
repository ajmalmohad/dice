// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
    address owner;
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _certificateId;

    mapping(address => bool) public institutions;
    mapping(uint256 => address) public issuedCertificates;
    mapping(uint256 => string) public tokenURIMap;

    constructor() ERC721("Credentials", "Certificate") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function addInstitution(address _institution) external onlyOwner {
        institutions[_institution] = true;
    }

    function issueCertificate(address _student, string memory _tokenURI) external {
        require(institutions[msg.sender], "Only institutions can issue certificates");

        _certificateId.increment();
        uint256 currentId = _certificateId.current();
        issuedCertificates[currentId] = _student;
        tokenURIMap[currentId] = _tokenURI;
    }

    function claimCertificate(uint256 certificateId) external {
        require(issuedCertificates[certificateId] == msg.sender, "Certificate not yours for claiming");
        
        _mint(msg.sender, certificateId);
        _setTokenURI(certificateId, tokenURIMap[certificateId]);
        issuedCertificates[certificateId] = address(this);
    }
}