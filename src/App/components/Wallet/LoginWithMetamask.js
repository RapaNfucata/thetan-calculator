import { useEffect, useState } from "react";
import {ethers} from 'ethers';

function LoginWithMetamask() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setconButtonText] = useState("Connect Wallet");

    const connectWalletHandler = () => {
        if(window.ethereum) {
            // metamask c'è
            window.ethereum.request({method:  'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);
                console.log(result)
            })

        } else {
            // metamask non c'è
            setErrorMessage('Installa MetaMask');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString())

    }

    const getUserBalance = (adress) => {
        window.ethereum.request({method: 'eth_getBalance', params: [adress, 'latest']})
        .then(balance => {setUserBalance(ethers.utils.formatEther(balance))})

    }

    window.ethereum.on('accountsChanged', accountChangedHandler)



  return (
      <div>
          <button onClick={() => connectWalletHandler()}>{connButtonText}</button>
          
          <div>
              {defaultAccount}
          </div>
          <div>
              {userBalance}
          </div>
          <div>
              {errorMessage}
          </div>
      </div>
  );
}

export default LoginWithMetamask
