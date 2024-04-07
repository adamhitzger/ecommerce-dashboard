//klientská komponenta
"use client";

import { Size } from '@/types';
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import {createSize, updateSize} from '@/lib/database/actions/sizeActions';
import DeleteSizeForm from './delete/DeleteSizeForm';
import { useTransition } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
//properties initialData jež je typu velikostí z tabulky sizes
interface FormProps{
    initialData: Size | null;
}

export default function SizeForm({initialData}: Readonly<FormProps>) {
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
  const handleUpdateSize = (formData: FormData) => {
    startTransition(async () => {
      await updateSize(formData)
    })
  }
//C fce 
  const handleCreateSize = (formData: FormData) => {
    startTransition(async () => {
      await createSize(formData)
    })
  }
      //formulář jehož akce závisí na initialData
  return (
    
    <div>
            <form className="grid gap-4 md:gap-8"  action={initialData ? handleUpdateSize : handleCreateSize}>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="name">
                Name
              </Label>
              <Input id="name" name='name' placeholder={"Enter size name"} type="text" defaultValue={form.name} disabled={isPending} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="value">
                Value
              </Label>
              <Input id="value" name='value' placeholder={"Enter size value"} type="text" defaultValue={form.value} disabled={isPending} onChange={handleChange}/>
            </div>
            {initialData && (
              <Input type="hidden" name="id" value={form.id}/>
            )}
            <Button variant="outline" size="sm" disabled={isPending}>{isPending ? pending : action}</Button>
          </form>
          {initialData && (
              <DeleteSizeForm id={form.id}/>
          )}
          </div>
         
  )
}

