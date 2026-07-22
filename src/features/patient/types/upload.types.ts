/**
 * ============================================================
 * Upload Types
 * ============================================================
 */

import type {
  DocumentType,
  FileInformation,
} from "./medical-record.types";

/* ============================================================
 * VALIDATION
 * ============================================================
 */

export interface UploadValidation {
  maxFileSize: number;

  allowedFileTypes: string[];

  allowedExtensions: string[];

  multiple: boolean;
}

/* ============================================================
 * DROPZONE
 * ============================================================
 */

export interface DropzoneState {
  isDragging: boolean;

  isUploading: boolean;

  validation: UploadValidation;
}

/* ============================================================
 * FORM
 * ============================================================
 */

export interface UploadFormData {
  title: string;

  description: string;

  documentType: DocumentType;

  hospitalName?: string;

  doctorName?: string;

  department?: string;

  visitDate?: Date;

  notes?: string;

  tags: string[];
}

/* ============================================================
 * REQUEST
 * ============================================================
 */

export interface UploadRequest {
  file: File;

  metadata: UploadFormData;
}

/* ============================================================
 * PROGRESS
 * ============================================================
 */

export interface UploadProgress {
  uploadedBytes: number;

  totalBytes: number;

  percentage: number;

  speed?: number;

  remainingTime?: number;

  status:
    | "idle"
    | "uploading"
    | "processing"
    | "completed"
    | "failed";
}

/* ============================================================
 * RESPONSE
 * ============================================================
 */

export interface UploadResponse {
  success: boolean;

  message: string;

  recordId: string;

  file: FileInformation;
}

/* ============================================================
 * PREVIEW
 * ============================================================
 */

export interface UploadPreview {
  file: File;

  previewUrl?: string;

  fileSize: number;

  fileType: string;
}

/* ============================================================
 * SUCCESS
 * ============================================================
 */

export interface UploadSuccess {
  success: boolean;

  title: string;

  message: string;

  uploadedAt: Date;
}
