import { useState } from "react";

export function useMedicalRecordDrawer() {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  function openDrawer(recordId: string) {
    setSelectedRecordId(recordId);
    setIsOpen(true);
  }

  function closeDrawer() {
    setSelectedRecordId(null);
    setIsOpen(false);
  }

  return {
    selectedRecordId,
    isOpen,
    openDrawer,
    closeDrawer,
  };
}