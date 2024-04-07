import SignOutButton from '@/components/shared/SignOutButton';
import { getUser } from '@/lib/database/auth'
import { redirect } from 'next/navigation';

export default async function Settings() {
    const user = await getUser();
    if(!user) redirect("/login");
  return (
    <div>
        <p>User logged in: {user?.email}</p>
        <SignOutButton/>
    </div>
  )
}