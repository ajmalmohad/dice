"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ProfileAccountTab = ({
  name,
  profileUrl,
  email,
}: {
  name: string;
  profileUrl: string;
  email: string;
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="font-medium">Profile</p>
        <p className="text-xs text-ring">Update your profile information</p>
        <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
          <p className="text-xs text-ring">Name</p>
          <div className="flex gap-2 w-full">
            <Input
              className="grow"
              placeholder="Enter your name"
              defaultValue={name}
            />
            <Button
              variant="secondary"
              onClick={() => {
                console.log("Save");
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
          <p className="text-xs text-ring">Profile Image</p>
          <div className="flex gap-2 w-full">
            <Input
              className="grow"
              placeholder="Enter profile url"
              defaultValue={profileUrl}
            />
            <Button
              variant="secondary"
              onClick={() => {
                console.log("Save");
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
          <p className="text-xs text-ring">Profile Image</p>
          <div className="flex gap-2 w-full">
            <Input
              className="grow"
              placeholder="Email"
              defaultValue={email}
              disabled
            />
            <Button variant="secondary" disabled>
              Save
            </Button>
          </div>
        </div>
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
