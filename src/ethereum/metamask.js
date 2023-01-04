import { ethers } from "ethers";
import { toast } from "react-toastify";
import faucetContract from "./faucet";
export const connectWallet = async (
  setWalletAddress,
  setSigner,
  setFcContract
) => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setSigner(provider.getSigner());
      setFcContract(faucetContract(provider));
      setWalletAddress(accounts[0]);
    } catch (err) {
        console.log(err.message)
      toast.warn(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } else {
    toast.error("please install metamask", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const getCurrentWalletConnected = async (
  setWalletAddress,
  setSigner,
  setFcContract
) => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setSigner(provider.getSigner());
        setFcContract(faucetContract(provider));
        setWalletAddress(accounts[0]);
      } else {
        toast.warn("Connect to Metamask using the connect button", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
        console.log(err.message)
      toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } else {
    toast.error("please install metamask", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const addWalletListener = async (setWalletAddress) => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      setWalletAddress(accounts[0]);
    });
  } else {
    setWalletAddress("");
    console.log("Please install MetaMask");
  }
};
