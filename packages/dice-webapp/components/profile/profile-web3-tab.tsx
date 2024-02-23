import { IoIosWarning } from "react-icons/io";
import { Input } from "../ui/input";

export const ProfileWeb3Tab = ({
  walletIds,
}: {
  walletIds: { walletID: string }[] | null;
}) => {
  return (
    <div>
      <div>
        <p className="font-medium">Wallet</p>
        <p className="text-xs text-ring">Update your wallet information</p>
        {walletIds == null || walletIds?.length == 0 ? (
          <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
            <div className="p-2 text-sm rounded-md bg-amber-400/20 text-amber-600 dark:bg-amber-400/40 dark:text-amber-400">
              <span className="float-left text-lg mr-1">
                <IoIosWarning />
              </span>
              <p>
                You don&apos;t have any wallet address added. When you use a wallet
                to do transactions, it will be added here.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex mt-4 flex-col gap-1 items-start max-w-[500px]">
            <p className="text-xs text-ring">Wallet IDs</p>
            {walletIds.map((wallet, index) => (
              <div key={index} className="flex gap-2 w-full">
                <Input
                  className="grow"
                  placeholder="Wallet address"
                  defaultValue={wallet.walletID || ""}
                  disabled
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
