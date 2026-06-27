"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, Trophy, Activity, Settings } from "lucide-react"

export default function AthleteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: "MyPage", href: "/athlete/mypage", icon: Home },
    { name: "Schedules", href: "/athlete/schedules", icon: CalendarDays },
    { name: "Prestasi", href: "/athlete/prestasi", icon: Trophy },
    { name: "Training", href: "/athlete/training", icon: Activity },
    { name: "Setting", href: "/athlete/setting", icon: Settings },
  ]

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-slate-50 relative overflow-hidden">
      
      {/* KONTEN HALAMAN */}
      <main className="flex-1 overflow-y-auto pb-16 w-full">
        {children}
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="absolute bottom-0 w-full flex h-16 items-center justify-between px-2 border-t bg-white pb-safe z-40 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href)
          const Icon = item.icon
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex flex-col items-center justify-center w-[20%] gap-1 transition-colors ${
                isActive ? "text-blue-600" : "text-slate-400 hover:text-blue-500"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-blue-50" : ""}`} />
              <span className="text-[9px] font-semibold">{item.name}</span>
            </Link>
          )
        })}
      </nav>

    </div>
  )
}
