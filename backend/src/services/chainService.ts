import { ethers } from 'ethers';
import path from 'path';
import fs from 'fs';

type RegistryAddresses = {
  registry: string;
};

let provider: ethers.JsonRpcProvider | null = null;
let wallet: ethers.Wallet | null = null;
let registryContract: ethers.Contract | null = null;

export function initChain() {
  const rpcUrl = process.env.CHAIN_RPC_URL;
  const privateKey = process.env.CHAIN_PRIVATE_KEY;
  const registryAddress = process.env.CARBON_REGISTRY_ADDRESS;

  if (!rpcUrl || !privateKey || !registryAddress) {
    throw new Error('Missing CHAIN_RPC_URL, CHAIN_PRIVATE_KEY or CARBON_REGISTRY_ADDRESS');
  }

  provider = new ethers.JsonRpcProvider(rpcUrl);
  wallet = new ethers.Wallet(privateKey, provider);

  const artifactsDir = path.join(process.cwd(), '..', 'contracts', 'artifacts', 'src', 'CarbonRegistry.sol');
  const artifactPath = path.join(artifactsDir, 'CarbonRegistry.json');
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));

  registryContract = new ethers.Contract(registryAddress, artifact.abi, wallet);
}

export async function issueERC721Credit(to: string, tons: number, tokenURI: string) {
  if (!registryContract) initChain();
  const tx = await (registryContract as ethers.Contract).issueERC721(to, tons, tokenURI);
  return await tx.wait();
}

export async function issueERC1155Credits(to: string, id: number, amount: number, tokenURI: string) {
  if (!registryContract) initChain();
  const tx = await (registryContract as ethers.Contract).issueERC1155(to, id, amount, tokenURI);
  return await tx.wait();
}


