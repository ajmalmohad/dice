"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterWithCreds() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const { toast } = useToast();

  return (
    <>
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
        className="mb-4"
      />
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
        className="mb-4"
      />
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
        className="mb-4"
      />
      <Select
        value={isStudent ? "student" : "institution"}
        onValueChange={(val) => {
          setIsStudent(val === "student");
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="institution">Institution</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={async () => {
          if (email === "" || password === "" || isStudent === undefined) {
            return;
          }
          const res = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              role: isStudent ? "STUDENT" : "PENDING_INSTITUTION",
            }),
          });
          if (res.status === 200) {
            toast({
              variant: "default",
              title: "Your request was successful.",
              description: "User created.",
            });
          } else {
            let data = await res.json();

            toast({
              variant: "destructive",
              title: "Your request failed.",
              description: data.error,
            });
          }
        }}
        className="rounded-md mb-4 flex items-center mt-4"
      >
        <p className="text-sm md:text-base">Submit</p>
      </Button>
    </>
  );
}
