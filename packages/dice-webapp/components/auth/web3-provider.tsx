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
}

export const Web3Context = createContext<IWeb3Context | null>(null);

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abi: any = []; // YOUR_CONTRACT_ABI
    const contractAddress = "YOUR_CONTRACT_ADDRESS";

    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAddress(accounts[0]);
          let w3 = new Web3(window.ethereum);
          setWeb3(w3);
          try {
            let contr = new w3.eth.Contract(abi, contractAddress);
            setContract(contr);
          } catch (err) {
            setError("Failed to connect to contract");
          }
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
  }, []);

  return (
    <Web3Context.Provider value={{ web3, address, contract, error }}>
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Provider };
