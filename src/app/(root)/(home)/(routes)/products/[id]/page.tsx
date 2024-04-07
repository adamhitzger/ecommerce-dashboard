//dynamická stránka k vytváření, updatování a deletovaní produktů
import ProductForm from "@/components/forms/ProductForm";
import {supabase} from "@/lib/database/supabase"
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';
//parametr param, který z url získává id
export default async function Product({
  params
}: {
  params: {id: string};
}) {
  //ověření přihlášeného usera, poked ne - redirecnutí usera na login
  const user = await getUser();
  if(!user) redirect("/login");
  //volání dat z databází, product podle id, všechny dostupné velikosti-variaty-kategorie
  const productPromise = await supabase.from("products").select().filter('id', 'eq' , params.id).single();
  const sizesPromise = await supabase.from("sizes").select();
  const variantsPromise = await supabase.from("variants").select();
  const categoriesPromise = await supabase.from("categories").select();
  //Slib - slouží pro volání více async/await fcí 
  const [product, sizes, variants, categories] = await Promise.all([
    productPromise,
    sizesPromise,
    variantsPromise,
    categoriesPromise
  ]);
  //zobrazení produktového formuláře a předání parametrů, dále přihlášeního user
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <ProductForm initialData={product?.data} variants={variants?.data} sizes={sizes?.data} categories={categories?.data}/>
      <p>User logged in: {user?.email}</p>
    </div>
  )
}
