"use client";

import { deleteAccountAction } from "@/lib/database/actions/users";
import { useTransition } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type Props = {
  userId: string;
};

function DeleteAccountButton({ userId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClickDeleteAccountButton = async () => {
    startTransition(async () => {
      const { errorMessage } = await deleteAccountAction(userId);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Account deleted");
      }
    });
  };

  return (
    <Button
      onClick={handleClickDeleteAccountButton}
      variant="outline"
      size="default"
    >
      {isPending ? "Deleting Account..." : "Delete Account"}
    </Button>
  );
}

export default DeleteAccountButton;