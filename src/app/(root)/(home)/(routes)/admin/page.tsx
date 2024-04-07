//hlavní homepage admin eshopu, kde bude shrnutí celého eshopu

import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';

async function AdminPage() {
//ověřování přihlášeného usera
const user = await getUser();
//pokud není lognutý user, redirectne se a login
  if(!user) redirect("/login");
  return (
    //zobrazení userova emailu
    <div>Hello {user?.email}</div>
  )
}

export default AdminPage;