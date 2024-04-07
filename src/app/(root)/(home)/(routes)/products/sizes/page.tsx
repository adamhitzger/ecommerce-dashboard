import ProductHeader from '@/components/products/ProductHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {supabase} from '@/lib/database/supabase'
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown} from "lucide-react"
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';

export default async function Sizes() {
    //ověřování lognutého usera, redirect pokud není lognutý
  const user = await getUser();
  if(!user) redirect("/login");
    //read fce z tabulky velikostí
  const {data, error} = await supabase.from("sizes").select("*"); 
    //pokud nejsou data, zobrazí se tento text
  if(data?.length === 0) return <> 
    <h2>No sizes found</h2>
    <Link href="/products/sizes/addSize"><Button variant="outline" className='rounded-[10px]'>Add Size</Button></Link>
    <p>User logged in: {user?.email}</p>
  </>
    //tabulka s dropdownem
  return (
    <>
    <ProductHeader/>
      <div className='flex flex-row justify-between'>
        <div className='flex items-center gap-x-2 p-2'>
            <h2 >Sizes</h2>
            <Badge variant="outline">1</Badge>
        </div>
        
        <Link href="/products/sizes/addSize"><Button variant="outline" className='rounded-[10px]'>Add size</Button></Link>
        <p>User logged in: {user?.email}</p>
    </div>
      {data &&
<Table className='rounded-[25px]'>
<TableHeader>
  <TableRow>
    <TableHead>Size Name</TableHead>
    <TableHead>Value</TableHead>
    <TableHead>Created At</TableHead>
    <TableHead>Updated At</TableHead>
    <TableHead>Actions</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
 
{data.map((size) => (
  <TableRow key={size.id}>
    <TableCell>{size.name}</TableCell>
    <TableCell>{size.value}</TableCell>
    <TableCell>{size.created_at}</TableCell>
    <TableCell>{size.updated_at}</TableCell>
    <TableCell>
    <DropdownMenu>
          <DropdownMenuTrigger>
          <ChevronDown/>
          <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/products/sizes/${size.id}`}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/sizes/${size.id}`}>
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/sizes/${size.id}`}>
             <span className='text-red-500'>Delete</span>
            </Link>
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>  
      </TableCell>
  </TableRow>  
))}
</TableBody>
</Table>
}
    </>
  )
}
