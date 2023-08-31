import Web3 from "web3";
import SignupContract from "../../../../backend/smartcontract/build/contracts/SignupContract.json"


/////////////////////////////////////////////////////////////////////

//loadWeb3Address return user.address ex. 0x34752E0DeC3d55xxxxxxxx
export const loadWeb3Address = async () => {
  if ((window as any).ethereum) {
    (window as any).web3 = new Web3((window as any).ethereum);
    try {
      // Request user permission to connect to their Ethereum accounts.
      await (window as any).ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access:", error);
    }
  } else if ((window as any).web3) {
    // Legacy dapp browsers...
    (window as any).web3 = new Web3((window as any).web3.currentProvider);
  } else {
    // Non-Ethereum browser detected...
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  //load account value and return to use for frontend
  const web3 = (window as any).web3;
  const address = await web3.eth.getAccounts();
  return { address };
};

////////////////////////////////////////////////////////////////////

//set contractdata to use methods
export const loadSignupContract = async () => {
  const web3 = (window as any).web3;
  (window as any).web3 = new Web3((window as any).ethereum)
  // Load ETH account
  const address = await web3.eth.getAccounts();
  // Network ID
  const networkId = await web3.eth.net.getId();
  //Set contract data
  const contractdata = new web3.eth.Contract(
    SignupContract.abi,
    (SignupContract.networks as any)[networkId].address
  );
  return { contractdata};

};

////////////////////////////////////////////////////////////////////
