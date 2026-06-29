"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Timer, Check, ArrowLeft, Lock, Play, CheckSquare, ListTodo } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// ==========================================
// DUMMY DATA DETAIL PROGRAM DARI PUSAT
// ==========================================
interface DrillItem {
  id: number
  label: string
  target: string
  color: string
  needTimer: boolean // Jika true, wajib pakai stopwatch. Jika false, cukup checklist.
}

interface ProgramDetail {
  id: string
  title: string
  focus: string
  classLevel: string
  distance: string
  duration: string
  time: string
  groups: {
    name: string
    drills: DrillItem[]
  }[]
}

const programsData: Record<string, ProgramDetail> = {
  "prog-1": {
    id: "prog-1",
    title: "The Blue Mile 🐟",
    focus: "Aerobic Capacity & Endurance",
    classLevel: "Elite",
    distance: "1,500 m",
    duration: "42 min",
    time: "15:00 WIB",
    groups: [
      {
        name: "WARM UP",
        drills: [
          { id: 101, label: "1 × 300 Free", target: "@ 6:00", color: "bg-emerald-500", needTimer: false },
          { id: 102, label: "1 × 200 IM", target: "@ 4:00", color: "bg-emerald-500", needTimer: false },
        ]
      },
      {
        name: "MAIN SET",
        drills: [
          { id: 103, label: "4 × 100 Free", target: "@ 1:50", color: "bg-[#ff4b4b]", needTimer: true },
          { id: 104, label: "4 × 50 Stroke", target: "@ 1:00", color: "bg-pink-500", needTimer: true },
        ]
      },
      {
        name: "COOL DOWN",
        drills: [
          { id: 105, label: "1 × 100 Easy Back/Breast", target: "Santai", color: "bg-blue-400", needTimer: false }
        ]
      }
    ]
  },
  "prog-2": {
    id: "prog-2",
    title: "Sesi Teknik Bebas 🏊",
    focus: "Stroke Mechanics & Efficiency",
    classLevel: "LTHS",
    distance: "1,200 m",
    duration: "35 min",
    time: "16:00 WIB",
    groups: [
      {
        name: "WARM UP",
        drills: [
          { id: 201, label: "1 × 200 Free", target: "@ 4:00", color: "bg-emerald-500", needTimer: false },
          { id: 202, label: "4 × 50 Kick (Fins)", target: "@ 1:15", color: "bg-indigo-400", needTimer: false },
        ]
      },
      {
        name: "MAIN SET (TECH DRILL)",
        drills: [
          { id: 203, label: "6 × 50 Catch-Up Drill", target: "@ 1:10", color: "bg-[#ff4b4b]", needTimer: true },
          { id: 204, label: "4 × 50 Swim Build-Up", target: "@ 1:00", color: "bg-[#ff4b4b]", needTimer: true },
        ]
      },
      {
        name: "COOL DOWN",
        drills: [
          { id: 205, label: "1 × 100 Recovery Kick", target: "Santai", color: "bg-blue-400", needTimer: false }
        ]
      }
    ]
  }
}

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const program = programsData[resolvedParams.id] || programsData["prog-1"]

  const handleStartTraining = () => {
    // Alihkan langsung ke halaman training dan otomatis buka kelas/program terkait
    router.push(`/coach/training?start=${program.id}&class=${program.classLevel}`)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full pb-28 relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-[#ffe5e5] via-[#fff5f5] to-[#fff5f5] dark:from-[#3a1c1c] dark:via-[#09090b] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Detail Kurikulum Latihan" />

      <main className="flex-1 w-full px-4 md:px-6 pt-5 space-y-5">
        
        {/* Back Link */}
        <button 
          onClick={() => router.push("/coach/program")} 
          className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Program
        </button>

        {/* ==========================================
            1. HEADER DETAIL & STATUS LOCK
            ========================================== */}
        <section className="bg-white dark:bg-card p-5 rounded-3xl border border-slate-200 dark:border-border shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-100/30 to-transparent pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-4">
            <Badge className="bg-[#ff4b4b] text-white border-none text-[9px] uppercase tracking-wider font-bold shadow-sm">
              Kelas {program.classLevel}
            </Badge>
            <Badge className="bg-slate-100 dark:bg-secondary text-slate-500 dark:text-muted-foreground border-none text-[8px] h-5 py-0 px-1.5 font-bold flex items-center gap-1">
              <Lock className="h-3 w-3" /> KURIKULUM RESMI PUSAT
            </Badge>
          </div>

          <h1 className="font-heading font-black text-2xl text-slate-900 dark:text-white uppercase leading-tight tracking-wider mb-2">
            {program.title}
          </h1>
          <p className="text-xs font-bold text-[#ff4b4b] uppercase tracking-widest mb-5">
            Fokus: {program.focus}
          </p>

          <div className="grid grid-cols-2 gap-y-4 gap-x-4 pt-4 border-t border-slate-100 dark:border-border/50">
            <div className="flex items-center gap-2">
              <MapPin className="h-4.5 w-4.5 text-slate-400" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Total Jarak</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{program.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-slate-400" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Estimasi Waktu</p>
                <p className="text-xs font-bold text-slate-800 dark:text-white">{program.duration}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. workout BREAKDOWN
            ========================================== */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-[#ff4b4b]" /> Rincian Set Latihan
          </h2>

          {program.groups.map((group, gIdx) => (
            <Card key={gIdx} className="border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-3xl overflow-hidden">
              
              {/* Header Group */}
              <div className="bg-slate-50 dark:bg-secondary/40 px-4 py-3 border-b border-slate-200 dark:border-border/50">
                <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">
                  {group.name}
                </span>
              </div>
              
              {/* Drills List */}
              <div className="divide-y divide-slate-100 dark:divide-border/50">
                {group.drills.map((drill, dIdx) => (
                  <div key={dIdx} className="flex items-center justify-between p-4 relative pl-6">
                    {/* Left color bar indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${drill.color}`}></div>
                    
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                        {drill.label}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        Target: {drill.target}
                      </p>
                    </div>

                    <div className="shrink-0 pl-4">
                      {drill.needTimer ? (
                        <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-none text-[8px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Timer className="h-3 w-3" /> Wajib Waktu
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-500 dark:bg-secondary dark:text-muted-foreground border-none text-[8px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckSquare className="h-3 w-3" /> Cukup Centang
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </Card>
          ))}
        </section>

      </main>

      {/* ==========================================
          FIXED BOTTOM PANEL FOR START TRAINING
          ========================================== */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleStartTraining} 
            className="w-full h-12 text-xs font-bold uppercase tracking-widest bg-[#ff4b4b] hover:bg-[#ff4b4b]/95 text-white rounded-xl shadow-lg shadow-[#ff4b4b]/20 flex items-center justify-center gap-2"
          >
            <Play className="h-4 w-4 fill-white" /> Eksekusi Latihan Ini (Training)
          </Button>
        </div>
      </div>

    </div>
  )
}
