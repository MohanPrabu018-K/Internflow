// ─── File Storage Service ────────────────────────────────────────────────
// Supports: local filesystem and S3-compatible storage (AWS S3, MinIO, etc.)
import { writeFile, mkdir, unlink, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export interface StoredFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  bucket: string; // storage path or S3 bucket
  uploadedAt: string;
}

type StorageProvider = "local" | "s3";

function getProvider(): StorageProvider {
  return (process.env.STORAGE_PROVIDER as StorageProvider) || "local";
}

function getLocalPath(): string {
  return process.env.STORAGE_LOCAL_PATH || "./uploads";
}

// ─── Local Storage ───────────────────────────────────────────────────────

async function storeLocal(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  bucket: string = "general"
): Promise<StoredFile> {
  const basePath = path.resolve(getLocalPath(), bucket);
  if (!existsSync(basePath)) {
    await mkdir(basePath, { recursive: true });
  }

  const id = uuidv4();
  const ext = path.extname(originalName);
  const filename = `${id}${ext}`;
  const filePath = path.join(basePath, filename);

  await writeFile(filePath, buffer);

  return {
    id,
    filename,
    originalName,
    mimeType,
    size: buffer.length,
    url: `/api/files/${bucket}/${filename}`,
    bucket,
    uploadedAt: new Date().toISOString(),
  };
}

async function deleteLocal(filename: string, bucket: string = "general"): Promise<void> {
  const basePath = path.resolve(getLocalPath(), bucket);
  const filePath = path.join(basePath, filename);
  if (existsSync(filePath)) {
    await unlink(filePath);
  }
}

async function getLocalFile(filename: string, bucket: string = "general"): Promise<Buffer | null> {
  const basePath = path.resolve(getLocalPath(), bucket);
  const filePath = path.join(basePath, filename);
  if (!existsSync(filePath)) return null;
  return readFile(filePath);
}

// ─── S3 Storage (placeholder) ─────────────────────────────────────────────

async function storeS3(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  bucket: string = "general"
): Promise<StoredFile> {
  // In production: use @aws-sdk/client-s3
  // const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
  // const client = new S3Client({ region: process.env.AWS_REGION });
  // ...
  throw new Error(
    "S3 storage requires @aws-sdk/client-s3. Install: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner"
  );
}

// ─── Public API ──────────────────────────────────────────────────────────

export const StorageService = {
  async upload(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    bucket: string = "general"
  ): Promise<StoredFile> {
    const provider = getProvider();

    if (provider === "s3") {
      return storeS3(buffer, originalName, mimeType, bucket);
    }

    return storeLocal(buffer, originalName, mimeType, bucket);
  },

  async uploadFromFormData(
    formData: FormData,
    fieldName: string = "file",
    bucket: string = "general"
  ): Promise<StoredFile> {
    const file = formData.get(fieldName) as File | null;
    if (!file) throw new Error("No file provided");

    const buffer = Buffer.from(await file.arrayBuffer());
    return this.upload(buffer, file.name, file.type, bucket);
  },

  async delete(filename: string, bucket: string = "general"): Promise<void> {
    const provider = getProvider();
    if (provider === "local") {
      return deleteLocal(filename, bucket);
    }
    // S3 delete placeholder
  },

  async getFile(filename: string, bucket: string = "general"): Promise<Buffer | null> {
    const provider = getProvider();
    if (provider === "local") {
      return getLocalFile(filename, bucket);
    }
    return null;
  },

  /**
   * Validates file type and size before upload.
   */
  validateFile(
    file: { type: string; size: number },
    options?: {
      maxSizeMB?: number;
      allowedTypes?: string[];
    }
  ): { valid: boolean; error?: string } {
    const maxSizeMB = options?.maxSizeMB ?? 10;
    const allowedTypes = options?.allowedTypes ?? [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "video/mp4",
    ];

    if (file.size > maxSizeMB * 1024 * 1024) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type "${file.type}" is not allowed`,
      };
    }

    return { valid: true };
  },
};
