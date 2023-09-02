import Web3, { Contract, providers } from "web3";
import { ethers} from "ethers";
import SignupContract from "../../../../backend/smartcontract/build/contracts/SignupContract.json";
import { sign } from "crypto";


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
        if ((error as any).code === 4001) {
          // User rejected the connection
          console.log("User rejected connection to Metamask.");
        } else {
          console.error("An error occurred while connecting to Metamask:", error);
        }
      }
    } else {
      console.log("Metamask not detected. Please install or enable Metamask.");
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
};
////////////////////////////////////////////////////////////////////
//set contractdata to use methods

export const loadSignupContract = async (address:any) => {
  
  console.log(address)
  const provider = new ethers.BrowserProvider((window as any).ethereum)
  const signer = await provider.getSigner(address)
  console.log(signer)
  //console.log(signer)
  const contractdata = new ethers.Contract(SignupContract.networks[5777].address, SignupContract.abi, signer);
  //console.log(contractdata)


  return { contractdata , signer}

  // const provider = new ethers.BrowserProvider((window as any).ethereum)
  // const signer = await provider.getSigner()
  // const contractdata = new ethers.Contract(SignupContract.networks[5777].address, SignupContract.abi, signer);
  // let tx = await contractdata.createString("Tiger")
};

////////////////////////////////////////////////////////////////////

//set contractdata to use methods



////////////////////////////////////////////////////////////////////


export const request_Account = () => {
  return new Promise<string | null>((resolve) => {
    // Event listener for account change
    (window as any).ethereum.on("accountsChanged", (address: string[]) => {
      if (address.length > 0) {
        resolve(address[0]);
      } else {
        console.log("No accounts");
        resolve(null);
      }
    });
  });
}
