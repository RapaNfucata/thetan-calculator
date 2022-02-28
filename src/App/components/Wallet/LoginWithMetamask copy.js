import { useEffect, useState } from "react";

function LoginWithMetamask2() {
  const [loggedIn, setLog] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!window.ethereum) {
      alert("metamask non trovato");
    } else {
      console.log(window.ethereum);
    }
  }, []);
  async function login() {

    const accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((e) => {
        console.error(e.message);
        return;
      });
    if (!accounts) {
      return;
    }
    window.userWalletAddress = accounts[0];
    setAddress(accounts[0]);
    setLog(true)
  }

  function logOut() {
      window.userWalletAddress = null;
      setAddress("")
      setLog(false)
  }

  return (
      <div>
          {loggedIn ? <button onClick={() => logOut()}>LogOut With MetaMask</button> : <button onClick={() => login()}>Login With MetaMask</button>}
          
          <div>
              {address}
          </div>
      </div>
  );
}

export default LoginWithMetamask2;
