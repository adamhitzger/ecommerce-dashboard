import Link from "next/link";
import Image from "next/image";
import LeftSideBar from "@/components/shared/navbar/LeftSideBar";
import Header from "@/components/shared/navbar/Header";
//layout page stejná pro všechny podstránky a zakázaní cachevání dat
export const dynamic = "force-dynamic"
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  
  return (
    <div className="grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Image src="/assets/icons/icon.svg" width={23} height={23} alt="Dashboard" />
              <span className="">Acme Inc</span>
            </Link>
          </div>
          <div className="flex-1">
            <LeftSideBar/>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Header/>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6"> 
            {children}
        </main>
      </div>
    </div>
  )
}
  
