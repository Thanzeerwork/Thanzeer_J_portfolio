import { NextRequest, NextResponse } from "next/server";
import { listR2Objects, isR2Configured, getR2Config } from "@/lib/r2/client";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const prefix = searchParams.get("prefix") || "";

    if (isR2Configured()) {
      const { objects, isConfigured } = await listR2Objects(prefix);
      return NextResponse.json({
        success: true,
        source: "cloudflare-r2",
        isConfigured,
        config: {
          bucketName: getR2Config().bucketName,
          publicDomain: getR2Config().publicDomain,
        },
        objects,
      });
    }

    // Fallback: list files in public/uploads if any exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const objects: Array<{ key: string; size: number; lastModified?: Date; url: string }> = [];

    if (fs.existsSync(uploadDir)) {
      const files = fs.readdirSync(uploadDir);
      for (const file of files) {
        const full = path.join(uploadDir, file);
        const stat = fs.statSync(full);
        objects.push({
          key: `uploads/${file}`,
          size: stat.size,
          lastModified: stat.mtime,
          url: `/uploads/${file}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "local-simulation",
      isConfigured: false,
      warning: "Cloudflare R2 credentials not configured. Displaying local upload directory assets.",
      objects,
    });
  } catch (error: any) {
    console.error("R2 List error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list Cloudflare R2 objects" },
      { status: 500 }
    );
  }
}
