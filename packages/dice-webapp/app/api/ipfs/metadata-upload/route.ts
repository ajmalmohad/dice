import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { certificateLink, certificateType } = await request.json();

    const credentialLink = `ipfs://${certificateLink}`;

    const metadata = JSON.stringify({
      pinataContent: {
        name: "DICE Credential",
        description: `${certificateType}`,
        credential: credentialLink,
      },
      pinataMetadata: {
        name: "DICE Credential Metadata",
      },
    });

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: metadata,
    });

    const { IpfsHash } = await res.json();
    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error uploading metadata to IPFS" }, { status: 500 });
  }
}
