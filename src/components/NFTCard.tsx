"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Collectible {
  id: number;
  name: string;
  image: string;
  description: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  uri: string;
  owner: string;
}

export default function NFTCard({ nft }: { nft: Collectible }) {
  return (
    <Card className="w-[300px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={nft.image}
            alt="NFT Image"
            className="h-60 w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 p-2">
            <span className="text-white">#{nft.id}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{nft.name}</h3>
          <div className="flex flex-wrap gap-2">
            {nft.attributes?.map((attr, index) => (
              <Badge key={index} variant="secondary">
                {attr.value}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{nft.description}</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Owner:</span>
          <span className="text-sm">{nft.owner}</span>
        </div>
      </CardContent>
    </Card>
  );
}
