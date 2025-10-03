// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditERC721 is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    // mapping tokenId => amount of tCO2e represented (for reference)
    mapping(uint256 => uint256) public tonsCO2e;

    event CreditIssued(address indexed to, uint256 indexed tokenId, uint256 amountTons, string uri);
    event CreditRetired(uint256 indexed tokenId, address indexed by);

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
        Ownable(msg.sender)
    {}

    function issueCredit(address to, uint256 amountTons, string memory tokenURI_) external onlyOwner returns (uint256) {
        uint256 tokenId = ++nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        tonsCO2e[tokenId] = amountTons;
        emit CreditIssued(to, tokenId, amountTons, tokenURI_);
        return tokenId;
    }

    function retire(uint256 tokenId) external {
        address owner = _ownerOf(tokenId);
        // OpenZeppelin v5 uses _isAuthorized(owner, spender, tokenId)
        require(_isAuthorized(owner, msg.sender, tokenId), "Not owner nor approved");
        _burn(tokenId);
        emit CreditRetired(tokenId, msg.sender);
    }
}


