'use server';

import {supabase} from "@/lib/database/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSize(formData: FormData){
    const name = formData.get("name");
    const value = formData.get("value");
    if (!name) return;
    if (!value) return;
    
        const { data, error} = await supabase.from("sizes").insert({
        name: name,
        value: value,
        created_at: new Date().toISOString(),
        });  
        
        revalidatePath("/products/sizes/addSize"); 
        redirect(`/products/sizes`);
        console.log(data);
        console.log(error);
}

export async function updateSize(formData: FormData){
    const id = formData.get("id");
    const name = formData.get("name");
    const value = formData.get("value");

    try{
        const { data, error } = await supabase.from("sizes").update({
            name: name,
            value: value,
            updated_at: new Date().toISOString(),
        }).eq("id", id);
    }catch(error){
        console.error(error);
    }
    revalidatePath(`/products/sizes/${id}`); 
    redirect(`/products/sizes`);
}

export async function deleteSize(formData: FormData){
    const id = formData.get("id");
    
    try{
        const {data, error} = await supabase.from("sizes").delete().eq("id", id).single();
    }catch(error){
        console.error(error);
    }
    revalidatePath(`/products/sizes/${id}`);
    redirect(`/products/sizes`);
}