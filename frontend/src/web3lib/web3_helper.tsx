import { ethers } from "ethers";
import SignupContract from "../../../backend/smartcontract/build/contracts/SignupContract.json";
import StringContract from "../../../backend/smartcontract/build/contracts/StringContract.json";

////////////////////////////////////////////////////////////////////
//loadWeb3Address return user.address ex. 0x34752E0DeC3d55xxxxxxxx
export const loadWeb3Address = async () => {
  // Check if connected to Metamask or not
  try {
    if ((window as any).ethereum) {
      console.log("Requesting account");
      try {
        const address = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        return { address: address[0] };
      } catch (error) {
        //User rejected the connection
        if ((error as any).code === 4001) {
          alert("User rejected connection to Metamask.");
        }
        //User forgot to see popup
        if ((error as any).code === -32002) {
          alert("Please check your metamask Popup");
        } else {
          console.error(
            "An error occurred while connecting to Metamask:",
            error
          );
        }
      }
    } else {
      alert("Metamask not detected. Please install or enable Metamask.");
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
};
////////////////////////////////////////////////////////////////////
//for request when user already connected to metamask
export const req_InitAccount = () => {
  return new Promise<string | null>((resolve) => {
    // Check if MetaMask is installed and has an active Ethereum provider
    if ((window as any).ethereum && (window as any).ethereum.selectedAddress) {
      resolve((window as any).ethereum.selectedAddress);
    } else {
      console.log("No accounts");
      resolve(null);
    }
  });
};

////////////////////////////////////////////////////////////////////
//set contractdata to use methods
export const loadSignupContract = async (address: any) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner(address);
  const contractdata = new ethers.Contract(
    SignupContract.networks[5777].address,
    SignupContract.abi,
    signer
  );
  return { contractdata, signer };
};

////////////////////////////////////////////////////////////////////
//set contractdata to use methods
export const loadStringContract = async (address: any) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner(address);
  const contractdata = new ethers.Contract(
    StringContract.networks[5777].address,
    StringContract.abi,
    signer
  );
  return { contractdata, signer };
};