"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { H3, H4 } from "@/components/ui/typography";
import { useSDK } from "@metamask/sdk-react";
import { Html5QrcodeScanner } from "html5-qrcode";

function MarketerOverview() {
  const { account } = useSDK();
  const [scannedData, setScannedData] = useState<null | {
    userAddress: string;
    contractAddress: string;
  }>(null);
  const [isScanning, setIsScanning] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  const html5QrcodeScanner = useMemo(() => {
    return new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
  }, []);

  useEffect(() => {
    if (!readerRef.current) return;

    const onScanSuccess = (decodedText: string) => {
      try {
        const parsedData = JSON.parse(decodedText);
        setScannedData(parsedData);
        setIsScanning(false);
      } catch (error) {
        console.error("Invalid QR code data:", error);
      }
    };

    html5QrcodeScanner.render(onScanSuccess, () => {});

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [html5QrcodeScanner, isScanning]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScannedData(null);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <H3 className="font-bold">LivyPass Marketer</H3>
        </div>

        <Separator className="bg-white/20" />

        <div className="space-y-2">
          <H4 className="font-semibold">Scan Customer QR Code</H4>
        </div>
        {account ? (
          <>
            <div id="reader" ref={readerRef} className="w-full"></div>
            {!isScanning && !scannedData && (
              <button
                onClick={handleStartScan}
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Start Scanning
              </button>
            )}
            {isScanning && (
              <button
                onClick={handleStopScan}
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Stop Scanning
              </button>
            )}
            {scannedData && (
              <div className="mt-4 p-4 bg-white/10 rounded-md">
                <p className="text-sm">
                  User Address: {scannedData.userAddress}
                </p>
                <p className="text-sm">
                  Contract Address: {scannedData.contractAddress}
                </p>
              </div>
            )}
          </>
        ) : (
          <p>Please connect your wallet to continue</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4">
      <MarketerOverview />
    </div>
  );
}
