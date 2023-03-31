import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Ka from "./artifacts/contracts/Ka.sol/Ka.json";

function App() {
  const [kaContract, setKaContract] = useState();
  const kaAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // replace with your contract address
  const kaABI = Ka.abi;

  useEffect(() => {
    async function setup() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(kaAddress, kaABI, signer);
      setKaContract(contract);
    }
    setup();
  }, []);

  async function handleCreateContract() {
    const tx = await kaContract.CreateContract();
    const receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);
  }
  async function ApproveRequestor(requesterAddress, imageHash) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(kaAddress, Ka.abi, signer);
      const tx = await contract.ApproveRequestor(kaAddress, imageHash);
      await tx.wait();
      console.log("Transaction complete:", tx.hash);
    } catch (error) {
      console.log("Transaction failed:", error);
    }
  }
  useEffect(() => {
    if (kaContract) {
      kaContract.on("Approved", (requesterAddress, info) => {
        console.log(`Requester ${requesterAddress} has been approved.`);
      });
    }
  }, [kaContract]);

  return (
    <div>
      <button onClick={handleCreateContract}>Create Contract</button>
      <button
        onClick={() =>
          ApproveRequestor(
            "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
            "QmSnVAuUz2dp4StPrAoMPVi3Bpt2d24Joch3jTfqA71rvS"
          )
        }
      >
        Approve Requestor
      </button>
    </div>
  );
}

export default App;
