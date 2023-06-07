import { ethers } from "hardhat";

const main = async () => {
  const [owner, user1] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("ninja");
  await domainContract.deployed();

  console.log("Contract owner:", owner.address);

  // Let's be extra generous with our payment (we're paying more than required)
  let txn = await domainContract.connect(owner).register("a16z", {
    value: ethers.utils.parseEther("12"),
  });
  await txn.wait();

  // How much money is in here?
  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));

  // Let's try to register a domain that's already taken
  try {
    await domainContract.register("a16z", {
      value: ethers.utils.parseEther("1"),
    });
  } catch (error) {
    console.log(error);
  }
};

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
