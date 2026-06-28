// app/(dashboard)/athlete/layout.tsx
"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Trophy, CheckSquare, Ruler } from "lucide-react"

export default function AthleteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // 5 PILAR MENU ATLET
  const navItems = [
    { name: "MyPage", href: "/athlete/mypage", icon: Home },
    { name: "Training", href: "/athlete/training", icon: Activity },
    { name: "Prestasi", href: "/athlete/prestasi", icon: Trophy },
    { name: "Daily", href: "/athlete/daily", icon: CheckSquare },
    { name: "Fisik", href: "/athlete/fisik", icon: Ruler },
  ]

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[#fff5f5] dark:bg-background text-slate-900 dark:text-foreground font-sans relative overflow-hidden z-0">

      {/* GLOBAL FIXED BACKGROUND GRADIENT */}
      {/* Light Mode: Semburat merah muda halus | Dark Mode: Gradien Maroon */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-rose-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#602727] dark:via-[#331c1c] dark:to-transparent -z-10 pointer-events-none"></div>

      {/* KONTEN HALAMAN */}
      <main className="flex-1 overflow-y-auto pb-16 w-full">
        {children}
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="absolute bottom-0 w-full flex h-16 items-center justify-between px-1 border-t border-slate-200 dark:border-border bg-white dark:bg-card pb-safe z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              // Lebar w-[20%] agar 5 menu sejajar rata
              className={`flex flex-col items-center justify-center w-[20%] gap-1 transition-colors ${isActive ? "text-[#ff4b4b]" : "text-slate-400 dark:text-muted-foreground hover:text-slate-600 dark:hover:text-foreground"
                }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-rose-50 dark:bg-[#ff4b4b]/10" : ""}`}>
                <Icon className={`h-5 w-5 ${isActive ? "fill-[#ff4b4b]/20" : ""}`} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.name}</span>
            </Link>
          )
        })}
      </nav>

    </div>
  )
}