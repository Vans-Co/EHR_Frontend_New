import { useState } from "react";

import type { UploadFormData } from "../types";

export function useUploadMedicalRecord() {
  const [isOpen, setIsOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  async function upload(_data: UploadFormData) {
    try {
      setIsUploading(true);

      setProgress(0);

      for (let i = 0; i <= 100; i += 20) {
        await new Promise((resolve) =>
          setTimeout(resolve, 200)
        );

        setProgress(i);
      }

      // TODO:
      // return await medicalRecordsService.uploadMedicalRecord(data);

      return true;
    } finally {
      setIsUploading(false);
    }
  }

  function openUploadDrawer() {
    setIsOpen(true);
  }

  function closeUploadDrawer() {
    setIsOpen(false);

    setProgress(0);
  }

  return {
    isOpen,
    isUploading,
    progress,
    openUploadDrawer,
    closeUploadDrawer,
    upload,
  };
}