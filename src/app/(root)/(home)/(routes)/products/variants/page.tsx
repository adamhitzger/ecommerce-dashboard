import React from 'react';
import ProductHeader from '@/components/products/ProductHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import {supabase} from '@/lib/database/supabase';
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown} from "lucide-react"
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';

export default async function Variants() {
      //ověřování lognutého usera, redirect pokud není lognutého usera
  const user = await getUser();
  if(!user) redirect("/login");
      //read fce z tabulky variant  
  const {data, error} = await supabase.from("variants").select("*");
    console.log(data);
        //pokud nejsou data, zobrazí se tento text
    if(data?.length === 0) return <> 
    <h2>No variants found</h2>
    <Link href="/products/variants/addVariant"><Button variant="outline" className='rounded-[10px]'>Add Variant</Button></Link>
    <p>User logged in: {user?.email}</p>
  </>
      //tabulka s dropdownem
  return (
    <>
    <ProductHeader/>
    <div className='flex flex-row justify-between'>
            <div className='flex items-center gap-x-2 p-2'>
            <h2 >Variants</h2>
            <Badge variant="outline">1</Badge>
            </div>
        
            <Link href="/products/variants/addVariant"><Button variant="outline" className='rounded-[10px]'>Add variant</Button></Link>
            <p>User logged in: {user?.email}</p>
            </div>  
        {data &&
      <Table className='rounded-[25px]'>
  <TableHeader>
  <TableRow>
    <TableHead>Variant Name</TableHead>
    <TableHead>Value</TableHead>
    <TableHead>Created At</TableHead>
    <TableHead>Updated At</TableHead>
    <TableHead>Actions</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
    
    {data.map((variant) => (
<TableRow key={variant.id}>
    
    <TableCell>{variant.name}</TableCell>
    
    <TableCell className='items-center'><div style={{ backgroundColor: `#${variant.value}`}} className="rounded-full w-10 h-10" ></div></TableCell>
    <TableCell>{variant.created_at}</TableCell>
    <TableCell>{variant.updated_at}</TableCell>
    <TableCell>
      <DropdownMenu>
          <DropdownMenuTrigger>
          <ChevronDown/>
          <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/products/variants/${variant.id}`}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/variants/${variant.id}`}>
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/variants/${variant.id}`}>
             <span className='text-red-500'>Delete</span>
            </Link>
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>  
    </TableCell>
  </TableRow>
    ))
    }
</TableBody>
</Table>  
}
    </>
  )
}
