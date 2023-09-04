//Test Page

"use client";
import { useState, useEffect } from "react";
import {
  loadSignupContract,
  req_InitAccount,
  loadWeb3Address,
} from "../../../web3lib/web3_helper";

type UserSignup = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

const signup = () => {
  //signup page const
  const initialUserSignup = {
    username: "",
    email: "",
    phone: "",
    password: "",
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
        console.log("User input")
        console.log("Username : " + userSignup.username);
        console.log("Password : " + userSignup.password);
        console.log("Email : " + userSignup.email);
        console.log("Phone : " + userSignup.phone);
        const tx = await signupcontract.createUser(userSignup.username,userSignup.password,userSignup.email,userSignup.password);
        await tx.wait();
        console.log("Push complete")
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

  //Event handle for send data to database
  const startListener = async () => {
    function handleUserCreated(userAddress: string, username: string,password : string , email : string , phone : string) {
      console.log("StringCreated event received for user:", userAddress);
      console.log("String data:", username,password,email,phone);
      //database ->
      const url = 'http://localhost:8000/register';

      const requestBody = {
        username: username,
        email: email,
        password: password,
        phone: phone,
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      ////

    }
    console.log("start listener")
    signupcontract.on("UserCreated", handleUserCreated);
  };

  const register = async () => {
    const url = 'http://localhost:8000/register';

      const requestBody = {
        username: userSignup.username,
        email: userSignup.email,
        password: userSignup.password,
        phone: userSignup.phone,
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }


  return (
    <div>
      <div className="Upper">
        <h1> Signup Page</h1>
      </div>
      <div className="Address">
        <div className="Metamask button">
          <button onClick={loadAddress}>Metamask Button</button>
        </div>
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
        <div className="Start Listener button">
          <button onClick={startListener}>Start Listener</button>
        </div>
        <div className="Start Listener button">
          <button onClick={register}>Register Manual</button>
        </div>
      </div>
    </div>
  );
};

export default signup;