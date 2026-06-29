// app/(dashboard)/coach/layout.tsx
"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, Activity, Award, BookOpen, Check, Play } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function CoachLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isTrainingOpen, setIsTrainingOpen] = useState(false)
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["Basic 1", "Basic 2"])

  const navItems = [
    { name: "MyPage", href: "/coach/mypage", icon: Home, isLink: true },
    { name: "Monitoring", href: "/coach/monitoring", icon: Award, isLink: true },
    { name: "Training", href: "/coach/training", icon: Activity, isLink: false },
    { name: "Athletes", href: "/coach/athletes", icon: Users, isLink: true },
    { name: "Program", href: "/coach/program", icon: BookOpen, isLink: true },
  ]

  const handleToggleClass = (level: string) => {
    setSelectedClasses(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    )
  }

  const handleStartTraining = () => {
    setIsTrainingOpen(false)
    router.push(`/coach/training?classes=${selectedClasses.join(",")}`)
  }

  return (
    // THEME UPDATE: Background utama jadi Dark Navy dengan Gradien Marun di Atas (hanya dark mode)
    <div className="flex h-[100dvh] w-full flex-col bg-transparent dark:bg-[#161622] text-slate-900 dark:text-white font-sans relative overflow-hidden z-0">

      {/* GLOBAL FIXED BACKGROUND GRADIENT */}
      <div className="hidden dark:block absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#602727] via-[#331c1c] to-transparent -z-10 pointer-events-none"></div>

      {/* KONTEN HALAMAN */}
      <main className="flex-1 overflow-y-auto pb-16 w-full">
        {children}
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      {/* THEME UPDATE: bg-white jadi Navy solid, border digelapin, shadow-lg dibikin lebih dramatis */}
      <nav className="absolute bottom-0 w-full flex h-16 items-center justify-between px-2 border-t border-slate-200 dark:border-[#2a293d] bg-white dark:bg-[#1f1e2e] pb-safe z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        {navItems.map((item) => {
          const isActive = item.isLink ? pathname.includes(item.href) : isTrainingOpen
          const Icon = item.icon
          
          if (item.isLink) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center w-[20%] gap-1 transition-colors ${isActive ? "text-[#ff4b4b]" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "fill-[#ff4b4b]/20" : ""}`} />
                <span className="text-[9px] font-bold uppercase tracking-widest">{item.name}</span>
              </Link>
            )
          } else {
            // Training Center Popup Action (FAB Style)
            return (
              <div key={item.name} className="relative w-[20%] flex flex-col items-center justify-start -mt-5">
                <button
                  onClick={() => setIsTrainingOpen(true)}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-full shadow-lg shadow-[#ff4b4b]/40 text-white transition-all bg-gradient-to-tr from-[#ff4b4b] to-orange-500 hover:scale-105 active:scale-95 border-4 border-white dark:border-[#1f1e2e] relative z-10`}
                >
                  <Icon className="h-5 w-5" />
                </button>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">{item.name}</span>
              </div>
            )
          }
        })}
      </nav>

      {/* GLOBAL TRAINING START POPUP SHEET */}
      <Sheet open={isTrainingOpen} onOpenChange={setIsTrainingOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-6 pt-4 h-auto flex flex-col bg-white dark:bg-[#1f1e2e] border-t border-slate-200 dark:border-[#2a293d] text-slate-900 dark:text-white">
          <SheetHeader className="border-b border-slate-200 dark:border-[#2a293d] pb-4 text-left shrink-0">
            <SheetTitle className="text-lg font-heading font-bold uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
              <Activity className="h-5 w-5 text-[#ff4b4b]" /> Mulai Sesi Latihan
            </SheetTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pilih kelas yang akan berlatih bersama sore ini.</p>
          </SheetHeader>
          
          <div className="py-4 space-y-3">
            {[
              { level: "Basic 1", time: "15:30 - 17:30 WIB", count: 3 },
              { level: "Basic 2", time: "15:30 - 17:30 WIB", count: 2 },
              { level: "Elite", time: "16:30 - 18:30 WIB", count: 1 }
            ].map((c) => {
              const isChecked = selectedClasses.includes(c.level)
              return (
                <div 
                  key={c.level}
                  onClick={() => handleToggleClass(c.level)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isChecked ? 'bg-[#ff4b4b]/5 border-[#ff4b4b]/30 text-slate-950 dark:text-white' : 'bg-background border-slate-200 dark:border-[#2a293d] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id={`popup-class-${c.level}`}
                      checked={isChecked}
                      onCheckedChange={() => {}} 
                      className="h-5 w-5 data-[state=checked]:bg-[#ff4b4b] data-[state=checked]:border-[#ff4b4b]"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">Kelas {c.level}</h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-450 font-medium mt-0.5">{c.time} • {c.count} Atlet</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-[#2a293d] shrink-0">
            <Button 
              disabled={selectedClasses.length === 0}
              onClick={handleStartTraining} 
              className="w-full h-12 text-xs font-bold uppercase tracking-widest bg-[#ff4b4b] hover:bg-[#ff4b4b]/95 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Play className="h-4 w-4 fill-white" /> Masuk Absensi Atlet
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  )
}