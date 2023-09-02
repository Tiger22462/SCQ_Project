//first page for connect button

"use client";
import { useState, useEffect } from "react";
import {
  loadSignupContract,
  req_InitAccount,
  loadWeb3Address,
} from "../../web3lib/web3_helper";

type UserSignup = {
  username: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};

const signup = () => {
  //signup page const
  const initialUserSignup = {
    username: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  };
  const [userSignup, setUserSignup] = useState<UserSignup>(initialUserSignup);

  //web3 const
  const [address, setAddress] = useState<string | null>(null);
  const [signupcontract, setSignupContract] = useState<any>(null);

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
      let data = await loadSignupContract(address);
      setSignupContract(data.contractdata);
      //more contract here
    } catch (error) {
      console.log(error);
    }
  };

  //const for front end

  const onSignup = async () => {
    try {
      if (address) {
        console.log(userSignup.username);

        const tx = await signupcontract.createString(userSignup.username);
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

  const checkSignup = async () => {
    if (userSignup.address && address) {
      setCheckString(signupcontract.getString(userSignup.address));
    } else if (!userSignup.address) {
      alert("Please enter address");
    } else if (!address) {
      alert("No address please connect to metamask");
    }
  };

  //Event handle for send data to database
  const startListener = async () => {
    function handleStringCreated(userAddress: string, data: string) {
      console.log("StringCreated event received for user:", userAddress);
      console.log("String data:", data);
    }
    signupcontract.on("StringCreated", handleStringCreated);
  };

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
        <div className="Metamask button">
          <button onClick={loadAddress}>Metamask Button</button>
        </div>
        <div className="Start Listener button">
          <button onClick={startListener}>Start Listener</button>
        </div>
      </div>
    </div>
  );
};

export default signup;
