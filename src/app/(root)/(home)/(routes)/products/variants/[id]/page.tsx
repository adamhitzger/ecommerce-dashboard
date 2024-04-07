//dynamická stránka k vytváření, updatování a deletovaní variant
import {supabase} from '@/lib/database/supabase'
import VariantForm from '@/components/forms/VariantForm';
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';
//parametr param, který z url získává id
export default async function Variant({params}:{params : {id: string}}) {
    //ověření přihlášeného usera, poked ne - redirecnutí usera na login  
  const user = await getUser();
    if(!user) redirect("/login");
      //volání dat z tabulky variant a porovnání id
    const { data, error } = await supabase.from("variants").select().filter('id','eq', params.id).single();
          //zobrazení formuláře pro variant a předání parametrů, dále přihlášeního usera
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <VariantForm initialData={data}/>
        <p>User logged in: {user?.email}</p>
      </div>
  )
}
