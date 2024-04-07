"use client";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LeftSideBar() {
    const pathname = usePathname();
    return (
            <nav className="grid items-start px-4 text-sm font-medium">
                {sidebarLinks.map((item) => {
                    const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
                    return(
                        <Link
                        className= "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900  dark:hover:text-gray-50"
                        href={item.route}
                        key={item.route}
                        >
                        <Image src={item.imgURL} width={23} height={23} alt={item.label} />
                            <span className={`${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
  )
}
