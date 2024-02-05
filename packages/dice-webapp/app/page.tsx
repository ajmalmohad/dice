import Starfield from "@/components/landing/star-field";
import { buttonVariants } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import Logo from "/public/DICE.svg";
import Image from "next/image";
import { FaEthereum, FaGhost } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { IoAccessibility } from "react-icons/io5";
import { SiSharex, SiFsecure } from "react-icons/si";

export default function Page() {
  return (
    <div>
      <Starfield />
      <Spotlight
        className="min-w-[700px] md:left-60 md:-top-20"
        fill="white"
      />
      <Image className="p-4 filter invert" alt="Logo" src={Logo} width={100} />
      <section className="space-y-6 py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <p className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            Introducing
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl">
            Decentralized Immutable Credential Ecosystem
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A decentralized ecosystem geared for securely handling all of your key credentials.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/auth" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={"https://github.com/ajmalmohad/dice"}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="text-3xl" />
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            A secure, trustable and user-centric solution to manage and verify your credentials.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <PiCertificateFill className="text-white text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Management</h3>
                <p className="text-sm text-muted-foreground">
                  Securely issue and manage your credentials.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FaEthereum className="text-white text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Ethereum</h3>
                <p className="text-sm text-muted-foreground">
                  Decentralized application powered by Ethereum.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <IoAccessibility className="text-white text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Ease of access. Manage credentials from anywhere.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <SiSharex className="text-white text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Shareable</h3>
                <p className="text-sm text-muted-foreground">
                  Selectively share credentials as required.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <SiFsecure className="text-white text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Secure and immutable credentials, powered by blockchain.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FaGhost className="text-white text-5xl" />
              <div className="space-y-2">
                <h3 className="font-bold">Soulbound</h3>
                <p className="text-sm text-muted-foreground">
                  Non transferable Soulbound credentials for authenticity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
