//Test Page

"use client";
import { useState, useEffect } from "react";
import {
  loadStringContract,
  req_InitAccount,
  loadWeb3Address,
} from "../../../web3lib/web3_helper";

type UserString = {
  string: string;
  address: string;
};

const string = () => {
  //signup page const
  const initialUserString = {
    string: "",
    address: "",
  };
  const [userString, setUserString] = useState<UserString>(initialUserString);

  //web3 const
  const [address, setAddress] = useState<string | null>(null);
  const [stringcontract, setStringContract] = useState<any>(null);
  //contract add format
  //const [<contractname>,<setContractName>] = useState<any>(null);
  const [checkstring, setCheckString] = useState<string | null>(null);

  //useEffect for web3
  useEffect(() => {
    // Fetch the initial account address
    if (typeof (window as any).ethereum !== "undefined") {
      req_InitAccount()
        .then((result) => {
          setAddress(result);
        })
        .catch((error) => {
          console.error("Error fetching Ethereum account:", error);
        });
      //listener for change account

      (window as any).ethereum.on("accountsChanged", (address: string[]) => {
        if (address.length > 0) {
          setAddress(address[0]);
        } else {
          console.log("No accounts");
          setAddress(null);
        }
      });

      if (address) {
        loadcontract();
      }
    }
  }, [address]);


  //const for web3
  const loadAddress = async () => {
    if (address) {
      alert("account already loaded");
    } else {
      const web3_address = loadWeb3Address();
      setAddress((web3_address as any).address);
    }
  };


  const loadcontract = async () => {
    try {
      let data = await loadStringContract(address);
      setStringContract(data.contractdata);
      //more contract here
    } catch (error) {
      console.log(error);
    }
  };

  //const for front end

  const createString = async () => {
    try {
      if (address) {
        console.log("String creating ... : " + userString.string);

        const tx = await stringcontract.createString(userString.string);
        await tx.wait();
      } else {
        alert("No address. Please connect to MetaMask.");
      }
    } catch (error) {
      if (
        (error as any).message.includes(
          "ethers-user-denied: MetaMask Tx Signature"
        )
      ) {
        alert("User denied the transaction in MetaMask.");
      } else {
        console.error(
          "Error during contract method call:",
          (error as any).message
        );
      }
    }
  };


  const checkString = async () => {
    if (userString.address && address) {
      setCheckString(stringcontract.getString(userString.address));
    } else if (!userString.address) {
      alert("Please enter address");
    } else if (!address) {
      alert("No address please connect to metamask");
    }
  };

  return (
    <div>
      <div className="Upper">
        <h1> Demo String Test</h1>
      </div>
      <div className="Metamask button">
          <button onClick={loadAddress}>Metamask Button</button>
        </div>
      <div className="Address">
        <h3> Address : {address}</h3>
      </div>
      <div className="Valuepanel">
        <h1> Signup Panel</h1>
        <div className="String">
          <label> String </label>
          <input
            type="text"
            name="String"
            id="String"
            placeholder="Your String"
            onChange={(e) => {
              setUserString({ ...userString, string: e.target.value });
            }}
          />
        </div>
        <div className="button">
          <button onClick={createString}>Create String</button>
        </div>
        <div className="Address">
          <label> Addresscheck </label>
          <input
            type="text"
            name="Address"
            id="Address"
            placeholder="Address"
            onChange={(e) => {
              setUserString({ ...userString, address: e.target.value });
            }}
          />
        </div>
        <div className="Checkbutton">
          <button onClick={checkString}>Check String Value</button>
          <h3>{checkstring}</h3>
        </div>
      </div>
    </div>
  );
};

export default string;