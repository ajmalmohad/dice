"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { z } from "zod";

type Issuer = {
  name: string;
  image: string;
};

type Credential = {
  id: string;
  credentialType: string;
  credentialLink: string;
  issuerWallet: string;
  issueDate: string;
  issuer: Issuer;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  selectedcreds: z
    .array(z.string())
    .min(1, { message: "Credential is required" }),
});

export function CreateSharedLink() {
  const { toast } = useToast();
  const [creds, setCreds] = useState<Credential[]>([]);
  const [selectedcreds, setSelectedCreds] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCreds = async () => {
      const res = await fetch("/api/credential", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 200) {
        setCreds(data);
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    };

    fetchCreds();
  }, [toast]);

  const addSharedLink = async () => {
    let body;

    try {
      body = formSchema.parse({ name, selectedcreds });
    } catch (e) {
      if (e instanceof z.ZodError) {
        toast({
          title: "Error",
          description: e.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred",
          variant: "destructive",
        });
      }
      return;
    }

    let res = await fetch("/api/sharedlink/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.status === 200) {
      toast({ title: "Success", description: data.message });
    } else {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add New</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shared Link</DialogTitle>
            <DialogDescription>
              Create a shared link with your credentials to share to the public
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="linkname"
                placeholder="Link Name"
                className="col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <ScrollArea className="h-[80px] col-span-4">
                {creds.map((cred, index) => (
                  <div key={index} className="flex items-center gap-2 my-3">
                    <Checkbox
                      id={cred.id}
                      checked={selectedcreds.includes(cred.id)}
                      onCheckedChange={() => {
                        if (selectedcreds.includes(cred.id)) {
                          setSelectedCreds(
                            selectedcreds.filter(
                              (selected) => selected !== cred.id,
                            ),
                          );
                        } else {
                          setSelectedCreds([...selectedcreds, cred.id]);
                        }
                      }}
                    />
                    <label
                      htmlFor={cred.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cred.credentialType} from {cred.issuer.name}
                    </label>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={addSharedLink}>Add Link</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
