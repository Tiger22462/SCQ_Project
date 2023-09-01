//first page for connect button

"use client";
import { useState, useEffect } from "react";
import { loadWeb3Address, loadSignupContract } from "../../web3lib/web3_helper";
import { ethers } from "ethers";
import Web3 from "web3";



type UserSignup = {
  username: string;
  email: string;
  phone: string;
  password: string;
  address: string
};

const signup = () => {
  //signup page const
  const initialUserSignup = {
    username: "",
    email: "",
    phone: "",
    password: "",
    address: ""
  };
  const [userSignup, setUserSignup] = useState<UserSignup>(initialUserSignup);
  //web3 const
  const [address, setAddress] = useState<string | null>(null);
  const [signupcontract, setSignupContract] = useState<any>(null);
  //contract add format
  //const [<contractname>,<setContractName>] = useState<any>(null);
  const [web3flag, setWeb3flag] = useState(false);
  const [checkstring, setCheckString] = useState<string | null>(null);

  //useEffect for web3
  useEffect(() => {
    ///////////////////////////////////////////////////////
    //Load Dynamic account with useEffect
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
    ///////////////////////////////////////////////////////
    //Load contract
    const loadcontract = async () => {
      try {
        if (web3flag != true) {
          let data = await loadSignupContract();
          setSignupContract(data.contractdata);
          //more contract here
          setWeb3flag(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadcontract();
    //console.log(signupcontract)
    ///////////////////////////////////////////////////////
  });

  const onSignup = async () => {
    console.log(userSignup.username)
    signupcontract.createString(userSignup.username)
    //signupcontract.createString("Tiger");
    //signupcontract.createString

    //signupcontract.
    // signupcontract.events.StringCreated({
    //   // Additional options, like fromBlock, toBlock, etc.
    // })
    //   .on('data', (event: any) => {
    //     console.log('StringCreated event received:', event.returnValues.data);

    //   })
  };

  const checkSignup = () => {
    setCheckString(signupcontract.getString(userSignup.address))
  }

  
  // const sendapi = async () => {
  //   const name = "Tiger";
  //   const url = "http://localhost:3003/insert"; // Update with the actual URL of your backend

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name }), // Send the name as JSON in the request body
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.message); // The response message from the backend
  //     } else {
  //       console.error("Error sending data to backend");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };


  
  return (
    <div>
      <div className="Upper">
        <h1> Signup Page</h1>
      </div>
      <div className="Address">
        <h3> Address : {address}</h3>
      </div>
      <div className="Signuppanel">
        <h1> Signup Panel</h1>
        <div className="Username">
          <label> Username </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your username"
            onChange={(e) => {
              setUserSignup({ ...userSignup, username: e.target.value });
            }}
          />
        </div>
        <div className="Password">
          <label> Password </label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Your password"
            onChange={(e) => {
              setUserSignup({ ...userSignup, password: e.target.value });
            }}
          />
        </div>
        <div className="Email">
          <label> Email </label>
          <input
            type="text"
            name="Email"
            id="Email"
            placeholder="Email"
            onChange={(e) => {
              setUserSignup({ ...userSignup, email: e.target.value });
            }}
          />
        </div>
        <div className="Phone Number">
          <label> Phone Number </label>
          <input
            type="text"
            name="Phone"
            id="Phone"
            placeholder="Phone"
            onChange={(e) => {
              setUserSignup({ ...userSignup, phone: e.target.value });
            }}
          />
        </div>
        <div className="button">
          <button onClick={onSignup}>Signup</button>
        </div>
        <div className="Address">
          <label> Addresscheck </label>
          <input
            type="text"
            name="Address"
            id="Address"
            placeholder="Address"
            onChange={(e) => {
              setUserSignup({ ...userSignup, address: e.target.value });
            }}
          />
        </div>
        <div className="Checkbutton">
          <button onClick={checkSignup}>Check Value</button>
          <h3>{checkstring}</h3>
        </div>
        <div className="Apibutton">
          <button >Send Api</button>
        </div>
      </div>
    </div>
  );
};

export default signup;
