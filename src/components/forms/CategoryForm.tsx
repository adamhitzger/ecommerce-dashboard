//klientská komponenta
"use client";

import { Category } from '@/types';
import { Label } from "@/components/ui/label";
import { Input } from '../ui/input';
import { useState } from 'react';
import {createCategory,  updateCategory } from '@/lib/database/actions/categoryActions';
import DeleteCategoryForm from './delete/DeleteCategoryForm';
import { useTransition } from 'react';
import { Button } from '../ui/button';
//property initialData jež je typu Category nebo null 
interface FormProps{
    initialData: Category | null;
}

export default function CategoryForm({initialData}: Readonly<FormProps>) {
  const action = initialData ? 'Save changes' : 'Create';
  const pending = initialData ? "Saving changes..." : "Creating...";
  const [isPending, startTransition] = useTransition();
  //fce pro handlování inputů a jejich defaultních hodnot na základě url adresy
  const [form, setForm] = useState({
    id: initialData?.id,
    name:  initialData?.name || '',
  });
    //hadnle inputů a textarey
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
  //U kce
  const handleUpdateCategory = (formData: FormData) => {
    startTransition(async () => {
      await updateCategory(formData)
    })
  }
//C fce 
  const handleCreateCategory = (formData: FormData) => {
    startTransition(async () => {
      await createCategory(formData)
    })
  }
  //formulář jehož akce závisí na initialData
  return (
        <div>
          <form className="grid gap-4 md:gap-8" action={initialData ? handleUpdateCategory : handleCreateCategory} >
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="name">
                Name
              </Label>
              <Input id="name" name="name" placeholder={"Enter category name"} type="text" defaultValue={form.name} disabled={isPending} onChange={handleChange}/>
            </div>
            {initialData && (
              <Input type="hidden" name="id" value={form.id}/>
            )}
            <Button variant="outline" size="sm" disabled={isPending}>{isPending ? pending : action}</Button>
          </form>
          {initialData && (
              <DeleteCategoryForm id={form.id}/>
          )}
      </div>
  )
}
