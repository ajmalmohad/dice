"use client";

import Navbar from "@/components/navbar/navbar";
import { PendingCredentialCard } from "@/components/student/pending-credential";
import { useToast } from "@/components/ui/use-toast";
import { ConnectWeb3Wallet } from "@/components/web3/connect-web3-wallet";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/components/auth/web3-provider";

type Credential = {
  id: string;
  credentialType: string;
  issuer: {
    image: string;
    name: string;
  };
  issueDate: string;
  credentialLink: string;
};

export default function Page() {
  const [creds, setCreds] = useState([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  let { contract } = useWeb3();

  useEffect(() => {
    setPageLoading(true);
    fetch("/api/credential/pending")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setCreds(data.data);
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const handleCredential = async (id: string, action: "accept" | "reject") => {
    if (contract === null) {
      toast({
        title: "Error",
        description: "Please connect your contract",
        variant: "destructive",
      });
      return;
    }

    if (loading) return;

    setLoading(true);
    toast({
      title: `${
        action.charAt(0).toUpperCase() + action.slice(1)
      }ing credential`,
      description: "Please wait",
    });

    try {
      if (action == "accept") {
        //TODO: Implement the logic to accept in blockchain
      } else if (action == "reject") {
        //TODO: Implement the logic to reject in blockchain
      }

      const res = await fetch(`/api/credential/${action}`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 200) {
        toast({ title: "Success", description: data.message });
        let filtered = creds.filter((cred: Credential) => cred.id !== id);
        setCreds(filtered);
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar className="mb-10" />
      <ConnectWeb3Wallet className="mb-6" />
      <div className="flex flex-col gap-4">
        {creds.length > 0 ? (
          creds.map((cred: Credential, idx: number) => {
            return (
              <PendingCredentialCard
                key={idx}
                title={cred.credentialType}
                imageLink={cred.issuer.image}
                issuer={cred.issuer.name}
                issueDate={cred.issueDate}
                credLink={cred.credentialLink}
                contract={contract}
                handleReject={() => handleCredential(cred.id, "reject")}
                handleAccept={() => handleCredential(cred.id, "accept")}
              />
            );
          })
        ) : (
          <div className="text-center text-ring">
            {pageLoading ? "Loading" : "No pending credentials"}
          </div>
        )}
      </div>
    </div>
  );
}
