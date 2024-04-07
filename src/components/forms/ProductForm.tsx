//klientská komponenta
"use client";

import { Label } from "@/components/ui/label"
import { Product, Variant, Size, Category } from "@/types"
import React, {useRef, ChangeEvent} from "react"
import { useState } from 'react';
import createProduct, { updateProduct} from "@/lib/database/actions/productActions";
import { Button } from "@/components/ui/button";
import DeleteProductForm from "./delete/DeleteProductForm";
import { useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
//properties initialData jež je typu Product nebo null, varianty z tabulky variant atd...
interface FormProps {
    initialData: Product | null;
    variants:Variant[] | null;
    sizes: Size[] | null;
    categories: Category[] | null;
}

export default function ProductForm({initialData, variants, sizes, categories} : Readonly<FormProps>){
  const action = initialData ? 'Save changes' : 'Create';
  const pending = initialData ? "Saving changes..." : "Creating...";
  const [isPending, startTransition] = useTransition();
    //fce pro handlování inputů a jejich defaultních hodnot na základě url adresy
  const productForm = useRef<HTMLFormElement>(null); 
  const [form, setForm] = useState({
    id: initialData?.id,
    name: initialData?.name || "",
    price: initialData?.price || 0,
    quantity: initialData?.quantity || 0,
    description: initialData?.description || "",
    is_featured: initialData?.is_featured || false,
    sizeId: initialData?.sizeId || "",
    variantId: initialData?.variantId || "",
    categoryId: initialData?.categoryId || "",
  });
  //hadnle inputů a textarey
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  //handle selectů
  const handleChangeSelect = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
}
//handle checkboxů
const handleChangeCheckbox = () => {
  setForm({ ...form, is_featured: !form.is_featured });
}
  //U kce
  const handleUpdateProduct = (formData: FormData) => {
    startTransition(async () => {
      await updateProduct(formData)
    })
  }
//C fce 
  const handleCreateProduct = (formData: FormData) => {
    startTransition(async () => {
      await createProduct(formData)
    })
  }
    //formulář jehož akce závisí na initialData
    return (
      <div>
    <form action={initialData ? handleUpdateProduct : handleCreateProduct } className="grid gap-4 md:gap-8" ref={productForm}>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="name">
                Name
              </Label>
              <Input id="name" name="name" placeholder={"Enter product name"} defaultValue={form.name} type="text" disabled={isPending} onChange={handleChange} required/>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="price">
                Price
              </Label>
              <Input id="price" name="price" placeholder={"Enter product price"} defaultValue={form.price} type="number" disabled={isPending} onChange={handleChange} required/>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <Input id="quantity" name="quantity" placeholder={"Enter product quantity"} defaultValue={form.quantity} type="number" disabled={isPending} onChange={handleChange} required/>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="description">
                Description
              </Label>
              <Textarea id="description" name="description" placeholder={"Enter product description"} defaultValue={form.description} disabled={isPending} onChange={handleChange} required/>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="featured" name="featured" checked={form.is_featured} onCheckedChange={handleChangeCheckbox} disabled={isPending}/>
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                  Product will be featured
                  </label>
            </div>
          
            <div className="grid gap-2">
            <Label className="text-base" htmlFor="category">
                Category
              </Label>
            <Select name="category" defaultValue={String(form.categoryId)} disabled={isPending} onValueChange={(value) =>handleChangeSelect("categoryId", value)} required>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              <SelectContent>
              <SelectGroup>
              {categories && 
              categories.map(category => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
              </SelectGroup>
              </SelectContent>
            </Select>
            </div>

            <div className="grid gap-2">
            <Label className="text-base" htmlFor="size">
                Size
              </Label>
            <Select name="size" defaultValue={String(form.sizeId)} disabled={isPending} onValueChange={(value) =>handleChangeSelect("sizeId", value)} required>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a size" />
                </SelectTrigger>
              <SelectContent>
              <SelectGroup>
              {sizes && 
              sizes.map(size => (
                <SelectItem key={size.id} value={String(size.id)}>
                  {size.name}
                </SelectItem>
              ))}
              </SelectGroup>
              </SelectContent>
            </Select>
            </div>

            <div>
            <Label className="text-base" htmlFor="variant">
                Variant
              </Label>
            <Select name="variant" defaultValue={String(form.variantId)} disabled={isPending} onValueChange={(value) =>handleChangeSelect("variantId", value)} required>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
              <SelectContent>
              <SelectGroup>
              {variants && 
              variants.map(variant => (
                <SelectItem key={variant.id} value={String(variant.id)}>
                  {variant.name}
                </SelectItem>
              ))}
              </SelectGroup>
              </SelectContent>
            </Select>
            </div>
            {initialData && (
              <Input type="hidden" name="id" value={form.id}/>
            )}
            <Button variant="outline" size="sm" disabled={isPending}>{isPending ? pending : action}</Button>
          </form>
          {initialData && (
              <DeleteProductForm id={form.id}/>
          )}
          </div>
  )
}
