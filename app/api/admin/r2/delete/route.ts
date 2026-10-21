import { NextRequest, NextResponse } from "next/server";
import { deleteFromR2, isR2Configured } from "@/lib/r2/client";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json({ error: "No object key provided" }, { status: 400 });
    }

    if (isR2Configured()) {
      await deleteFromR2(key);
      return NextResponse.json({ success: true, source: "cloudflare-r2", key });
    }

    // Local fallback deletion
    const localPath = path.join(process.cwd(), "public", key);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    return NextResponse.json({ success: true, source: "local-simulation", key });
  } catch (error: any) {
    console.error("R2 Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete Cloudflare R2 object" },
      { status: 500 }
    );
  }
}
