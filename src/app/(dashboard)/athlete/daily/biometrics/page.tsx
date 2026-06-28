"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HeartPulse, Activity, Scale, Save, CheckCircle2 } from "lucide-react"

export default function BiometricsPage() {
  const router = useRouter()
  const [restingHr, setRestingHr] = useState("")
  const [weight, setWeight] = useState("")
  const [muscleSoreness, setMuscleSoreness] = useState(3) // 1-5 scale

  const handleSave = () => {
    alert("Data biometrik berhasil disimpan. AI Engine sedang mengkalkulasi ulang kebutuhan kalori Anda hari ini.")
    router.back()
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0">
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-rose-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#602727] dark:via-[#331c1c] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Biometric Sync" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Morning <span className="text-[#ff4b4b]">Check-in</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Input data biometrik pagi Anda sebelum sarapan untuk kalibrasi algoritma performa.</p>
        </div>

        <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl/30 rounded-3xl overflow-hidden">
          <div className="bg-slate-100 dark:bg-secondary/50 p-4 border-b border-slate-200 dark:border-border">
            <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#ff4b4b]" /> Vital Stats
            </h2>
          </div>
          <CardContent className="p-5 space-y-5">
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <HeartPulse className="h-3.5 w-3.5 text-[#ff4b4b]" /> Resting Heart Rate (RHR)
              </label>
              <div className="relative">
                <Input 
                  type="number"
                  placeholder="Contoh: 52"
                  value={restingHr}
                  onChange={(e) => setRestingHr(e.target.value)}
                  className="pl-4 pr-12 h-14 bg-slate-50 dark:bg-[#161622] border-slate-200 dark:border-border text-lg font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">BPM</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Ukur segera setelah bangun tidur, posisi masih berbaring.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Scale className="h-3.5 w-3.5 text-blue-500" /> Berat Badan (Fasted)
              </label>
              <div className="relative">
                <Input 
                  type="number"
                  placeholder="Contoh: 65.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pl-4 pr-12 h-14 bg-slate-50 dark:bg-[#161622] border-slate-200 dark:border-border text-lg font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">KG</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-border">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex justify-between">
                <span>Muscle Soreness (DOMS)</span>
                <span className="text-[#ff4b4b]">Level {muscleSoreness}</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setMuscleSoreness(level)}
                    className={`flex-1 h-12 rounded-xl font-black text-lg transition-all ${
                      muscleSoreness === level 
                        ? 'bg-[#ff4b4b] text-white shadow-[0_0_15px_rgba(255,75,75,0.4)]' 
                        : 'bg-slate-100 dark:bg-[#161622] text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                <span>1 - Fresh</span>
                <span>5 - Sangat Nyeri</span>
              </div>
            </div>

          </CardContent>
        </Card>

      </main>
      
      <div className="fixed bottom-0 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-50">
        <Button onClick={handleSave} className="w-full h-14 bg-[#ff4b4b] hover:bg-red-600 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30">
          <CheckCircle2 className="mr-2 h-4 w-4" /> Sync Data & Update Readiness
        </Button>
      </div>
    </div>
  )
}
