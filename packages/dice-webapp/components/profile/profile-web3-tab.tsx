import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ProfileWeb3Tab = ({ walletId }: { walletId: string }) => {
  return (
    <div>
      <div>
        <p className="font-medium">Wallet</p>
        <p className="text-xs text-ring">Update your wallet information</p>
        <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
          <p className="text-xs text-ring">Wallet ID</p>
          <div className="flex gap-2 w-full">
            <Input
              className="grow"
              placeholder="Enter your wallet address"
              defaultValue={walletId}
            />
            <Button variant="secondary">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};