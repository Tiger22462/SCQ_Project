
//first page for connect button

"use client"
import { useState, useEffect } from "react";
import { loadWeb3Address } from "../web3lib/web3_helper";
import Web3 from "web3";

const start = () => {

	const [address, setAddress] = useState<string | null>(null);

	//Load Dynamic account with useEffect
	useEffect(() => {
		const web3 = new Web3((window as any).ethereum);

		(window as any).ethereum
			.request({ method: "eth_accounts" })
			.then((accounts: string[]) => {
				if (accounts.length > 0) {
					setAddress(accounts[0]);
				}
			})
			.catch((error: any) => {
				console.error("Error fetching accounts:", error);
			});

		// Listen for account changes
		(window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
			if (accounts.length > 0) {
				setAddress(accounts[0]);
			} else {
				setAddress(null);
			}
		});
	});



	const loadAddress = async () => {
		const web3_data = loadWeb3Address()
		setAddress((await web3_data).address)
	}


	return (
		<div>
			<div className="Upper">
				<h1> Start Page for Connect wallet</h1>
				<button onClick={loadAddress}>
					Metamask Button
				</button>
			</div>
			<div className="Address">
				<h3> Address : {address}</h3>

			</div>
		</div>

	);
};

export default start;