"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { H3, H4 } from "@/components/ui/typography";
import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button";
import { Html5QrcodeScanner } from "html5-qrcode";

function MarketerOverview() {
  const { account } = useSDK();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<null | {
    userAddress: string;
    contractAddress: string;
  }>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const startScanning = () => {
    setScanning(true);
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    scannerRef.current.render(onScanSuccess, onScanFailure);
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      setScanning(false);
    }
  };

  const onScanSuccess = (decodedText: string) => {
    try {
      const parsedData = JSON.parse(decodedText);
      setScannedData(parsedData);
      stopScanning();
    } catch (error) {
      console.error("Invalid QR code data:", error);
    }
  };

  const onScanFailure = (error: unknown) => {
    console.warn(`QR code scan error: ${error}`);
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
            {!scanning && !scannedData && (
              <Button
                onClick={startScanning}
                className="w-full bg-white text-blue-600 hover:bg-blue-100"
              >
                Start Scanning
              </Button>
            )}
            {scanning && <div id="reader" className="w-full"></div>}
            {scannedData && (
              <div className="mt-4 p-4 bg-white/10 rounded-md">
                <p className="text-sm">
                  User Address: {scannedData.userAddress}
                </p>
                <p className="text-sm">
                  Contract Address: {scannedData.contractAddress}
                </p>
                <Button
                  onClick={() => {
                    setScannedData(null);
                    setScanning(false);
                  }}
                  className="mt-2 w-full bg-white text-blue-600 hover:bg-blue-100"
                >
                  Scan Again
                </Button>
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
