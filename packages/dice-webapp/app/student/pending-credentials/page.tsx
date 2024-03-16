"use client";

import Navbar from "@/components/navbar/navbar";
import { PendingCredentialCard } from "@/components/student/pending-credential";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";

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
  const {toast} = useToast();
  const isLoading = useRef<boolean>(false);

  useEffect(() => {
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
          variant: "destructive"
        });
      });
  }, []);

  const handleReject = async (id: string) => {
    if (isLoading.current) return;

    isLoading.current = true;
    toast({ title: "Rejecting credential", description: "Please wait" });

    const res = await fetch("/api/credential/reject", {
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
      isLoading.current = false;
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      isLoading.current = false;
    }
  }

  const handleAccept = async (id: string) => {
    // Accept Via Blockchain too firsty
    if(isLoading.current) return;

    isLoading.current = true;
    toast({ title: "Accepting credential", description: "Please wait" });

    const res = await fetch("/api/credential/accept", {
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
      isLoading.current = false;
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
      isLoading.current = false;
    }
  }

  return (
    <div>
      <Navbar className="mb-10" />
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
                handleReject={() => handleReject(cred.id)}
                handleAccept={() => handleAccept(cred.id)}
              />
            );
          })
        ) : (
          <div className="text-center text-ring">No pending credentials</div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
