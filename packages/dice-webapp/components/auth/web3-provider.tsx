import { abi, contractAddress } from "@/components/web3/creds";
import { createContext, ReactNode, useEffect, useState } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface IWeb3Context {
  web3: Web3 | null;
  address: string | null;
  contract: any | null;
  error: string | null;
  connectWallet: () => void;
}

export const Web3Context = createContext<IWeb3Context>({
  web3: null,
  address: null,
  contract: null,
  error: null,
  connectWallet: () => {},
});

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  let connectContract = (web3: Web3) => {
    if (web3) {
      try {
        let contr = new web3.eth.Contract(abi, contractAddress);
        setContract(contr);
      } catch (err) {
        setError("Failed to create contract instance");
      }
    } else {
      setError("Please connect your wallet");
    }
  }

  let connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAddress(accounts[0]);
          let w3 = new Web3(window.ethereum);
          setWeb3(w3);
          connectContract(w3);
        })
        .catch((err: Error) => setError(err.message));

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0]);
      });

      window.ethereum.on("disconnect", () => {
        setAddress(null);
        setWeb3(null);
        setContract(null);
      });
    } else {
      setError("Please install MetaMask");
    }
  };

  return (
    <Web3Context.Provider value={{ web3, address, contract, error, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Provider };
