"use client";

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
import {Trash} from "lucide-react";
import {buttonVariants} from "./ui/button";
import {deleteReview} from "@/actions/reviews";
import {toast} from "./ui/use-toast";

export default function DeleteReview({id, productId}: {id: string; productId: string}) {
  const handleDelete = async () => {
    const {title, variant} = JSON.parse(await deleteReview(id, productId));
    toast({
      title,
      variant,
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-400 transition-all duration-300 hover:text-destructive">
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you wish to delete your review?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({variant: "destructive"})} onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
