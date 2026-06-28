"use client"

import { useState } from "react"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ruler, Scale, Activity, TrendingUp, AlertTriangle, HeartPulse, Dna, Info, Edit3, ArrowUpRight } from "lucide-react"

export default function FisikPage() {
  // Dummy Data
  const [biometrics] = useState({
    height: 168, // cm
    weight: 62, // kg
    wingspan: 175, // cm
    footSize: 42, // EU
    rhr: 52, // bpm
  })

  // Calculations
  const bmi = (biometrics.weight / Math.pow(biometrics.height / 100, 2)).toFixed(1)
  const apeIndex = biometrics.wingspan - biometrics.height // Positive is good for swimming

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0">
      
      {/* GLOBAL FIXED BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-rose-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#602727] dark:via-[#331c1c] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="pages" title="Biometric Engine" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        {/* HEADER SECTION */}
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Hydrodynamic <span className="text-[#ff4b4b]">Profile</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Pusat pemantauan pertumbuhan dan profil hidrodinamika. Pondasi data pencetak juara.</p>
        </div>

        {/* 1. SMART ACTIONABLE INSIGHTS (CORRELATION ENGINE) */}
        <section>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-4 relative overflow-hidden shadow-sm">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Dna className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex gap-3 relative z-10">
              <div className="bg-indigo-600 text-white rounded-full p-1.5 h-7 w-7 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">Growth Spurt Detected!</h3>
                  <Badge className="bg-indigo-600 text-white border-none text-[8px] uppercase tracking-widest px-1 py-0 h-4">AI Alert</Badge>
                </div>
                <p className="text-[11px] text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed font-medium">Tinggi badan bertambah 2cm bulan ini. Sistem mendeteksi potensi perubahan stroke length. Coach telah diinfokan untuk menyesuaikan rotasi bahu agar terhindar dari cedera.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. HYDRODYNAMIC METRICS (WINGS PAN RATIO) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#ff4b4b]" /> Hydrodynamic Potential
            </h2>
          </div>
          
          <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl/30 overflow-hidden rounded-3xl relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Ruler className="h-24 w-24" />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-1">Ape Index (Wingspan vs Height)</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">+{apeIndex}</h3>
                    <span className="text-sm font-bold text-slate-500">cm</span>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none uppercase tracking-widest font-bold text-[9px] mb-1">
                  Elite Swimmer Profile
                </Badge>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1.5 uppercase tracking-widest">
                    <span className="text-slate-500">Tinggi Badan</span>
                    <span className="text-slate-900 dark:text-white">{biometrics.height} cm</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 dark:bg-slate-600 w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1.5 uppercase tracking-widest">
                    <span className="text-slate-500 flex items-center"><Ruler className="h-3 w-3 mr-1 text-blue-500" /> Rentang Lengan (Wingspan)</span>
                    <span className="text-blue-600 dark:text-blue-400">{biometrics.wingspan} cm</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-secondary rounded-full overflow-hidden relative">
                    {/* The wingspan is larger than height, so bar goes further */}
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[95%] shadow-[0_0_10px_#3b82f6]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl border border-blue-100 dark:border-blue-500/20 flex gap-3">
                <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                  Rentang lengan lebih panjang dari tinggi badan (+{apeIndex}cm) memberikan keuntungan hidrodinamis besar dalam memaksimalkan <span className="font-bold">Distance Per Stroke (DPS)</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. GROWTH & COMPOSITION TRACKER */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="h-4 w-4 text-[#ff4b4b]" /> Growth & Composition
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-sm rounded-2xl">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-500 flex items-center justify-center mb-2">
                  <Scale className="h-4 w-4" />
                </div>
                <p className="text-[9px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-1">Berat Badan</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900 dark:text-white">{biometrics.weight}</span>
                  <span className="text-xs font-bold text-slate-400">kg</span>
                </div>
                <p className="text-[9px] font-bold text-emerald-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" /> +1.2kg (Otot)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-sm rounded-2xl">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center mb-2">
                  <Activity className="h-4 w-4" />
                </div>
                <p className="text-[9px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-widest mb-1">BMI Spesifik</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900 dark:text-white">{bmi}</span>
                </div>
                <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">
                  Optimal
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. OTHER VITAL METRICS */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-[#ff4b4b]" /> Vital Athletics
            </h2>
          </div>

          <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-border">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 dark:bg-[#ff4b4b]/10 p-2 rounded-lg text-[#ff4b4b]">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Resting Heart Rate</p>
                  <p className="text-[10px] text-slate-500">Recovery Baseline</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-slate-900 dark:text-white">{biometrics.rhr} <span className="text-[10px] text-slate-400">bpm</span></p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-50 dark:bg-cyan-500/10 p-2 rounded-lg text-cyan-600 dark:text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Ukuran Kaki (Fins)</p>
                  <p className="text-[10px] text-slate-500">Underwater Kick Power</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-slate-900 dark:text-white">{biometrics.footSize} <span className="text-[10px] text-slate-400">EU</span></p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* PARENT-COACH SYNC BUTTON */}
      <div className="fixed bottom-16 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button className="w-full h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30">
          <Edit3 className="mr-2 h-4 w-4" /> Input Data Biometrik Baru
        </Button>
        <p className="text-[9px] text-center font-medium text-slate-400 mt-2">Sinkronisasi terakhir oleh Orang Tua: 2 Hari yang lalu</p>
      </div>

    </div>
  )
}
