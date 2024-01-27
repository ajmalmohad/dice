import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ProfileAccountTab = () => {
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
              defaultValue={"John Doe"}
            />
            <Button variant="secondary">Save</Button>
          </div>
        </div>
        <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
          <p className="text-xs text-ring">Profile Image</p>
          <div className="flex gap-2 w-full">
            <Input
              className="grow"
              placeholder="Enter profile url"
              defaultValue={"https://somekindofurl"}
            />
            <Button variant="secondary">Save</Button>
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
