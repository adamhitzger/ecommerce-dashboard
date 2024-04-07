"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname: string = usePathname();
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Image 
            className="h-6 w-6" 
            src="/assets/icons/icon.svg"
            alt="Icon"
            width={23}
            height={23}
            />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">{pathname}</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial ">
              <div className="relative">
              <Image src="/assets/icons/search.svg"
               width={23} 
               height={23} 
               alt="Search" 
               className="absolute left-2 top-2.5 h-5 w-5"/>
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                  placeholder="Search analytics..."
                  type="search"
                />
              </div>
            </form>
          </div>
        </header>
  )
}
