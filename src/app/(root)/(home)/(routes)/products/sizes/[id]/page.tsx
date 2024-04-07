//dynamická stránka k vytváření, updatování a deletovaní velikostí
import {supabase} from '@/lib/database/supabase'
import SizeForm from '@/components/forms/SizeForm'
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';
//parametr param, který z url získává id
export default async function Size({params}:{params : {id: string}}) {
  //ověření přihlášeného usera, poked ne - redirecnutí usera na login
  const user = await getUser();
  if(!user) redirect("/login");
  //volání dat z tabulky sizes a porovnání id
    const { data, error } = await supabase.from("sizes").select().filter('id','eq', params.id).single();
      //zobrazení formuláře pro velikosti a předání parametrů, dále přihlášeního user
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <SizeForm initialData={data}/>
        <p>User logged in: {user?.email}</p>
      </div>
  )
}
