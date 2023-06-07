import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import { config as dotnev } from "dotenv";

dotnev();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: process.env.URL,
      accounts: [process.env.PK as string],
    },
  },
};

export default config;
