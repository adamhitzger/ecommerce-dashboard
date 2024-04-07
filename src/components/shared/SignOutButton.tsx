"use client";

import { signOutAction } from "@/lib/database/actions/users";
import { useTransition } from "react";
import { Button } from "../ui/button";

function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = async () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  return (
    <Button
      onClick={handleClickSignOutButton}
      variant="outline"
      size="default"
    >
      {isPending ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}

export default SignOutButton;