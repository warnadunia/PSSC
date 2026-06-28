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
      { id: 1, label: "1 × 300 Free", target: "@ 6:00", color: "bg-emerald-400" },
      { id: 2, label: "1 × 200 IM", target: "@ 4:00", color: "bg-emerald-400" }
    ]
  },
  {
    groupName: "MAIN SET",
    items: [
      { id: 3, label: "4 × 100 Free", target: "@ 1:50", color: "bg-red-600" },
      { id: 4, label: "4 × 50 Stroke", target: "@ 1:00", color: "bg-pink-400" }
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
  
  const [splits, setSplits] = useState<{ id: number, time: number, athleteId: string }[]>([])
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

  const recordTrialSplit = () => {
    if (isTrialRunning) {
      setSplits(prev => [...prev, { id: Date.now(), time: trialTimeMs, athleteId: "" }])
    }
  }

  const handleAssignTrialAthlete = (splitId: number, athleteId: string) => {
    setSplits(prev => prev.map(s => s.id === splitId ? { ...s, athleteId } : s))
  }

  const closeTrialModal = () => {
    if (trialTimerRef.current) clearInterval(trialTimerRef.current)
    setIsTrialRunning(false)
    setTrialTimeMs(0)
    setSplits([])
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
    const millis = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")
    return `${mins}:${secs}.${millis}`
  }

  return (
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      <GlobalHeader variant="subpage" title="Detail Latihan" />


      <main className={`flex-1 w-full ${type === 'personal' ? 'pb-32' : 'pb-10'}`}>
        
        {/* Info Grid */}
        <div className="px-5 pt-2 pb-6 border-b border-border bg-card shadow-xl/30">
          <h1 className="text-2xl font-bold text-foreground tracking-widest uppercase">The Blue Mile 🐟</h1>
          <p className="text-xs font-medium text-muted-foreground mt-1 mb-5">3 minutes ago</p>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div><p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Distance</p><p className="text-sm font-semibold text-foreground">1,500 m</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div><p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Duration</p><p className="text-sm font-semibold text-foreground">42 min</p></div>
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
              <div className="grid grid-cols-[10fr_4fr_5fr] bg-muted/50 px-4 py-2 border-y border-border sticky top-0 z-10 shadow-xl/30">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{group.groupName}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Target</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center pr-2">Waktu / Status</span>
              </div>
              
              {/* Baris Latihan */}
              {group.items.map((item, iIdx) => {
                const isChecked = checkedItems[item.id] || false
                return (
                  <div key={iIdx} className={`grid grid-cols-[10fr_4fr_5fr] items-center py-4 pl-4 pr-3 border-b border-border relative transition-colors ${isChecked ? 'bg-muted/30' : 'bg-card'}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color}`}></div>
                    
                    {/* Kolom 1: Nama Set */}
                    <div className="flex items-center pl-2">
                      <span 
                        onClick={() => {
                          if (type === 'personal') {
                            window.location.href = `${window.location.pathname}/movement/${item.id}`;
                          }
                        }}
                        className={`text-[14px] font-bold ${type === 'personal' ? 'cursor-pointer hover:text-primary hover:underline' : ''} ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Kolom 2: Target */}
                    <div className="text-center text-[13px] font-bold text-muted-foreground">
                      {item.target}
                    </div>
                    
                    {/* Kolom 3: Aksi (Stopwatch & Checkbox) */}
                    <div className="flex justify-end items-center gap-3">
                      <Button 
                        onClick={() => setActiveTrialItem(item)}
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full border-primary/20 text-primary hover:bg-primary/10 disabled:opacity-50 shadow-xl/30"
                        disabled={isChecked} // Disable stopwatch jika sudah diceklis manual
                      >
                        <Timer className="h-4 w-4" />
                      </Button>
                      
                      <div className="bg-background p-1.5 rounded-lg border border-border">
                        <Checkbox 
                          checked={isChecked}
                          onCheckedChange={(c) => setCheckedItems(prev => ({...prev, [item.id]: !!c}))}
                          className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
                        />
                      </div>
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
        <DialogContent className="max-w-md w-[95%] rounded-3xl bg-background p-0 overflow-hidden border border-border">
          <DialogHeader className="p-4 bg-card border-b border-border relative">
            <Button variant="ghost" size="icon" onClick={closeTrialModal} className="absolute right-2 top-2 h-8 w-8 rounded-full hover:bg-muted text-foreground">
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
            <DialogTitle className="text-left text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Live Time Trial
            </DialogTitle>
            <p className="text-left text-xl font-black text-foreground mt-1 uppercase tracking-widest">{activeTrialItem?.label}</p>
          </DialogHeader>

          <div className="p-4 bg-background">
            {/* Display Timer Raksasa */}
            <div className="text-center mb-6">
              <div className="text-6xl font-mono font-black text-foreground tracking-tighter">
                {formatTime(trialTimeMs)}
              </div>
              <div className="flex gap-3 mt-4 justify-center">
                <Button 
                  onClick={toggleTrialTimer} 
                  className={`h-12 w-32 rounded-full font-bold text-sm shadow-xl uppercase tracking-widest ${isTrialRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                >
                  {isTrialRunning ? <><Square className="h-4 w-4 mr-2 fill-white" /> Pause</> : <><Play className="h-4 w-4 mr-2 fill-white" /> Start</>}
                </Button>
                {type === 'program' && (
                  <Button 
                    onClick={recordTrialSplit} 
                    disabled={!isTrialRunning}
                    className="h-12 w-40 rounded-full font-bold text-sm bg-muted hover:bg-muted/80 text-foreground disabled:opacity-50 uppercase tracking-widest shadow-xl/30"
                  >
                    <Timer className="h-4 w-4 mr-2" /> Catat Waktu
                  </Button>
                )}
              </div>
            </div>

            {/* Jika type program, tampilkan lap splits. Jika personal, kosongkan saja karena waktu akhir sudah diwakili oleh timer. */}
            {type === 'program' && (
              <ScrollArea className="h-[250px] bg-card rounded-2xl border border-border p-3 shadow-xl/30">
                <div className="space-y-3">
                  {splits.length === 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-xs font-medium text-muted-foreground">Belum ada waktu yang tercatat.</p>
                    </div>
                  ) : (
                    splits.map((split, idx) => (
                      <div key={split.id} className="bg-background p-3 rounded-2xl border border-border flex items-center justify-between gap-3 shadow-xl/30">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                            #{idx + 1}
                          </div>
                          <span className="font-mono text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded border border-primary/20">
                            {formatTime(split.time)}
                          </span>
                        </div>
                        
                        <select 
                          value={split.athleteId}
                          onChange={(e) => handleAssignTrialAthlete(split.id, e.target.value)}
                          className="flex-1 min-w-0 bg-card border border-border rounded-lg text-[11px] p-2 text-foreground font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="" disabled>Pilih Atlet...</option>
                          {dummyAthletes.map(ath => (
                            <option key={ath.id} value={ath.id} disabled={splits.some(s => s.athleteId === ath.id && s.id !== split.id)}>
                              {ath.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
          {/* TOMBOL SIMPAN */}
          <div className="p-4 bg-card border-t border-border shadow-xl/30">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 h-12 font-bold uppercase tracking-widest text-primary-foreground rounded-xl shadow-xl/30"
              disabled={type === 'program' ? (splits.length === 0 || splits.some(s => !s.athleteId)) : (trialTimeMs === 0)}
              onClick={() => {
                if (type === 'program') {
                  alert(`Berhasil! ${splits.length} rekam waktu atlet telah disimpan.`);
                } else {
                  alert(`Berhasil! Waktu latihan personal telah dicatat.`);
                }
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
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-background text-muted-foreground uppercase tracking-widest font-medium">Memuat Detail Latihan...</div>}>
      <TrainingDetailContent />
    </Suspense>
  )
}