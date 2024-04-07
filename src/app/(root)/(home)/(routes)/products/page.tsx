import ProductHeader from '@/components/products/ProductHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { supabase } from '@/lib/database/supabase' 
import Image from 'next/image'
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown} from "lucide-react";
import { getUser } from '@/lib/database/auth';
import { redirect } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox'

export default async function Products() {
        //ověřování lognutého usera, redirect pokud není lognutého usera
  const user = await getUser();
  if(!user) redirect("/login");
        //read fce z tabulky produktů a joiny z tabulek sizes, categories, variants  
  const {data, error} = await supabase.from('products')
  .select(`
    id,
    name,
    price,
    quantity,
    description,
    is_featured,
    created_at,
    updated_at,
    sizes (id, value),
    variants (id, value),
    categories (id, name)
  `); 
  console.log(data);
  console.error(error);
          //pokud nejsou data, zobrazí se tento text
  if(data?.length === 0) return <> 
    <h2>No products found</h2>
    <Link href="/products/addProduct"><Button variant="outline" className='rounded-[10px]'>Add product</Button></Link>
    <p>User logged in: {user?.email}</p>
  </>
        //tabulka s dropdownem
  return (
    <>
    <ProductHeader/>
    <div className='flex flex-row justify-between overflow-auto'>
        <div className='flex items-center gap-x-2 p-2'>
            <h2 >Products</h2>
            <Badge variant="outline">1</Badge>
        </div>
        
        <Link href="/products/addProduct"><Button variant="outline" className='rounded-[10px]'>Add product</Button></Link>
        <p>User logged in: {user?.email}</p>
    </div>
    {data &&
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Is Featured</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                  {data.map((product: any) => (
                    <TableRow key={product.id}>
                        
                      <TableCell>
                        <Image
                          alt="Product Image"
                          height={80}
                          src="/assets/icons/product.svg"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                      </TableCell>
                      
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.price} Kč</TableCell>
                      <TableCell><div style={{ backgroundColor: `#${product.variants?.value}`}} className="rounded-full w-10 h-10" ></div></TableCell>
                      <TableCell>{product.sizes?.value}</TableCell>
                      <TableCell>{product.quantity} {product.quantity > 1 ? "kusů" : "kus"}</TableCell>
                      <TableCell><Checkbox checked={product.is_featured}/> </TableCell>
                      <TableCell>{product.categories?.name}</TableCell>
                      <TableCell>{product.created_at}</TableCell>
                      <TableCell>{product.updated_at}</TableCell>
                      <TableCell>
                      <DropdownMenu>
          <DropdownMenuTrigger>
          <ChevronDown/>
          <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/products/${product.id}`}>
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/${product.id}`}>
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/products/${product.id}`}>
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
