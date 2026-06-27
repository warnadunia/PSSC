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
      { id: 3, label: "4 × 100 Free", target: "@ 1:50", color: "bg-red-600", athleteStatus: "Time", athleteTime: "01:45" },
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
      { id: 13, label: "3 x 60s Plank", target: "1:00", color: "bg-red-500" },
      { id: 14, label: "3 x 20 Sit Up", target: "1:30", color: "bg-rose-500" }
    ]
  }
]

const dummyAthletes = [
  { id: "ath-1", name: "Bima Arya" },
  { id: "ath-2", name: "Rara Kirana" },
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
  
  // Data rekam waktu: { "ath-1": 15000, "ath-2": 16500 }
  const [recordedTimes, setRecordedTimes] = useState<Record<string, number>>({})
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

  const handleRecordTime = (athId: string) => {
    if (!recordedTimes[athId] && isTrialRunning) {
      setRecordedTimes(prev => ({ ...prev, [athId]: trialTimeMs }))
    }
  }

  const closeTrialModal = () => {
    if (trialTimerRef.current) clearInterval(trialTimerRef.current)
    setIsTrialRunning(false)
    setTrialTimeMs(0)
    setRecordedTimes({})
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
    <div className="flex flex-col h-[100dvh] bg-white w-full relative" suppressHydrationWarning>
      <GlobalHeader variant="subpage" title="Detail Latihan" />

      {/* Hero Image */}
      <div className="h-48 w-full bg-slate-800 relative shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1519315901367-f34fa16b63ee?q=80&w=800&auto=format&fit=crop" 
          alt="Coral Reef" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      <main className={`flex-1 overflow-y-auto w-full bg-white ${type === 'personal' ? 'pb-32' : 'pb-10'}`}>
        
        {/* Info Grid */}
        <div className="px-5 pt-2 pb-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">The Blue Mile 🐟</h1>
          <p className="text-xs font-medium text-slate-500 mt-1 mb-5">3 minutes ago</p>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-400" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Distance</p><p className="text-sm font-semibold text-slate-800">1,500 m</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-slate-400" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Duration</p><p className="text-sm font-semibold text-slate-800">42 min</p></div>
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
              <div className="grid grid-cols-[10fr_4fr_5fr] bg-slate-100/70 px-4 py-2 border-y border-slate-200 sticky top-0 z-10 shadow-sm">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{group.groupName}</span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Target</span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center pr-2">Waktu / Status</span>
              </div>
              
              {/* Baris Latihan */}
              {group.items.map((item, iIdx) => {
                const isChecked = checkedItems[item.id]
                return (
                  <div key={iIdx} className={`grid grid-cols-[10fr_4fr_5fr] items-center py-4 pl-4 pr-3 border-b border-slate-100 relative transition-colors ${isChecked ? 'bg-slate-50' : 'bg-white'}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color}`}></div>
                    
                    {/* Kolom 1: Nama Set */}
                    <div className="flex items-center pl-2">
                      <span 
                        onClick={() => {
                          if (type === 'personal') {
                            window.location.href = `${window.location.pathname}/movement/${item.id}`;
                          }
                        }}
                        className={`text-[14px] font-bold ${type === 'personal' ? 'cursor-pointer hover:text-red-500 hover:underline' : ''} ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Kolom 2: Target */}
                    <div className="text-center text-[13px] font-bold text-slate-500">
                      {item.target}
                    </div>
                    
                    {/* Kolom 3: Aksi (Stopwatch & Checkbox) / READONLY (Athlete) */}
                    <div className="flex justify-end items-center gap-3">
                      {type === 'program' ? (
                         <div className="text-[11px] font-bold uppercase tracking-wide">
                            {(item as any).athleteStatus === "Time" ? (
                              <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">{(item as any).athleteTime}</span>
                            ) : (item as any).athleteStatus === "Skip" ? (
                              <span className="text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">Skip</span>
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
                            className="h-8 w-8 rounded-full border-red-200 text-red-600 hover:bg-red-50 shadow-sm disabled:opacity-50"
                            disabled={isChecked} // Disable stopwatch jika sudah diceklis manual
                          >
                            <Timer className="h-4 w-4" />
                          </Button>
                          
                          <div className="bg-slate-100 p-1.5 rounded-lg">
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
        <DialogContent className="max-w-md w-[95%] rounded-3xl bg-slate-50 p-0 overflow-hidden">
          <DialogHeader className="p-4 bg-white border-b relative">
            <Button variant="ghost" size="icon" onClick={closeTrialModal} className="absolute right-2 top-2 h-8 w-8 rounded-full">
              <X className="h-4 w-4 text-slate-500" />
            </Button>
            <DialogTitle className="text-left text-sm font-bold text-slate-500 uppercase tracking-widest">
              Live Time Trial
            </DialogTitle>
            <p className="text-left text-xl font-black text-slate-900 mt-1">{activeTrialItem?.label}</p>
          </DialogHeader>

          <div className="p-4">
            {/* Display Timer Raksasa */}
            <div className="text-center mb-6">
              <div className="text-6xl font-mono font-black text-slate-900 tracking-tighter">
                {formatTime(trialTimeMs)}
              </div>
              <Button 
                onClick={toggleTrialTimer} 
                className={`mt-4 h-12 w-40 rounded-full font-bold text-sm shadow-lg ${isTrialRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isTrialRunning ? <><Square className="h-4 w-4 mr-2 fill-white" /> Pause Timer</> : <><Play className="h-4 w-4 mr-2 fill-white" /> Start Timer</>}
              </Button>
            </div>

            {/* List Atlet & Tombol Finish Individu */}
            <ScrollArea className="h-[250px] bg-white rounded-2xl border border-slate-200 p-2 shadow-inner">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Ketuk untuk merekam waktu atlet:</p>
                {dummyAthletes.map(ath => {
                  const hasFinished = recordedTimes[ath.id] !== undefined
                  return (
                    <div key={ath.id} className={`flex items-center justify-between p-3 rounded-xl border ${hasFinished ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                      <span className="text-sm font-bold text-slate-800">{ath.name}</span>
                      
                      {hasFinished ? (
                        <span className="font-mono text-emerald-700 font-bold text-sm bg-emerald-100 px-3 py-1 rounded-lg">
                          {formatTime(recordedTimes[ath.id])}
                        </span>
                      ) : (
                        <Button 
                          disabled={!isTrialRunning}
                          onClick={() => handleRecordTime(ath.id)}
                          className="h-8 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg px-4"
                        >
                          Finish
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
          {/* TOMBOL SIMPAN (Baru muncul/aktif jika ada data) */}
    <div className="p-4 bg-white border-t border-slate-100">
      <Button 
        className="w-full bg-red-600 hover:bg-red-700 h-12 font-bold shadow-md"
        disabled={Object.keys(recordedTimes).length === 0}
        onClick={() => {
          alert(`Berhasil! ${Object.keys(recordedTimes).length} rekam waktu atlet telah disimpan.`);
          closeTrialModal();
        }}
      >
        <Save className="mr-2 h-4 w-4" /> Simpan Hasil Uji
      </Button>
    </div>
        </DialogContent>
      </Dialog>

      {/* ==========================================
          FLOATING TIMER (KHUSUS MODE PERSONAL)
          ========================================== */}
      {type === "personal" && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-slate-900 p-2 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between z-50">
          <div className="pl-4">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Self Training</p>
            <p className="text-2xl font-mono font-bold text-white tracking-tight">{formatTime(timeMs)}</p>
          </div>
          <Button 
            onClick={toggleTimer} 
            className={`h-12 w-32 rounded-xl font-bold text-sm ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isRunning ? <><Square className="h-4 w-4 mr-2 fill-white" /> Pause</> : <><Play className="h-4 w-4 mr-2 fill-white" /> Start</>}
          </Button>
        </div>
      )}
    </div>
  )
}

export default function TrainingDetailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-white text-slate-500 font-medium">Memuat Detail Latihan...</div>}>
      <TrainingDetailContent />
    </Suspense>
  )
}