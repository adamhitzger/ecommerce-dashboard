"use server";

import { getSupabaseAuth, protect } from "../auth"; 

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = getSupabaseAuth();

    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (!data.session) throw new Error("No session");

    return { errorMessage: null };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { errorMessage };
  }
};

export const signOutAction = async () => {
  try {
    await protect();

    const auth = getSupabaseAuth();

    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { errorMessage };
  }
};

export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = getSupabaseAuth();

    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    if (!data) throw new Error("No data");

    return { errorMessage: null };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { errorMessage };
  }
};

export const deleteAccountAction = async (userId: string) => {
  try {
    await protect();

    const { error: signOutError } = await getSupabaseAuth().signOut();
    if (signOutError) throw signOutError;

    const { error: deleteError } = await getSupabaseAuth(
      "deleteAccount"
    ).admin.deleteUser(userId);
    if (deleteError) throw deleteError;

    return { errorMessage: null };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { errorMessage };
  }
};