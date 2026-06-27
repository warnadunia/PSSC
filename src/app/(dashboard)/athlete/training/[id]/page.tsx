"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin, Clock, Flame, Waves, Play, Square, Timer, Check, X, Save } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const trainingSets = [
  {
    groupName: "WARM UP",
    items: [
      { id: 1, label: "1 × 300 Free", target: "@ 6:00", color: "bg-emerald-400", athleteStatus: "Done", athleteTime: null },
      { id: 2, label: "1 × 200 IM", target: "@ 4:00", color: "bg-emerald-400", athleteStatus: "Done", athleteTime: null }
    ]
  },
  {
    groupName: "MAIN SET",
    items: [
      { id: 3, label: "4 × 100 Free", target: "@ 1:50", color: "bg-[#ff4b4b]", athleteStatus: "Time", athleteTime: "01:45" },
      { id: 4, label: "4 × 50 Stroke", target: "@ 1:00", color: "bg-pink-400", athleteStatus: "Skip", athleteTime: null }
    ]
  }
]

const drylandSets = [
  {
    groupName: "Hand Drill",
    items: [
      { id: 11, label: "3 x 30 Push Up", target: "2:00", color: "bg-orange-400" },
      { id: 12, label: "3 x 15 Pull Up", target: "2:30", color: "bg-amber-500" }
    ]
  },
  {
    groupName: "Core Training",
    items: [
      { id: 13, label: "3 x 60s Plank", target: "1:00", color: "bg-[#ff4b4b]" },
      { id: 14, label: "3 x 20 Sit Up", target: "1:30", color: "bg-rose-500" }
    ]
  }
]



function TrainingDetailContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "program"
  
  // ==============================
  // STATE FLOATING TIMER (PERSONAL)
  // ==============================
  const [timeMs, setTimeMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const toggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsRunning(false)
    } else {
      setIsRunning(true)
      const startTime = Date.now() - timeMs
      timerRef.current = setInterval(() => setTimeMs(Date.now() - startTime), 10)
    }
  }

  // ==============================
  // STATE ROW STOPWATCH (PROGRAM)
  // ==============================
  const [activeTrialItem, setActiveTrialItem] = useState<{ id: number, label: string } | null>(null)
  const [trialTimeMs, setTrialTimeMs] = useState(0)
  const [isTrialRunning, setIsTrialRunning] = useState(false)
  const trialTimerRef = useRef<NodeJS.Timeout | null>(null)
  


  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const toggleTrialTimer = () => {
    if (isTrialRunning) {
      if (trialTimerRef.current) clearInterval(trialTimerRef.current)
      setIsTrialRunning(false)
    } else {
      setIsTrialRunning(true)
      const startTime = Date.now() - trialTimeMs
      trialTimerRef.current = setInterval(() => setTrialTimeMs(Date.now() - startTime), 10)
    }
  }

  const closeTrialModal = () => {
    if (trialTimerRef.current) clearInterval(trialTimerRef.current)
    setIsTrialRunning(false)
    setTrialTimeMs(0)
    setActiveTrialItem(null)
  }

  useEffect(() => {
    return () => { 
      if (timerRef.current) clearInterval(timerRef.current) 
      if (trialTimerRef.current) clearInterval(trialTimerRef.current) 
    }
  }, [])

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, "0")
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full relative" suppressHydrationWarning>
      <GlobalHeader variant="subpage" title="Detail Latihan" />


      <main className={`flex-1 overflow-y-auto w-full bg-white dark:bg-[#1f1e2e] ${type === 'personal' ? 'pb-32' : 'pb-10'}`}>
        
        {/* Info Grid */}
        <div className="px-5 pt-2 pb-6 border-b border-slate-200 dark:border-[#2a293d]">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">The Blue Mile 🐟</h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 mb-5">3 minutes ago</p>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Distance</p><p className="text-sm font-semibold text-slate-900 dark:text-white">1,500 m</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Duration</p><p className="text-sm font-semibold text-slate-900 dark:text-white">42 min</p></div>
            </div>
          </div>
        </div>

        {/* ==========================================
            STRUKTUR TABEL (GROUP NAME | TARGET | TIME)
            ========================================== */}
        <div className="w-full">
          {(type === 'personal' ? drylandSets : trainingSets).map((group, gIdx) => (
            <div key={gIdx} className="mb-4">
              
              {/* Header Kolom */}
              <div className="grid grid-cols-[10fr_4fr_5fr] bg-slate-100 dark:bg-[#2a293d]/70 px-4 py-2 border-y border-slate-200 dark:border-[#2a293d] sticky top-0 z-10 shadow-xl/30">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{group.groupName}</span>
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Target</span>
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center pr-2">Waktu / Status</span>
              </div>
              
              {/* Baris Latihan */}
              {group.items.map((item, iIdx) => {
                const isChecked = checkedItems[item.id]
                return (
                  <div key={iIdx} className={`grid grid-cols-[10fr_4fr_5fr] items-center py-4 pl-4 pr-3 border-b border-slate-200 dark:border-[#2a293d] relative transition-colors ${isChecked ? 'bg-slate-50 dark:bg-[#161622]' : 'bg-white dark:bg-[#1f1e2e]'}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color}`}></div>
                    
                    {/* Kolom 1: Nama Set */}
                    <div className="flex items-center pl-2">
                      <span 
                        onClick={() => {
                          if (type === 'personal') {
                            window.location.href = `${window.location.pathname}/movement/${item.id}`;
                          }
                        }}
                        className={`text-[14px] font-bold ${type === 'personal' ? 'cursor-pointer hover:text-[#ff4b4b] hover:underline' : ''} ${isChecked ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Kolom 2: Target */}
                    <div className="text-center text-[13px] font-bold text-slate-500 dark:text-slate-400">
                      {item.target}
                    </div>
                    
                    {/* Kolom 3: Aksi (Stopwatch & Checkbox) / READONLY (Athlete) */}
                    <div className="flex justify-end items-center gap-3">
                      {type === 'program' ? (
                         <div className="text-[11px] font-bold uppercase tracking-wide">
                            {(item as any).athleteStatus === "Time" ? (
                              <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">{(item as any).athleteTime}</span>
                            ) : (item as any).athleteStatus === "Skip" ? (
                              <span className="text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#161622] px-2 py-1 rounded border border-slate-200 dark:border-[#2a293d]">Skip</span>
                            ) : (
                              <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">Done</span>
                            )}
                         </div>
                      ) : (
                        <>
                          <Button 
                            onClick={() => setActiveTrialItem(item)}
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full border-red-200 text-[#ff4b4b] hover:bg-red-50 disabled:opacity-50 shadow-xl/30"
                            disabled={isChecked} // Disable stopwatch jika sudah diceklis manual
                          >
                            <Timer className="h-4 w-4" />
                          </Button>
                          
                          <div className="bg-slate-100 dark:bg-[#2a293d] p-1.5 rounded-lg">
                            <Checkbox 
                              checked={isChecked}
                              onCheckedChange={(c) => setCheckedItems(prev => ({...prev, [item.id]: !!c}))}
                              className="h-5 w-5 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" 
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </main>

      {/* ==========================================
          MODAL STOPWATCH (DIBUKA DARI TOMBOL ROW)
          ========================================== */}
      <Dialog open={activeTrialItem !== null} onOpenChange={(open) => !open && closeTrialModal()}>
        <DialogContent className="max-w-md w-[95%] rounded-3xl bg-slate-50 dark:bg-[#161622] p-0 overflow-hidden">
          <DialogHeader className="p-4 bg-white dark:bg-[#1f1e2e] border-b relative">
            <Button variant="ghost" size="icon" onClick={closeTrialModal} className="absolute right-2 top-2 h-8 w-8 rounded-full">
              <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </Button>
            <DialogTitle className="text-left text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Live Time Trial
            </DialogTitle>
            <p className="text-left text-xl font-black text-slate-900 dark:text-white mt-1">{activeTrialItem?.label}</p>
          </DialogHeader>

          <div className="p-4">
            {/* Display Timer Raksasa */}
            <div className="text-center mb-6">
              <div className="text-6xl font-mono font-black text-slate-900 dark:text-white tracking-tighter">
                {formatTime(trialTimeMs)}
              </div>
              <Button 
                onClick={toggleTrialTimer} 
                className={`mt-4 h-12 w-40 rounded-full font-bold text-sm shadow-lg ${isTrialRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#ff4b4b] hover:bg-red-700'}`}
              >
                {isTrialRunning ? <><Square className="h-4 w-4 mr-2 fill-white" /> Pause Timer</> : <><Play className="h-4 w-4 mr-2 fill-white" /> Start Timer</>}
              </Button>
            </div>
          </div>
          {/* TOMBOL SIMPAN */}
          <div className="p-4 bg-white dark:bg-[#1f1e2e] border-t border-slate-200 dark:border-[#2a293d]">
            <Button 
              className="w-full bg-[#ff4b4b] hover:bg-red-700 h-12 font-bold shadow-xl/30"
              disabled={trialTimeMs === 0}
              onClick={() => {
                alert(`Berhasil! Waktu latihan Anda telah dicatat.`);
                closeTrialModal();
              }}
            >
              <Save className="mr-2 h-4 w-4" /> Simpan Hasil Uji
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function TrainingDetailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-white dark:bg-[#1f1e2e] text-slate-500 dark:text-slate-400 font-medium">Memuat Detail Latihan...</div>}>
      <TrainingDetailContent />
    </Suspense>
  )
}