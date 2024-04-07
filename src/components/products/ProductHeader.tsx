"use client";

import React from 'react'
import { productLinks } from '@/constants'
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function ProductHeader() {
    const pathname = usePathname()

  return (
    <nav className='flex flex-row justify-center w-full'>
      {productLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
        return(
        <Link
        className= "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900  dark:hover:text-gray-50"
        href={item.route}
        key={item.route}
        >
            <span className={`${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{item.label}</span>
        </Link>)
        
    })}
    </nav>
  )
}
