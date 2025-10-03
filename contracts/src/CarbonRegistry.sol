// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./tokens/CarbonCreditERC721.sol";
import "./tokens/CarbonCreditERC1155.sol";
import "./tokens/CarbonCreditERC20.sol";

contract CarbonRegistry is Ownable {
    CarbonCreditERC721 public erc721;
    CarbonCreditERC1155 public erc1155;
    CarbonCreditERC20 public erc20; // optional fractional token

    event ERC721Issued(address indexed to, uint256 tokenId, uint256 tons, string uri);
    event ERC1155Issued(address indexed to, uint256 id, uint256 amount, string uri);
    event ERC721Retired(uint256 indexed tokenId, address indexed by);
    event ERC1155Retired(address indexed from, uint256 indexed id, uint256 amount);

    constructor(address _erc721, address _erc1155, address _erc20) Ownable(msg.sender) {
        erc721 = CarbonCreditERC721(_erc721);
        erc1155 = CarbonCreditERC1155(_erc1155);
        erc20 = CarbonCreditERC20(_erc20);
    }

    function issueERC721(address to, uint256 tons, string calldata tokenURI_) external onlyOwner returns (uint256) {
        uint256 tokenId = erc721.issueCredit(to, tons, tokenURI_);
        emit ERC721Issued(to, tokenId, tons, tokenURI_);
        return tokenId;
    }

    function issueERC1155(address to, uint256 id, uint256 amount, string calldata tokenURI_) external onlyOwner {
        erc1155.issueCredits(to, id, amount, tokenURI_);
        emit ERC1155Issued(to, id, amount, tokenURI_);
    }

    function retireERC721(uint256 tokenId) external {
        erc721.retire(tokenId);
        emit ERC721Retired(tokenId, msg.sender);
    }

    function retireERC1155(uint256 id, uint256 amount) external {
        erc1155.retire(msg.sender, id, amount);
        emit ERC1155Retired(msg.sender, id, amount);
    }
}


