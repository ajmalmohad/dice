"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface ProfileProps {
  name: string;
  profileUrl: string;
  email: string;
}

const ProfileInput = ({
  title,
  placeholder,
  disabled,
  value,
  setValue,
  onSave,
}: {
  title: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
}) => (
  <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
    <p className="text-xs text-ring">{title}</p>
    <div className="flex gap-2 w-full">
      <Input
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <Button variant="secondary" disabled={disabled} onClick={onSave}>
        Save
      </Button>
    </div>
  </div>
);

export const ProfileAccountTab = ({
  name,
  profileUrl,
  email,
}: ProfileProps) => {
  let { toast } = useToast();
  let [nameValue, setNameValue] = useState(name);
  let [profileUrlValue, setProfileUrlValue] = useState(profileUrl);

  const saveName = async () => {
    let res = await fetch("/api/profile/name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameValue }),
    });

    let data = await res.json();

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

  const saveProfileImage = async () => {
    let res = await fetch("/api/profile/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: profileUrlValue }),
    });

    let data = await res.json();

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
    <div className="flex flex-col gap-10">
      <div>
        <p className="font-medium">Profile</p>
        <p className="text-xs text-ring">Update your profile information</p>
        <ProfileInput
          title="Name"
          placeholder="Enter your name"
          value={nameValue}
          setValue={setNameValue}
          onSave={saveName}
        />
        <ProfileInput
          title="Profile Image"
          placeholder="Enter profile url"
          value={profileUrlValue}
          setValue={setProfileUrlValue}
          onSave={saveProfileImage}
        />
        <ProfileInput
          title="Email"
          placeholder="Email"
          disabled={true}
          value={email}
          setValue={() => {}}
          onSave={() => {}}
        />
      </div>

      <div>
        <p className="font-medium">Delete account</p>
        <p className="text-xs text-ring">Permanently delete your account</p>
        <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
          <Button variant="secondary">Delete account</Button>
        </div>
      </div>
    </div>
  );
};
