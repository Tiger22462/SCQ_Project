//first page for connect button

"use client";
import { useState, useEffect } from "react";
import { loadWeb3Address , loadSignupContract } from "../web3lib/web3_helper";


const start = () => {
	const [address, setAddress] = useState<string | null>(null);
	//Load Dynamic account with useEffect
	useEffect(() => {
		async function request_Account() {

			//Check if connect to metamask or not?
			if ((window as any).ethereum) {
				//console.log("Requesting account")
				try {
					const address = await (window as any).ethereum.request({
						method: "eth_requestAccounts"
					});
					//console.log(address[0])
					setAddress(address[0])
					//console.log((window as any).ethereum.isConnected())

				}
				catch {
					console.log("Please connect to metamask!")
				}
				//event listen for account change
				(window as any).ethereum.on("accountsChanged", (address: string[]) => {
					      if (address.length > 0) {
							//console.log(address[0])
					        setAddress(address[0]);
					      } else {
							console.log("no accounts")
					        setAddress(null);
					      }
					    });
			}else {alert("Metamask is not installed!")}
		}
		request_Account()
	});



	const loadAddress = async () => {
		const web3_address = loadWeb3Address();
		setAddress((await web3_address as any).address);
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
