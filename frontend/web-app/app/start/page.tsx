//first page for connect button

"use client";
import { useState, useEffect } from "react";
import { loadWeb3Address,request_Account} from "../web3lib/web3_helper";

const start = () => {
  const [address, setAddress] = useState<string | null>(null);
  //Load Dynamic account with useEffect
  useEffect(() => {
    request_Account()
      .then((result) => {
        setAddress(result);
      })
      .catch((error) => {
        console.error("Error fetching Ethereum account:", error);
      });
  }, [])

  const loadAddress = async () => {
		const web3_address = loadWeb3Address();
		setAddress(((web3_address) as any).address);
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

export default start;
