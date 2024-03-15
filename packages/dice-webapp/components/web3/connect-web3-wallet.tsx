"use client";

import { useContext } from "react";
import { Button } from "../ui/button";
import { Web3Context } from "../auth/web3-provider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "../ui/use-toast";

export function ConnectWeb3Wallet({ className }: { className?: string }) {
  let { contract, address, connectWallet, error } = useContext(Web3Context);
  let { toast } = useToast();

  let connectWeb3 = () => {
    connectWallet();
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={className}>
      <div className="mb-2">
        {address ? (
          <Badge variant="outline">
            Connected to wallet {address.toString().slice(0, 10) + "..."}
          </Badge>
        ) : (
          ""
        )}
      </div>
      <div>
        {contract ? (
          <Badge variant="outline">
            Created contract instance for{" "}
            {contract._address.toString().slice(0, 10) + "..."}
          </Badge>
        ) : (
          <Button onClick={connectWeb3} variant="outline">
            Connect to contract
          </Button>
        )}
      </div>
    </div>
  );
}
