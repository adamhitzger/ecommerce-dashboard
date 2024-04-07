//klientská komponenta
"use client";

import { Variant } from '@/types';
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import {createVariant, updateVariant} from '@/lib/database/actions/variantActions';
import DeleteVariantForm from './delete/DeleteVarinatForm';
import { useTransition } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
//properties initialData jež je typu velikostí z tabulky sizes
interface FormProps{
    initialData: Variant | null;
}

export default function VariantForm({initialData}: Readonly<FormProps>) {
  const action = initialData ? 'Save changes' : 'Create';
  const pending = initialData ? "Saving changes..." : "Creating...";
  const [isPending, startTransition] = useTransition();
  //fce pro handlování inputů a jejich defaultních hodnot na základě url adresy
  const [form, setForm] = useState({
    id: initialData?.id,
    name:  initialData?.name || '',
    value: initialData?.value || '',
  });
      //hadnle inputů a textarey
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }
    //U kce
  const handleUpdateVariant = (formData: FormData) => {
    startTransition(async () => {
      await updateVariant(formData)
    })
  }
  //C fce 
  const handleCreateVariant = (formData: FormData) => {
    startTransition(async () => {
      await createVariant(formData)
    })
  }
  return (
    <div>
            <form className="grid gap-4 md:gap-8" action={initialData ? handleUpdateVariant: handleCreateVariant} >
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="name">
                Name
              </Label>
              <Input id="name" name="name" placeholder={"Enter variant name"} type="text" defaultValue={form.name} disabled={isPending} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="value">
                Value
              </Label>
              <Input id="value" name="value" placeholder={"Enter variant value"} type="text" defaultValue={form.value} disabled={isPending} onChange={handleChange}/>
            </div>
            <Button variant="outline" size="sm" disabled={isPending}>{isPending ? pending : action}</Button>
            {initialData && (
              <Input type="hidden" name="id" value={form.id}/>
            )}
          </form>
          
            {initialData && (
              <DeleteVariantForm id={form.id}/>
            )}
          </div>
  )
}

