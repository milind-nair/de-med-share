// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
        const Ka = await hre.ethers.getContractFactory("Ka");
        const ka = await Ka.deploy("Photo of an Unemployed Guy","QmSnVAuUz2dp4StPrAoMPVi3Bpt2d24Joch3jTfqA71rvS");

        await ka.deployed();
        console.log("Contract deployed to : ",ka.address);
} 

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
