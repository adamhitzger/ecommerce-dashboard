"use client";

import { loginAction } from "@/lib/database/actions/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

function LoginPage() {
  //funkce k přístupu objectu router
  const router = useRouter();
  //funkce k updatovaní statu bez blokování UI
  const [isPending, startTransition] = useTransition();
  //login funkce která se volá po Submitování formu, volá akci, které předává objekt formdata
  const handleClickLoginButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Logged in");
        router.push("/");
      }
    });
  };

  return (
    //formulář, podobně jako v php se volá akce. Z name atributů se hodnoty uloží do objektu Formdata 
    <div className="flex mt-20 justify-between">
      <form
        className="flex flex-col bg-emerald-700 w-96 p-8 rounded-lg gap-y-4"
        action={handleClickLoginButton}
      >
        <h1 className="text-4xl text-center mb-8">Login</h1>

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
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/create-account" className="underline text-white">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;