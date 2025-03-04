import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export function ConfirmButton({
  buttonTitle,
  title,
  description,
  confirmTitle,
  cancelTitle,
  onConfirm,
  disabled = false,
}: {
  buttonTitle: string;
  title: string;
  description: string;
  confirmTitle: string;
  cancelTitle: string;
  onConfirm: () => Promise<void> | void;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleActionClick = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="bg-pink-200 rounded hover:bg-pink-200/90"
          disabled={disabled}
        >
          {buttonTitle}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded">
            {cancelTitle}
          </AlertDialogCancel>
          <AlertDialogAction
            className={`bg-pink-200 rounded hover:bg-pink-200/90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleActionClick}
            disabled={loading}
          >
            {loading ? "กำลังดำเนินการ..." : confirmTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
