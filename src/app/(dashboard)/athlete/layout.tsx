// app/(dashboard)/athlete/layout.tsx
"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Activity, Trophy, CheckSquare, Ruler, Play, Dumbbell } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function AthleteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isTrainingOpen, setIsTrainingOpen] = useState(false)

  // 5 PILAR MENU ATLET
  const navItems = [
    { name: "MyPage", href: "/athlete/mypage", icon: Home, isLink: true },
    { name: "Prestasi", href: "/athlete/prestasi", icon: Trophy, isLink: true },
    { name: "Training", href: "/athlete/training", icon: Dumbbell, isLink: false },
    { name: "Daily", href: "/athlete/daily", icon: CheckSquare, isLink: true },
    { name: "Fisik", href: "/athlete/fisik", icon: Ruler, isLink: true },
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
          const isActive = item.isLink ? pathname.includes(item.href) : isTrainingOpen
          const Icon = item.icon
          
          if (item.isLink) {
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
          } else {
            // Training Center Popup Action (FAB Style)
            return (
              <div key={item.name} className="relative w-[20%] flex flex-col items-center justify-start -mt-5">
                <button
                  onClick={() => setIsTrainingOpen(true)}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-full shadow-lg shadow-[#ff4b4b]/40 text-white transition-all bg-gradient-to-tr from-[#ff4b4b] to-orange-500 hover:scale-105 active:scale-95 border-4 border-white dark:border-card relative z-10`}
                >
                  <Icon className="h-5 w-5" />
                </button>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-muted-foreground mt-1">{item.name}</span>
              </div>
            )
          }
        })}
      </nav>

      {/* GLOBAL TRAINING START POPUP SHEET UNTUK ATLET */}
      <Sheet open={isTrainingOpen} onOpenChange={setIsTrainingOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-6 pt-4 h-auto flex flex-col bg-white dark:bg-card border-t border-slate-200 dark:border-border text-slate-900 dark:text-white">
          <SheetHeader className="border-b border-slate-200 dark:border-border pb-4 text-left shrink-0">
            <SheetTitle className="text-lg font-heading font-bold uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
              <Dumbbell className="h-5 w-5 text-[#ff4b4b]" /> Menu Latihan
            </SheetTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Siap untuk sesi latihan hari ini?</p>
          </SheetHeader>
          
          <div className="py-6 flex flex-col gap-4 items-center">
            <div className="w-20 h-20 bg-rose-50 dark:bg-[#ff4b4b]/10 rounded-full flex items-center justify-center shadow-inner mb-2">
              <Play className="h-8 w-8 text-[#ff4b4b] ml-1" />
            </div>
            <p className="text-sm font-bold text-center">Kamu punya 1 program latihan hari ini!</p>
          </div>

          <div className="pt-2">
            <Button 
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#ff4b4b] to-orange-500 hover:opacity-90 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#ff4b4b]/30" 
              onClick={() => {
                setIsTrainingOpen(false)
                router.push('/athlete/training')
              }}
            >
              <Play className="mr-2 h-5 w-5" /> Mulai Latihan
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  )
}