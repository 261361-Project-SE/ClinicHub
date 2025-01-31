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
}: {
  buttonTitle: string;
  title: string;
  description: string;
  confirmTitle: string;
  cancelTitle: string;
  onConfirm: () => Promise<void> | void;
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
