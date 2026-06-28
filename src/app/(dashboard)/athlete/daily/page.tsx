"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BatteryCharging, HeartPulse, Moon, Zap, Flame, Droplets, Utensils, ShoppingBag, Info, AlertTriangle, ChevronRight, Activity, Edit3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DailyPage() {
  const router = useRouter()
  const [readinessScore] = useState(88) // Example score
  const [sleepTime] = useState("7h 45m")
  const [restingHr] = useState("52 bpm")

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0">
      
      {/* GLOBAL FIXED BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-rose-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#602727] dark:via-[#331c1c] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="pages" title="Daily Routine" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        {/* HEADER SECTION */}
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Performance <span className="text-[#ff4b4b]">Engine</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Sistem manajemen performa atlet presisi tinggi. Nutrisi bukan sekadar makanan, tapi bahan bakar.</p>
        </div>

        {/* 1. DAILY READINESS METER */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <BatteryCharging className="h-4 w-4 text-[#ff4b4b]" /> Daily Readiness
            </h2>
          </div>
          <Card 
            onClick={() => router.push('/athlete/daily/sleep')}
            className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl/30 overflow-hidden rounded-3xl relative cursor-pointer hover:bg-slate-50 dark:hover:bg-secondary/30 transition-colors"
          >
            {/* Background accent */}
            <div className="absolute -right-6 -top-6 h-24 w-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <div className="absolute top-4 right-4 bg-slate-100 dark:bg-secondary p-1.5 rounded-full text-slate-400">
              <Moon className="h-4 w-4" />
            </div>
            
            <CardContent className="p-5">
              <div className="flex items-center gap-4 mb-5">
                {/* Score Circle */}
                <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-secondary"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500 transition-all duration-1000 ease-out"
                      strokeWidth="3"
                      strokeDasharray={`${readinessScore}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">{readinessScore}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Prime State</h3>
                  <p className="text-[10px] text-slate-500 dark:text-muted-foreground leading-snug">Tubuh dalam kondisi optimal. Siap untuk program intensitas tinggi (VO2 Max / Time Trial).</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-border">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-70" onClick={(e) => { e.stopPropagation(); router.push('/athlete/daily/sleep'); }}>
                  <div className="bg-indigo-50 dark:bg-indigo-500/10 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest">Kualitas Tidur</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{sleepTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-70" onClick={(e) => { e.stopPropagation(); router.push('/athlete/daily/biometrics'); }}>
                  <div className="bg-[#ff4b4b]/10 p-2 rounded-xl text-[#ff4b4b]">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest">Resting HR</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{restingHr}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button 
              onClick={() => router.push('/athlete/daily/sleep')}
              className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl/30 rounded-xl"
            >
              <Moon className="mr-2 h-4 w-4" /> Sleep & Recover
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/athlete/daily/biometrics')}
              className="w-full h-12 text-[10px] font-bold uppercase tracking-widest border-slate-200 dark:border-border text-slate-600 dark:text-slate-300 rounded-xl bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-secondary"
            >
              <HeartPulse className="mr-2 h-4 w-4 text-[#ff4b4b]" /> Biometrics
            </Button>
          </div>
        </section>

        {/* 2. THE INTELLIGENT SUGGESTION ENGINE */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#ff4b4b]" /> Dynamic Suggestion
            </h2>
            <Badge className="bg-[#ff4b4b]/10 text-[#ff4b4b] border-none font-bold uppercase tracking-widest text-[9px]">AI Active</Badge>
          </div>
          
          <div className="space-y-3">
            {/* Dynamic Alert */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <Zap className="h-16 w-16 text-amber-500" />
              </div>
              <div className="flex gap-3 relative z-10">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-amber-900 dark:text-amber-500 uppercase tracking-widest mb-1">Today: The Blue Mile</h3>
                  <p className="text-[11px] text-amber-800/80 dark:text-amber-500/80 leading-relaxed font-medium">Sistem mendeteksi jadwal latihan berat hari ini. Kami telah menambahkan jatah Karbohidrat kompleks di menu siang Anda (+50g) untuk energi tahan lama.</p>
                </div>
              </div>
            </div>

            {/* Post-Training Window */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-[#2a293d] dark:to-[#1f1e2e] rounded-2xl p-4 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
                <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Post-Training Window</h3>
              </div>
              <p className="text-xs font-medium leading-relaxed text-slate-100 mb-3">
                Segera konsumsi <span className="text-emerald-400 font-bold">20g Protein + 40g Karbohidrat</span> dalam 30 menit pasca latihan untuk menghentikan katabolisme otot!
              </p>
              <Button size="sm" className="w-full h-8 bg-white/10 hover:bg-white/20 text-white border-none text-[10px] font-bold uppercase tracking-widest">
                Set Reminder <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* 3. NUTRITION BLUEPRINT */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Utensils className="h-4 w-4 text-[#ff4b4b]" /> Nutrition Blueprint
            </h2>
            <Button size="sm" variant="ghost" onClick={() => router.push('/athlete/daily/nutrition')} className="h-7 text-[10px] font-bold uppercase tracking-widest text-[#ff4b4b] hover:bg-[#ff4b4b]/10">
              Update Log
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Protein */}
            <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl rounded-2xl">
              <CardContent className="p-4">
                <div className="bg-blue-50 dark:bg-blue-500/10 w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                  <Activity className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Protein</h3>
                <p className="text-[9px] text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-3">Pembangun Massa</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-900 dark:text-white">120g</span>
                    <span className="text-slate-400">/ 150g</span>
                  </div>
                  <Progress value={80} className="h-1.5 bg-blue-100 dark:bg-blue-950" indicatorColor="bg-blue-500" />
                </div>
              </CardContent>
            </Card>

            {/* Carbs */}
            <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl rounded-2xl">
              <CardContent className="p-4">
                <div className="bg-amber-50 dark:bg-amber-500/10 w-8 h-8 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                  <Flame className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Karbohidrat</h3>
                <p className="text-[9px] text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-3">Energi Primer</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-900 dark:text-white">280g</span>
                    <span className="text-slate-400">/ 350g</span>
                  </div>
                  <Progress value={80} className="h-1.5 bg-amber-100 dark:bg-amber-950" indicatorColor="bg-amber-500" />
                </div>
              </CardContent>
            </Card>

            {/* Hydration */}
            <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl rounded-2xl">
              <CardContent className="p-4">
                <div className="bg-cyan-50 dark:bg-cyan-500/10 w-8 h-8 rounded-lg flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3">
                  <Droplets className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Hidrasi</h3>
                <p className="text-[9px] text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-3">Elektrolit</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-900 dark:text-white">2.5L</span>
                    <span className="text-slate-400">/ 3.5L</span>
                  </div>
                  <Progress value={70} className="h-1.5 bg-cyan-100 dark:bg-cyan-950" indicatorColor="bg-cyan-500" />
                </div>
              </CardContent>
            </Card>

            {/* Micronutrients */}
            <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl rounded-2xl">
              <CardContent className="p-4">
                <div className="bg-emerald-50 dark:bg-emerald-500/10 w-8 h-8 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Mikronutrisi</h3>
                <p className="text-[9px] text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-3">Immune Shield</p>
                <div className="flex gap-1">
                  {/* Warna Warni Rule */}
                  <div className="h-2 w-full bg-red-400 rounded-sm"></div>
                  <div className="h-2 w-full bg-orange-400 rounded-sm"></div>
                  <div className="h-2 w-full bg-green-400 rounded-sm"></div>
                </div>
                <p className="text-[8px] font-bold text-slate-400 mt-2 text-center uppercase">3 Warna Sayur/Buah</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. HOME COACH (SHOPPING LIST) */}
        <section>
          <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl/30 rounded-3xl overflow-hidden">
            <div className="bg-slate-100 dark:bg-secondary/50 p-4 border-b border-slate-200 dark:border-border flex items-center justify-between">
              <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-emerald-500" /> Home Coach
              </h2>
              <Badge className="bg-white dark:bg-[#161622] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2a293d] shadow-xl uppercase tracking-widest text-[9px]">Untuk Orang Tua</Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex gap-3 mb-4">
                <div className="mt-0.5">
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">Fokus Minggu Ini: Kalsium & Vitamin D</h3>
                  <p className="text-[11px] text-slate-500 dark:text-muted-foreground leading-relaxed font-medium">Berdasarkan data biometrik, tinggi badan atlet sedikit stagnan. Perbanyak asupan untuk menunjang pertumbuhan tulang, dan pastikan tidur sebelum jam 9 malam.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-[#161622] rounded-xl p-3 border border-slate-100 dark:border-border">
                <p className="text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-2">Shopping List Juara</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> Susu High Calcium / Yoghurt
                  </li>
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> Ikan Salmon / Sarden
                  </li>
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> Telur Omega 3
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  )
}
