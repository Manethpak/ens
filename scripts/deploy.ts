import { ethers } from "hardhat";

async function main() {
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("lol");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("banana", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain banana.lol");

  txn = await domainContract.setRecord("banana", "Am I a banana or a lol??");
  await txn.wait();
  console.log("Set record for banana.lol");

  const address = await domainContract.getAddress("banana");
  console.log("Owner of domain banana:", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
