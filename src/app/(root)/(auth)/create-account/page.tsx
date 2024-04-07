"use client";

import { createAccountAction } from "@/lib/database/actions/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

function CreateAccountPage() {
  //funkce k přístupu objectu router
  const router = useRouter();
  //funkce k updatovaní statu bez blokování UI
  const [isPending, startTransition] = useTransition();
  //create funkce která se volá po Submitování formu, volá akci, které předává objekt formdata
  const handleClickCreateAccountButton = (formData: FormData) => {
    //uložení dat - pošle se ověřovací email, uživatel se přesune na login 
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Verification email sent");
        router.push("/login");
      }
    });
  };

  return (
    //formulář, podobně jako v php se volá akce. Z name atributů se hodnoty uloží do objektu Formdata 
    <div className="flex mt-20 justify-center">
      <form
        className="flex flex-col bg-emerald-700 w-96 p-8 rounded-lg gap-y-4"
        action={handleClickCreateAccountButton}
      >
        <h1 className="text-4xl text-center mb-8">Create Account</h1>

        <input
          type="text"
          name="email"
          className="rounded-lg p-2 text-black"
          placeholder="Email"
          disabled={isPending}
        />
        <input
          type="password"
          name="password"
          className="rounded-lg p-2 text-black"
          placeholder="Password"
          minLength={6}
          disabled={isPending}
        />

        <button
          className="bg-black rounded-lg p-2 mt-4 mb-2 text-white"
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default CreateAccountPage;