import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// only to be used in server components
export const getUser = async () => {
  const auth = getSupabaseAuth();
  const user = (await auth.getUser()).data.user;
  if (!user) return null;

  return user;
};

// used to protect server actions and route handlers
export const protect = async () => {
  const auth = getSupabaseAuth();
  const user = (await auth.getUser()).data.user;
  if (!user) throw new Error("Not authorized");
};

// cannot be used in client components
export const getSupabaseAuth = (deleteAccount: "" | "deleteAccount" = "") => {
  const cookieStore = cookies();

  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    deleteAccount === "deleteAccount"
      ? process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    }
  );
  return supabaseClient.auth;
};