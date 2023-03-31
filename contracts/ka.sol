// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Ka {
    address public patient;
    string public imagedescription;
    string patientimagehash;
    mapping(address => bool) public isApprovedRequestor;
    mapping(address => string) public imageHashes;

    constructor(
        string memory _imagedescription,
        string memory _patientimageHash
    ) {
        imagedescription = _imagedescription;
        console.log("Hello");
        patient = msg.sender;
        patientimagehash = _patientimageHash;
        // CreateContract();
    }

    modifier Onlypatient() {
        require(msg.sender == patient);
        _;
    }
    modifier Notpatient() {
        require(msg.sender != patient);
        _;
    }

    event ContractCreated(address owner, string info);
    event RequestedForApproval(address requester, string info);
    event Requestaccepted(address patient, string info);
    event UserRemoved(address requesterAddress, string info);
    event Approved(address requester, string info);
    event Requestdenied(address patient, string info);
    event Reason(address requester, string info);
    event AuthorizationSuccess(address requester, string info, address patient);
    event AuthorizationFailed(address requester, string info, address patient);

    // function CreateContract() public Onlypatient {
    //     emit ContractCreated(
    //         msg.sender,
    //         "A contract has been created by the patient."
    //     );
    // }

    function CreateContract() public {
        emit ContractCreated(
            msg.sender,
            "A contract has been created by the patient."
        );
    }

    function RequestAccess() public {
        emit RequestedForApproval(
            msg.sender,
            "is requesting access to the patient image hash."
        );
    }

    function ApproveRequestor(
        address requesterAddress,
        string memory imageHash
    ) public {
        imageHashes[requesterAddress] = imageHash;
        if (
            keccak256(abi.encodePacked(imageHashes[requesterAddress])) ==
            keccak256(abi.encodePacked(patientimagehash))
        ) {
            emit Requestaccepted(
                msg.sender,
                "The Request is approved by the patient. "
            );
            isApprovedRequestor[requesterAddress] = true;
            emit Approved(requesterAddress, " is authorized to access image");
        } else {
            emit Requestdenied(
                msg.sender,
                "was failed to be approved by patient"
            );
            isApprovedRequestor[requesterAddress] = false;
            emit Reason(requesterAddress, "Enter Verified Requestor Address. ");
        }
    }

    function RemoveRequestor(
        address requesterAddress,
        string memory imageHash
    ) public {
        require(msg.sender == patient);
        imageHashes[requesterAddress] = imageHash;
        if (
            keccak256(abi.encodePacked(imageHashes[requesterAddress])) ==
            keccak256(abi.encodePacked(patientimagehash))
        ) {
            emit UserRemoved(msg.sender, "has been removed");
            isApprovedRequestor[requesterAddress] = false;
            emit Reason(requesterAddress, " Contract expired");
        }
    }

    function checkAuthorisation(
        address requesterAddress,
        address patientAddress
    ) public {
        if (isApprovedRequestor[requesterAddress] == true)
            if (patientAddress == patient) {
                emit AuthorizationSuccess(
                    requesterAddress,
                    "The doctor is authorized to access the image by:",
                    patientAddress
                );
            } else if (isApprovedRequestor[requesterAddress] == false)
                if (patientAddress == patient) {
                    emit AuthorizationFailed(
                        requesterAddress,
                        "The doctor is not authorized to access the image by:",
                        patientAddress
                    );
                }
    }
}
