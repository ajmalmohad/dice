"use client";

import { OrganisationReqCard } from "@/components/admin/organisation-req-card";
import { useWeb3 } from "@/components/auth/web3-provider";
import Navbar from "@/components/navbar/navbar";
import { useToast } from "@/components/ui/use-toast";
import { ConnectWeb3Wallet } from "@/components/web3/connect-web3-wallet";
import { useEffect, useState } from "react";

type Request = {
  id: string;
  institutionName: string;
  email: string;
  institutionAddress: string;
  licenseNumber: string;
  phoneNumber: string;
  user: {
    image: string;
    wallets: [{ walletID: string }];
  };
};

export default function Page() {
  let [loading, setLoading] = useState<boolean>(false);
  let [requests, setRequests] = useState<Request[]>([]);
  const { toast } = useToast();
  let { contract, address } = useWeb3();

  useEffect(() => {
    setLoading(true);
    fetch("/api/institution/pending")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
        setLoading(false);
      });
  }, [toast]);

  const handleInstitution = async (id: string, action: "accept" | "reject") => {
    if (loading) return;

    if (contract === null) {
      toast({
        title: "Error",
        description: "Please connect your contract",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)
      }ing institution request`,
      description: "Please wait",
    });

    try {
      let application = requests.filter((req: Request) => req.id === id)[0];
      if (action == "accept") {
        try {
          await contract.methods
            .addInstitution(application.user.wallets[0].walletID)
            .send({
              from: address,
            });
        } catch (e) {
          const error = e as Error;
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
      }

      const res = await fetch(`/api/institution/${action}`, {
        method: "POST",
        body: JSON.stringify({ requestId: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 200) {
        toast({ title: "Success", description: data.message });
        let filtered = requests.filter((req: Request) => req.id !== id);
        setRequests(filtered);
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
      <div className="max-2xl:grid max-2xl:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap w-full gap-4">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <OrganisationReqCard
              key={request.id}
              id={request.id}
              title={request.institutionName}
              email={request.email}
              loading={loading}
              imageLink={request.user.image}
              onAccept={() => handleInstitution(request.id, "accept")}
              onReject={() => handleInstitution(request.id, "reject")}
              institutionDetails={{
                institutionName: request.institutionName,
                institutionAddress: request.institutionAddress,
                licenseNumber: request.licenseNumber,
                phoneNumber: request.phoneNumber,
              }}
            />
          ))
        ) : (
          <div className="text-ring">
            {loading ? "Loading" : "No pending requests"}
          </div>
        )}
      </div>
    </div>
  );
}
