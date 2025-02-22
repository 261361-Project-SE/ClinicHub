"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error?: string;
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-xl font-medium">
        เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง
      </h2>
      <span className="text-sm text-gray-500"> ERROR: {error}</span>
      <Button
        className="font-medium text-white bg-pink-200 hover:bg-pink-200/90"
        onClick={() => window.location.reload()}
      >
        ลองใหม่อีกครั้ง
      </Button>
    </div>
  );
}
