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

export function ConfirmButton({
  buttonTitle,
  title,
  description,
  confirmTitle,
  cancelTitle,
  handleConfirm,
}: {
  buttonTitle: string;
  title: string;
  description: string;
  confirmTitle: string;
  cancelTitle: string;
  handleConfirm: () => void;
}) {
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
            className="bg-pink-200 rounded hover:bg-pink-200/90"
            onClick={() => {
              handleConfirm();
            }}
          >
            {confirmTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
