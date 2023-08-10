
//first page for connect button

"use client"
import { useState, useEffect } from "react";
import { loadWeb3Address } from "../../web3lib/web3_helper";
import Web3 from "web3";

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

  const onSignup = async () => {
    console.log("data = " ,userSignup)
  }



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
          <button onClick={onSignup}>
            Signup
          </button>
        </div>

      </div>
    </div>

  );
};

export default signup;