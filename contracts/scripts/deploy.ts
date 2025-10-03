import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", await deployer.getAddress());

  const ERC721 = await ethers.getContractFactory("CarbonCreditERC721");
  const erc721 = await ERC721.deploy("Oceara Carbon Credit", "OCC");
  await erc721.waitForDeployment();
  console.log("ERC721:", await erc721.getAddress());

  const ERC1155 = await ethers.getContractFactory("CarbonCreditERC1155");
  const erc1155 = await ERC1155.deploy("https://example.com/metadata/{id}.json");
  await erc1155.waitForDeployment();
  console.log("ERC1155:", await erc1155.getAddress());

  const ERC20 = await ethers.getContractFactory("CarbonCreditERC20");
  const erc20 = await ERC20.deploy("Oceara Carbon Fraction", "OCF");
  await erc20.waitForDeployment();
  console.log("ERC20:", await erc20.getAddress());

  const Registry = await ethers.getContractFactory("CarbonRegistry");
  const registry = await Registry.deploy(
    await erc721.getAddress(),
    await erc1155.getAddress(),
    await erc20.getAddress()
  );
  await registry.waitForDeployment();
  console.log("Registry:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


