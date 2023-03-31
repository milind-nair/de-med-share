require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      // gas: 3e7,
      // blockGasLimit: 100000000429720,
      chainId: 1337,
    },
  },
  solidity: "0.8.18",
};
