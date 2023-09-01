import Web3, { Contract, providers } from "web3";
import { ethers} from "ethers";
import SignupContract from "../../../../backend/smartcontract/build/contracts/SignupContract.json";


////////////////////////////////////////////////////////////////////
//loadWeb3Address return user.address ex. 0x34752E0DeC3d55xxxxxxxx
export const loadWeb3Address = async () => {
  //Check if connect to metamask or not?
  if ((window as any).ethereum) {
    console.log("Requesting account");
    try {
      const address = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return {address : address[0]}
    } catch {
      console.log("Please connect to metamask!");
    }
  }
};
////////////////////////////////////////////////////////////////////
//set contractdata to use methods

export const loadSignupContract = async () => {
     
  const provider = new ethers.BrowserProvider((window as any).ethereum)
  const signer = await provider.getSigner()
  //console.log(signer)
  const contractdata = new ethers.Contract(SignupContract.networks[5777].address, SignupContract.abi, signer);
  //console.log(contractdata)


  return { contractdata }

  // const provider = new ethers.BrowserProvider((window as any).ethereum)
  // const signer = await provider.getSigner()
  // const contractdata = new ethers.Contract(SignupContract.networks[5777].address, SignupContract.abi, signer);
  // let tx = await contractdata.createString("Tiger")
};

////////////////////////////////////////////////////////////////////

//set contractdata to use methods

export const loadSignupContract1 = async () => {
  if ((window as any) .ethereum) {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  }

  const provider = new (ethers as any).providers.Web3Provider((window as any).ethereum);
  
  // Load ETH account
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Network ID
  const networkId = (await provider.getNetwork()).chainId;

  // Set contract data
  const contractdata = new ethers.Contract(
    (SignupContract.networks as any)[networkId].address,
    SignupContract.abi,
    signer
  );

  return { contractdata };
};


////////////////////////////////////////////////////////////////////
