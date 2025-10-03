// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditERC1155 is ERC1155, Ownable {
    // tokenId => uri string (optional if using ERC1155 base URI pattern)
    mapping(uint256 => string) private _tokenURIs;

    event CreditBatchIssued(address indexed to, uint256 indexed tokenId, uint256 amount, string uri);
    event CreditRetired(address indexed from, uint256 indexed tokenId, uint256 amount);

    constructor(string memory baseURI)
        ERC1155(baseURI)
        Ownable(msg.sender)
    {}

    function uri(uint256 id) public view override returns (string memory) {
        string memory tokenURI = _tokenURIs[id];
        if (bytes(tokenURI).length > 0) {
            return tokenURI;
        }
        return super.uri(id);
    }

    function setURI(uint256 id, string memory newuri) external onlyOwner {
        _tokenURIs[id] = newuri;
        emit URI(newuri, id);
    }

    function issueCredits(address to, uint256 id, uint256 amount, string memory tokenURI_) external onlyOwner {
        _mint(to, id, amount, "");
        if (bytes(tokenURI_).length > 0) {
            _tokenURIs[id] = tokenURI_;
            emit URI(tokenURI_, id);
        }
        emit CreditBatchIssued(to, id, amount, tokenURI_);
    }

    function retire(address from, uint256 id, uint256 amount) external {
        require(from == msg.sender || isApprovedForAll(from, msg.sender), "Not owner nor approved");
        _burn(from, id, amount);
        emit CreditRetired(from, id, amount);
    }
}


