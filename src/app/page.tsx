"use client";

import QrCode from "@/components/QrCode";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { H3, H4 } from "@/components/ui/typography";
import { useSDK } from "@metamask/sdk-react";

function QrCodeOverview() {
  const { account } = useSDK();
  const contract = "0x1234...5678"; // TODO integrate with contract

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-green-400 to-green-600 text-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <H3 className="font-bold">LivyPass</H3>
        </div>

        <Separator className="bg-white/20" />

        <div className="space-y-2">
          <H4 className="font-semibold">
            Claim Rewards By Scanning your QR Code
          </H4>
        </div>
        {account ? (
          <QrCode
            data={{
              userAddress: account,
              contractAddress: contract,
            }}
            title="Scan for Entry"
            description="Present this QR code to the cashier"
          />
        ) : (
          <p>Please connect your wallet to continue</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <QrCodeOverview />
    </div>
  );
}
