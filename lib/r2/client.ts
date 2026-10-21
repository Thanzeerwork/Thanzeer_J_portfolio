import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export interface R2Config {
  accountId?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  bucketName?: string;
  publicDomain?: string;
}

export function getR2Config(): R2Config {
  return {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME || "portfolio-assets",
    publicDomain: process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || process.env.R2_PUBLIC_DOMAIN || "",
  };
}

export function isR2Configured(): boolean {
  const cfg = getR2Config();
  return Boolean(cfg.accountId && cfg.accessKeyId && cfg.secretAccessKey && cfg.bucketName);
}

let r2ClientInstance: S3Client | null = null;

export function getR2Client(): S3Client {
  if (r2ClientInstance) return r2ClientInstance;

  const cfg = getR2Config();
  if (!isR2Configured()) {
    throw new Error(
      "Cloudflare R2 is not fully configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME in your .env.local file."
    );
  }

  r2ClientInstance = new S3Client({
    region: "auto",
    endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: cfg.accessKeyId || "",
      secretAccessKey: cfg.secretAccessKey || "",
    },
  });

  return r2ClientInstance;
}

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  contentType: string;
  lastModified?: Date;
}

export async function uploadToR2(
  fileBuffer: Buffer | Uint8Array,
  key: string,
  contentType: string
): Promise<UploadResult> {
  const client = getR2Client();
  const cfg = getR2Config();

  const command = new PutObjectCommand({
    Bucket: cfg.bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await client.send(command);

  let publicUrl = "";
  if (cfg.publicDomain) {
    const domain = cfg.publicDomain.replace(/\/+$/, "");
    publicUrl = `${domain}/${key}`;
  } else {
    publicUrl = `/api/admin/r2/file?key=${encodeURIComponent(key)}`;
  }

  return {
    key,
    url: publicUrl,
    size: fileBuffer.length,
    contentType,
    lastModified: new Date(),
  };
}

export async function listR2Objects(prefix = ""): Promise<{
  objects: Array<{
    key: string;
    size: number;
    lastModified?: Date;
    url: string;
  }>;
  isConfigured: boolean;
}> {
  if (!isR2Configured()) {
    return { objects: [], isConfigured: false };
  }

  const client = getR2Client();
  const cfg = getR2Config();

  const command = new ListObjectsV2Command({
    Bucket: cfg.bucketName,
    Prefix: prefix,
    MaxKeys: 100,
  });

  const response = await client.send(command);

  const objects = (response.Contents || []).map((item) => {
    const key = item.Key || "";
    let url = "";
    if (cfg.publicDomain) {
      const domain = cfg.publicDomain.replace(/\/+$/, "");
      url = `${domain}/${key}`;
    } else {
      url = `/api/admin/r2/file?key=${encodeURIComponent(key)}`;
    }

    return {
      key,
      size: item.Size || 0,
      lastModified: item.LastModified,
      url,
    };
  });

  return { objects, isConfigured: true };
}

export async function deleteFromR2(key: string): Promise<boolean> {
  const client = getR2Client();
  const cfg = getR2Config();

  const command = new DeleteObjectCommand({
    Bucket: cfg.bucketName,
    Key: key,
  });

  await client.send(command);
  return true;
}
