import { Card, CardContent } from "../ui/card";

import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: number;
  total: number;
  className?: string;
};

export const OrganisationStatCard = ({
  title,
  value,
  total,
  className,
}: StatCardProps) => {
  let height = 16 * (value / total);
  if (height < 4) {
    height = 4;
  }

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + "M+";
    } else if (val >= 1000) {
      return (val / 1000).toFixed(1) + "K+";
    } else {
      return val.toString();
    }
  };

  return (
    <Card className={cn("min-w-[200px]", className)}>
      <CardContent className="flex justify-between p-6">
        <div className="flex flex-col justify-between">
          <div className="text-3xl font-medium">{formatValue(value)}</div>
          <div className="flex gap-2 items-center">
            <div
              className={`rounded-full w-5 h-2 ${
                title === "Active Credentials"
                  ? "bg-green-500"
                  : "bg-orange-500"
              }`}
            ></div>
            <div className="text-sm font-medium">{title}</div>
          </div>
        </div>
        <div className="relative border rounded-lg">
          <div className="rounded-full w-4 h-16 border-1"></div>
          <div
            className={`rounded-full w-4 absolute bottom-0 border-x-1 border-b-1 ${
              title === "Active Credentials" ? "bg-green-500" : "bg-orange-500"
            }`}
            style={{ height: height * 4 }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
