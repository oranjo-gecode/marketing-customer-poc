"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QRCodeDisplayProps {
  data: {
    userAddress: string;
    contractAddress: string;
  };
  title: string;
  description?: string;
}

export default function QrCode(
  { data, title, description }: QRCodeDisplayProps = {
    data: {
      userAddress: "",
      contractAddress: "",
    },
    title: "QR Code",
  }
) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(JSON.stringify(data), {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [data]);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex justify-center items-center p-6">
        {qrCodeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-full max-w-[250px] h-auto"
          />
        ) : (
          <div className="w-64 h-64 bg-gray-200 animate-pulse rounded-lg"></div>
        )}
      </CardContent>
    </Card>
  );
}
