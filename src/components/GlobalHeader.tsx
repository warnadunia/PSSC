"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Menu, MessageSquare, Bell, ArrowLeft, X, Search, Shield, CalendarClock, LayoutDashboard, Users, Activity, Sun, Moon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface GlobalHeaderProps {
  variant: "pages" | "subpage" | "slideup"
  title: string
  onClose?: () => void
}

export function GlobalHeader({ variant, title, onClose }: GlobalHeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 1.0 }
    )
    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }
    return () => observer.disconnect()
  }, [])

  if (variant === "subpage") {
    return (
      <>
        <div ref={observerTarget} className="absolute top-0 left-0 w-full h-1" />
        <header className={`sticky top-0 z-40 w-full flex h-14 items-center gap-3 px-4 transition-all duration-300 ${isScrolled ? "bg-white dark:bg-[#602727] shadow-md dark:shadow-lg border-b border-slate-200 dark:border-[#ff4b4b]/20" : "bg-transparent"
          }`}>
          <Button variant="ghost" size="icon" className="text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 -ml-2 shrink-0 transition-colors" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-slate-900 dark:text-white text-lg uppercase tracking-widest truncate">{title}</h1>
        </header>
      </>
    )
  }

  // Varian utama dengan branding PSSC Sporty
  return (
    <>
      <div ref={observerTarget} className="absolute top-0 left-0 w-full h-1" />
      <header className={`sticky top-0 z-40 w-full flex h-14 items-center justify-between px-4 transition-all duration-300 ${isScrolled ? "bg-white dark:bg-[#602727] shadow-md dark:shadow-lg border-b border-slate-200 dark:border-[#ff4b4b]/20" : "bg-transparent"
        }`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <Sheet>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-white/10 -ml-2 shrink-0 text-slate-800 dark:text-white transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] text-slate-900 dark:text-white p-0 flex flex-col h-full border-r">

              {/* LOGO & CLUB NAME */}
              <div className="pt-8 pb-6 px-5 border-b border-slate-200 dark:border-[#2a293d] flex flex-col items-start shrink-0 space-y-4 relative overflow-hidden">
                {/* Subtle red glow behind logo */}
                <div className="absolute top-4 -left-4 w-32 h-32 bg-[#ff4b4b]/5 dark:bg-[#ff4b4b]/10 blur-3xl rounded-full pointer-events-none" />

                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center -black/40 p-2.5 relative z-10 border-4 border-slate-50 dark:border-[#1f1e2e] ring-2 ring-slate-200 dark:ring-[#2a293d] shadow-xl/30">
                  <img src="/assets/images/logo-parisakti.webp" alt="PSSC Logo" className="h-full w-full object-contain" />
                </div>

                <div className="text-left relative z-10 w-full">
                  <h2 className="font-heading font-black tracking-widest uppercase text-[15px] leading-tight text-slate-900 dark:text-white mb-1.5">Pari Sakti<br />Swimming Club</h2>
                  <p className="text-[10px] text-[#ff4b4b] font-bold uppercase tracking-widest">Yogyakarta</p>
                </div>
              </div>

              {/* MAIN MENU ITEMS */}
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <SheetClose render={
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      router.push('/athlete/permission')
                    }}
                    className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a293d] h-11 px-3 rounded-xl transition-all"
                  >
                    <CalendarClock className="mr-3 h-5 w-5 text-[#ff4b4b]" />
                    <span className="font-bold text-sm tracking-wide">Ijin / Cuti</span>
                  </Button>
                } />

                <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a293d] h-11 px-3 rounded-xl transition-all">
                  <LayoutDashboard className="mr-3 h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <span className="font-bold text-sm tracking-wide">Menu A</span>
                </Button>

                <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a293d] h-11 px-3 rounded-xl transition-all">
                  <Users className="mr-3 h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <span className="font-bold text-sm tracking-wide">Menu B</span>
                </Button>

                <Button variant="ghost" className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#2a293d] h-11 px-3 rounded-xl transition-all">
                  <Activity className="mr-3 h-5 w-5 text-amber-500 dark:text-amber-400" />
                  <span className="font-bold text-sm tracking-wide">Menu C</span>
                </Button>
              </div>

              {/* BOTTOM SECTION */}
              <div className="p-4 border-t border-slate-200 dark:border-[#2a293d] space-y-4 shrink-0 bg-slate-50 dark:bg-[#161622]">

                {/* THEME SWITCHER */}
                <div className="flex items-center justify-between bg-slate-200/50 dark:bg-[#1f1e2e] p-1.5 rounded-xl border border-slate-300/50 dark:border-[#2a293d]">
                  {mounted && (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => setTheme('light')}
                        className={`flex-1 h-8 rounded-lg font-bold text-xs transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-transparent'}`}
                      >
                        <Sun className={`h-4 w-4 mr-2 ${theme === 'light' ? 'text-amber-500' : ''}`} /> Light
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setTheme('dark')}
                        className={`flex-1 h-8 rounded-lg font-bold text-xs transition-colors ${theme === 'dark' ? 'bg-[#2a293d] shadow-sm text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-transparent'}`}
                      >
                        <Moon className={`h-4 w-4 mr-2 ${theme === 'dark' ? 'text-blue-400' : ''}`} /> Dark
                      </Button>
                    </>
                  )}
                </div>

                {/* USER PROFILE */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-[#2a293d] border-2 border-[#ff4b4b] shrink-0 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=johndoe" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate tracking-wide">John Doe</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">Head Coach</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-500 dark:text-slate-400 hover:text-[#ff4b4b] hover:bg-rose-50 dark:hover:bg-[#ff4b4b]/10 rounded-lg shrink-0 transition-colors"
                    onClick={() => router.push("/")}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </SheetContent>
          </Sheet>
          <h1 className="font-bold text-slate-900 dark:text-white text-lg uppercase tracking-widest truncate">{title === 'MyPage' ? 'PSSC YOGYAKARTA' : title}</h1>
        </div>

        <div className="flex items-center gap-1 shrink-0">

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 relative transition-colors" />}>
              <Search className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] p-0 flex flex-col h-full border-l text-slate-900 dark:text-white">
              <SheetHeader className="p-4 border-b border-slate-200 dark:border-[#2a293d] bg-slate-50 dark:bg-[#161622] text-left">
                <SheetTitle className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest">Pencarian</SheetTitle>
              </SheetHeader>
              <div className="p-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari atlet, program, agenda..."
                    className="w-full bg-slate-50 dark:bg-[#161622] border border-slate-200 dark:border-[#2a293d] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-[#ff4b4b] focus:ring-1 focus:ring-[#ff4b4b] transition-all"
                    autoFocus
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block w-full mb-1">Pencarian Populer</span>
                  <Badge variant="outline" className="bg-slate-100 dark:bg-[#2a293d] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#34334a] hover:bg-slate-200 dark:hover:bg-[#34334a] cursor-pointer">Bima Arya</Badge>
                  <Badge variant="outline" className="bg-slate-100 dark:bg-[#2a293d] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#34334a] hover:bg-slate-200 dark:hover:bg-[#34334a] cursor-pointer">Time Trial 50M</Badge>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 relative transition-colors" />}>
              <Bell className="h-5 w-5" />
              <span className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#ff4b4b] border-[1.5px] ${isScrolled ? 'border-white dark:border-[#602727]' : 'border-transparent'} animate-pulse`}></span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[350px] bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] p-0 flex flex-col h-full border-l text-slate-900 dark:text-white">
              <SheetHeader className="p-4 border-b border-slate-200 dark:border-[#2a293d] bg-slate-50 dark:bg-[#161622] text-left flex flex-row items-center justify-between">
                <SheetTitle className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <Bell className="h-3.5 w-3.5 text-[#ff4b4b]" />
                  Notifikasi Terbaru
                </SheetTitle>
                <Badge className="bg-rose-50 dark:bg-[#ff4b4b]/20 text-[#ff4b4b] hover:bg-rose-100 dark:hover:bg-[#ff4b4b]/30 border-none mt-0 shadow-xl/30">2 Baru</Badge>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-slate-100 dark:border-[#2a293d] hover:bg-slate-50 dark:hover:bg-[#2a293d] transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff4b4b]" />
                  <div className="pl-3">
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Pengumuman: Kejurda 2026</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">Siapkan atlet lapis 1 untuk kualifikasi gaya bebas & ganti. Pendaftaran ditutup 10 Juli.</p>
                    <span className="text-[10px] text-[#ff4b4b] font-bold uppercase tracking-widest">10 Menit lalu</span>
                  </div>
                </div>

                <div className="p-4 border-b border-slate-100 dark:border-[#2a293d] hover:bg-slate-50 dark:hover:bg-[#2a293d] transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff4b4b]" />
                  <div className="pl-3">
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">Jadwal Latihan Diubah</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">Sesi Latihan Sore (Elite) diubah lokasinya ke UNY Pool karena pemeliharaan.</p>
                    <span className="text-[10px] text-[#ff4b4b] font-bold uppercase tracking-widest">2 Jam lalu</span>
                  </div>
                </div>

                <div className="p-4 hover:bg-slate-50 dark:hover:bg-[#2a293d] transition-colors cursor-pointer">
                  <div className="pl-3">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Ijin Atlet: Dinda Aulia</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-2">Pengajuan ijin sakit untuk latihan tanggal 26 Juni 2026.</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Kemarin</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#161622] border-t border-slate-200 dark:border-[#2a293d] text-center shrink-0">
                <button className="text-[10px] font-bold text-[#ff4b4b] uppercase tracking-widest hover:underline">
                  Lihat Semua Notifikasi
                </button>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </header>
    </>
  )
}
