//first page for connect button

"use client";
import { useState, useEffect } from "react";
import { loadWeb3Address, req_InitAccount } from "../../web3lib/web3_helper";

export default function page()  {
  const [address, setAddress] = useState<string | null>(null);

  // Web3 useEffect Load Dynamic account with useEffect
  useEffect(() => {
    if (typeof (window as any).ethereum !== "undefined") {
      // Fetch the initial account address
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
    }
  }, []);

  //web3 const
  const loadAddress = async () => {
    if (address) {
      alert("account already loaded");
    } else {
      const web3_address = loadWeb3Address();
      setAddress((web3_address as any).address);
    }
  };

  return (
    <div>
      <div className="Upper">
        <h1> Start Page for Connect wallet</h1>
        <button onClick={loadAddress}>Metamask Button</button>
      </div>
      <div className="Address">
        <h3> Address : {address}</h3>
      </div>
    </div>
  );
};

