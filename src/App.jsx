import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { connectWallet, getCurrentWalletConnected, addWalletListener } from './ethereum/metamask'
function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState()
  const [fcContract, setFcContract] = useState()
  const [transactionInfo, setTransactionInfo] = useState()
  useEffect(() => {
    getCurrentWalletConnected(setWalletAddress, setSigner, setFcContract);
    addWalletListener(setWalletAddress);
  }, [walletAddress]);

  const getFaucet = async () => {
    try {
      const response = await fcContract.connect(signer).requestToken()
      setTransactionInfo(response.hash)
      toast.success("You got your faucet!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }catch(err) {
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
  }
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Samada Token (SDA)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={() => connectWallet(setWalletAddress, setSigner, setFcContract)}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Fast and reliable. 20 SDA/12 hours.</p>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                  defaultValue={walletAddress}
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                  />
                </div>
                <div className="column">
                  <button onClick={getFaucet} disabled={walletAddress.length < 1} className="button is-link is-medium">
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>{transactionInfo}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default App;
