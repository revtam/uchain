import React from "react";
import "./App.css";

const { ethers } = require("ethers");

// This is the ABI of the contract with the nested structs
const contractAbi = [
    // The ABI for the contract with the nested structs
];

// This is the encoded data for the nested structs
const encodedData = "0x...";

// This is the ABI coder instance
const abiCoder = new ethers.utils.AbiCoder();

// This is the decoded data for the nested structs
const decodedData = abiCoder.decode(contractAbi, encodedData);

// You can access the properties of the nested structs using the appropriate keys in the decoded data object
console.log(decodedData.struct1.property1); // Outputs the value of property1 in struct1
console.log(decodedData.struct1.struct2.property2); // Outputs the value of property2 in struct2, which is nested in struct1

const App = () => {
    return (
        <div className="App">
            <p>Hello</p>
        </div>
    );
};

export default App;
