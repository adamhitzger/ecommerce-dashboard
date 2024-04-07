'use server';

import {supabase} from "@/lib/database/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData){
    const name = formData.get("name");
    if (!name) return;
    try{
        const { data, error} = await supabase.from("categories").insert({
        name: name,
        created_at: new Date().toISOString(),
        });  
    }catch(error){
        console.error(error);
    }    
        revalidatePath("/categories/addCategory"); 
        redirect(`/categories`);
}

export async function updateCategory(formData: FormData) {
    const id = formData.get("id");
    const name = formData.get("name");
    
    
    try{
        const { data, error} = await supabase.from("categories").update({
        name: name,
        updated_at: new Date().toISOString(),
        }).eq('id', id);  
    }catch(error){
        console.error(error);
    }    
        revalidatePath(`/categories/${id}`); 
        redirect(`/categories`);
}

export async function deleteCategory(formData: FormData){
    const id = formData.get("id");
    
    try {
        const {data, error} = await supabase.from("categories").delete().eq("id", id).single();
      } catch (error) {
        console.error(error);
      }
      revalidatePath(`/categories/${id}`); 
    redirect(`/categories`);
}