import Image from "next/image";

export const WaitForConfirmation = ({ className }: { className?: string }) => {
  return (
    <div className={className + " flex flex-col items-center text-center"}>
      <Image
        className="filter dark:invert"
        alt="Tick"
        src="/institution/tick.svg"
        width={300}
        height={300}
      />
      <p className="text-2xl font-semibold mb-2">All right!</p>
      <p className="text-slate-500 dark:text-slate-400">
        Your application is being reviewed
      </p>
    </div>
  );
};
