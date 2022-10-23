import { useState, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import dapp from "./contracts/dapp1.json";


import logo from './logo.svg';
import './App.css';



function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [dappContract, setdappContract] = useState(undefined);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);


  useEffect(() => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);

    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if(!ethereum) {
        sethaveMetamask(false);
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
      
    } catch(err) {
      throw err;
    };
    
  };

  const executeContract = async (e) => {
    e.preventDefault();
    // const data = e.target.elements[0].value;
    if(ethereum) {
      // await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts)
      // const networkID = await ethereum.request({ method: 'net_version' });
      const signer = provider.getSigner();
      const dapp_ = new Contract(
        accounts[0],
        dapp.abi,
        signer
      );
      const tx = await dapp_.increamentCount();
      await tx.wait();
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountBalance(bal);
      console.log(bal)
    }
  };

  return (
    <div className="App">
      <button className='btn' onClick={connectWallet}>Connect</button>
      <div>
        Wallet Address: {accountAddress.slice(0, 4)}...{accountAddress.slice(38, 42)}
      </div>
      <div>
        Wallet Balance: {accountBalance}
      </div>
      <button onClick={e => executeContract(e)}>increament</button>
    </div>
  );
}



export default App;
