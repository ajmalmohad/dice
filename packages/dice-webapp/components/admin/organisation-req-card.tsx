import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "../utils/formatter";
import { useWeb3 } from "../auth/web3-provider";

type OrganisationReqCardProps = {
  id: string;
  title: string;
  email: string;
  imageLink: string | null;
  loading: boolean;
  onAccept: () => void;
  onReject: () => void;
  className?: string;
};

export const OrganisationReqCard = ({
  title,
  email,
  imageLink,
  loading,
  onAccept,
  onReject,
  className,
}: OrganisationReqCardProps) => {
  const { contract } = useWeb3();

  return (
    <Card className={className}>
      <CardContent className="flex flex-col p-4 gap-6">
        <div className="flex gap-6 items-center">
          <Avatar>
            <AvatarImage src={imageLink ? imageLink : ""} />
            <AvatarFallback>{getInitials(title)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <div className="text-xl font-medium">{title}</div>
            <div className="text-sm text-ring">{email}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              disabled={loading || !contract}
              onClick={onAccept}
              className="grow bg-green-500 text-white w-full hover:bg-green-500/90 dark:bg-green-700  dark:hover:bg-green-700/90"
            >
              Accept
            </Button>
            <Button
              onClick={onReject}
              disabled={loading || !contract}
              className="grow w-full"
              variant="destructive"
            >
              Reject
            </Button>
          </div>
          <Button
            className="bg-gray-500 text-white w-full hover:bg-gray-500/90 dark:bg-gray-700  dark:hover:bg-gray-700/90"
            variant="secondary"
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
