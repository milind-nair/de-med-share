import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Ka from "./artifacts/contracts/Ka.sol/Ka.json";

function App() {
  const [kaContract, setKaContract] = useState();
  const [authorized, setAuthorization] =useState();
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
      console.log(contract);
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

  async function checkAuthorisation(requesterAddress, patientAddress) {
    console.log(await kaContract.isApprovedRequestor[requesterAddress]);
    if ((await kaContract.isApprovedRequestor[requesterAddress]) == true) {
      console.log("test1");
      if (patientAddress == kaContract.patient) {
        try {
          const authorized = await kaContract.checkAuthorisation(
            requesterAddress,
            patientAddress
          );
          console.log(authorized);
          kaContract.setAuthorization(authorized);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

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
      <div>
        <button
          onClick={() =>
            checkAuthorisation(
              "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
              "QmSnVAuUz2dp4StPrAoMPVi3Bpt2d24Joch3jTfqA71rvS"
            )
          }
        >
          Create Contract
        </button>
      </div>
    </div>
  );
}

export default App;
