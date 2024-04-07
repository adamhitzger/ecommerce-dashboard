import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {supabase} from '@/lib/database/supabase'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown} from "lucide-react"
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';

export default async function Categories() {
  //ověřování lognutého usera, redirect pokud není lognutý
  const user = await getUser();
  if(!user) redirect("/login");
  //read fce z tabulky kategorie
  const {data, error} = await supabase.from("categories").select();
  console.log(error);
  //pokud nejsou kategorie, zobrazí se tento text
  if(data?.length === 0) return <> 
    <h2>No categories found</h2>
    <Link href="/categories/addCategory"><Button variant="outline" className='rounded-[10px]'>Add category</Button></Link>
    <p>User logged in: {user?.email}</p>
  </>
  //tabulka s dropdownem
  return (
    <>
    <div className='flex flex-row justify-between'>
        <div className='flex items-center gap-x-2 p-2'>
            <h2 >Categories</h2>
            <Badge variant="outline">1</Badge>
        </div>
        
        <Link href="/categories/addCategory"><Button variant="outline" className='rounded-[10px]'>Add category</Button></Link>
        <p>User logged in: {user?.email}</p>
    </div>
    {data &&   
<Table className=' border shadow-sm rounded-[15px] p-2'>
<TableHeader>
  <TableRow>
    <TableHead>Category name</TableHead>
    <TableHead>Created At</TableHead>
    <TableHead>Updated At</TableHead>
    <TableHead>Actions</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  
  {data.map((category) => (
    <TableRow key={category.id}>
      
    <TableCell>{category.name}</TableCell>
      <TableCell>{category.created_at}</TableCell>
    <TableCell>{category.updated_at}</TableCell>
    <TableCell>
    <DropdownMenu>
          <DropdownMenuTrigger>
          <ChevronDown/>
          <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/categories/${category.id}`}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/categories/${category.id}`}>
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/categories/${category.id}`}>
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
