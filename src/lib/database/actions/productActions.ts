'use server';

import {supabase} from "@/lib/database/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProduct(formData: FormData){
    
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const description = formData.get("description");
    const sizeId = Number(formData.get("size"));
    const categoryId = Number(formData.get("category"));
    const variantId = Number(formData.get("variant"));
    const is_featured = Boolean(formData.get("featured"));

    try{
        const { data, error} = await supabase.from("products").insert({
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        created_at: new Date().toISOString(),
        is_featured: is_featured,
        sizeId: sizeId,
        categoryId: categoryId,
        variantId:variantId,
        })  
    }catch(error){
        console.error(error);
    }    
        revalidatePath("/products/addProduct"); 
        revalidatePath("/products");
        redirect(`/products`);
}

export async function updateProduct(formData: FormData) {
    const id = formData.get("id");
    const name = formData.get("name");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const description = formData.get("description");
    const sizeId = Number(formData.get("size"));
    const categoryId = Number(formData.get("category"));
    const variantId = Number(formData.get("variant"));
    const is_featured = Boolean(formData.get("featured"));
    
    try{
        const { data, error} = await supabase.from("products").update({
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        is_featured: is_featured,
        updated_at: new Date().toISOString(),
        sizeId: sizeId,
        categoryId: categoryId,
        variantId:variantId,
        }).eq('id', id)
        .select();  
    }catch(error){
        console.error(error);
    }    
        revalidatePath(`/products/${id}`); 
        redirect(`/products`);
}

export async function deleteProduct(formData: FormData){
    const id = formData.get("id");
    
    try {
        const {data, error} = await supabase.from("products").delete().eq("id", id).single();
      } catch (error) {
        console.error(error);
      }
    revalidatePath(`/products/${id}`); 
    redirect(`/products`);
}