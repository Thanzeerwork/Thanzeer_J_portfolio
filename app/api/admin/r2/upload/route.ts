import { NextRequest, NextResponse } from "next/server";
import { uploadToR2, isR2Configured } from "@/lib/r2/client";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique key
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const timestamp = Date.now();
    const key = `${folder}/${timestamp}-${sanitizedName}`;

    // Check if Cloudflare R2 credentials exist in environment
    if (isR2Configured()) {
      const result = await uploadToR2(buffer, key, file.type || "application/octet-stream");
      return NextResponse.json({
        success: true,
        source: "cloudflare-r2",
        file: result,
      });
    }

    // Fallback: Local uploads directory when R2 credentials aren't configured yet
    const uploadDir = path.join(process.cwd(), "public", folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFilePath = path.join(uploadDir, `${timestamp}-${sanitizedName}`);
    fs.writeFileSync(localFilePath, buffer);

    const publicUrl = `/${folder}/${timestamp}-${sanitizedName}`;

    return NextResponse.json({
      success: true,
      source: "local-simulation",
      warning:
        "Cloudflare R2 credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) not found in .env.local. File saved locally in public/ for development.",
      file: {
        key,
        url: publicUrl,
        size: buffer.length,
        contentType: file.type || "application/octet-stream",
        lastModified: new Date(),
      },
    });
  } catch (error: any) {
    console.error("R2 Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file to Cloudflare R2" },
      { status: 500 }
    );
  }
}
