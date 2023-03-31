import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import React, { useState } from "react";
import Ka from "./artifacts/contracts/Ka.sol/Ka.json";

const greeterAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

async function fetchData() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // window.ethereum.enable();
    const signer = provider.getSigner();
    const gp = provider.getGasPrice();
    console.log(gp);
    const contract = new ethers.Contract(greeterAddress, Ka.abi, signer, {
      gasPrice: gp,
      gasLimit: 10000000,
    });
    // console.log(contract);

    console.log("provider", contract);
    try {
      await contract.CreateContract();
      await contract.ApproveRequestor(
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        "QmSnVAuUz2dp4StPrAoMPVi3Bpt2d24Joch3jTfqA71rvS"
      );
      const data = await contract.checkAuthorisation(
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        "QmSnVAuUz2dp4StPrAoMPVi3Bpt2d24Joch3jTfqA71rvS"
      );
      console.log("data: ", data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }
}

function App() {
  return (
    <div className="App">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchData}
      >
        Fetch Greeting
      </button>
    </div>
  );
}

export default App;
