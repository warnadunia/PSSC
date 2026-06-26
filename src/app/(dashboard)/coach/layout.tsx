// app/(dashboard)/coach/layout.tsx
"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, Users, Activity, MoreHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function CoachLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const navItems = [
    { name: "MyPage", href: "/coach/mypage", icon: Home },
    { name: "Schedules", href: "/coach/schedules", icon: CalendarDays },
    { name: "Athletes", href: "/coach/athletes", icon: Users },
    { name: "Training", href: "/coach/training", icon: Activity },
  ]

  return (
    // REVISI: Dibuat w-full, tidak ada lagi pembatasan max-w-md
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

        {/* MORE (SLIDE UP) */}
<Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
  {/* Hapus asChild dan div, styling langsung di SheetTrigger */}
  <SheetTrigger className="flex flex-col items-center justify-center w-[20%] gap-1 cursor-pointer text-slate-400 hover:text-red-600 transition-colors bg-transparent border-none">
    <MoreHorizontal className="h-5 w-5" />
    <span className="text-[9px] font-semibold">More</span>
  </SheetTrigger>

  <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8 pt-4 w-full">
            <SheetHeader className="flex flex-row items-center justify-between border-b pb-3 mb-4">
              <SheetTitle className="text-lg font-bold text-slate-800">Menu Lainnya</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="h-12 w-12 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors flex items-center justify-center font-bold text-slate-600">A</div>
                <span className="text-[10px] font-medium text-slate-600">Page A</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

    </div>
  )
}