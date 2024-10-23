"use client";

import Link from "next/link";

import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

import { useSDK } from "@metamask/sdk-react";
import { formatAddress } from "../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();
  const [isConnected, setIsConnected] = useState(connected);

  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);

  const connect = async () => {
    try {
      await sdk?.connect();
      setIsConnected(true);
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setIsConnected(false);
    }
  };

  return (
    <div className="relative">
      {isConnected ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-lg px-2 py-1">
              <Wallet className="h-4 w-4" />
              {formatAddress(account)}
            </div>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
            <span
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200 cursor-pointer"
            >
              Disconnect
            </span>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </div>
  );
};

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-between max-w-screen-xl px-6 mx-auto py-7 rounded-xl">
      <Link href="/" className="flex gap-1 px-6">
        <span className="text-2xl font-bold">
          <span className="text-gray-900">LivyPass</span>
        </span>
      </Link>
      <div className="flex gap-4 px-6">
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default NavBar;
