'use server';

import {supabase} from "@/lib/database/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVariant(formData: FormData){
    
    const name = formData.get("name");
    const value = formData.get("value");
    if (!name) return;
    if (!value) return;
    try{
        const { data, error} = await supabase.from("variants").insert({
        name: name,
        value: value,
        created_at: new Date().toISOString(),
        });  
    }catch(error){
        console.error(error);
    }    
        revalidatePath("/products/variants/addVariant"); 
        redirect(`/products/variants`);
}

export async function updateVariant(formData: FormData){
    const id = formData.get("id");
    const name = formData.get("name");
    const value = formData.get("value");

    try{
        const { data, error } = await supabase.from("variants").update({
            name: name,
            value: value,
            updated_at: new Date().toISOString(),
        }).eq("id", id);
    }catch(error){
        console.error(error);
    }
    revalidatePath(`/products/variants/${id}`); 
    redirect(`/products/variants`);
}

export async function deleteVariant(formData: FormData){
    const id = formData.get("id");
    
    try{
        const {data, error} = await supabase.from("variants").delete().eq("id", id).single();
    }catch(error){
        console.error(error);
    }
    revalidatePath(`/products/variants/${id}`); 
    redirect(`/products/variants`);
}