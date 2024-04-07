//dynamická stránka k vytváření, updatování a deletovaní kategorie
import {supabase} from '@/lib/database/supabase'
import CategoryForm from '@/components/forms/CategoryForm'
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';
//parametr param, který z url získává id
export default async function Page({params}:{params : {id: string}}) {
  //ověření přihlášeného usera, poked ne - redirecnutí usera na login
  const user = await getUser();
  if(!user) redirect("/login");
  //volání dat z databáze s where id se rovná id stánce
    const { data, error } = await supabase.from("categories").select().filter('id','eq', params.id).single();
    //formulář pro CUD fce a předává data na základě url, zobrazení lognutého usera
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <CategoryForm initialData={data}/>
        <p>User logged in: {user?.email}</p>
      </div>
  )
}
