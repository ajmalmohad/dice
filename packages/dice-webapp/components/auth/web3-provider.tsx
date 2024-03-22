import { abi, contractAddress } from "@/components/web3/creds";
import { createContext, ReactNode, useContext, useState } from "react";
import Web3 from "web3";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

  const getExistingWallet = async (): Promise<any | null> => {
    try {
      const response = await fetch("/api/wallet");
      const data = await response.json();
      return data.length === 0 ? null : data[0];
    } catch (e) {
      return null;
    }
  };

  const createWallet = async (walletAddress: string): Promise<boolean> => {
    const response = await fetch("/api/wallet/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress }),
    });

    const data = await response.json();

    if (response.ok) {
      toast({ title: "Success", description: "Wallet created" });
      return true;
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      return false;
    }
  };

  const connectContract = (web3Instance: Web3) => {
    try {
      const contractInstance = new web3Instance.eth.Contract(
        abi,
        contractAddress,
      );
      setContract(contractInstance);
    } catch (err) {
      setError("Failed to create contract instance");
    }
  };

  const handleWalletConnection = async (accounts: string[]) => {
    const existingWallet = await getExistingWallet();
    if (!existingWallet) {
      const walletCreated = await createWallet(accounts[0]);
      if (!walletCreated) {
        resetWalletState();
        return;
      }
    } else if (existingWallet.walletID !== accounts[0]) {
      toast({
        title: "Wallet address mismatch",
        description: `Use ${existingWallet.walletID} to connect`,
        variant: "destructive",
      });
      resetWalletState();
      return;
    }

    const web3Instance = new Web3(window.ethereum);
    setAddress(accounts[0]);
    setWeb3(web3Instance);
    connectContract(web3Instance);
  };

  const resetWalletState = () => {
    setAddress(null);
    setWeb3(null);
    setContract(null);
  };

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleWalletConnection)
        .catch((err: Error) => setError(err.message));
      window.ethereum.on("accountsChanged", handleWalletConnection);
      window.ethereum.on("disconnect", resetWalletState);
    } else {
      setError("Please install MetaMask");
    }
  };

  return (
    <Web3Context.Provider
      value={{ web3, address, contract, error, connectWallet }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
export { Web3Provider };
