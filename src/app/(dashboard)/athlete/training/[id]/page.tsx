"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Clock, Flame, Waves, Play, Square, Timer, Check, X, Save, AlertTriangle, Lightbulb, Target, Brain, Frown, FileWarning } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "program" // 'program' is pool, 'personal' is dryland
  
  // ==============================
  // STATE FLOATING TIMER
  // ==============================
  const [timeMs, setTimeMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // ==============================
  // STATE ROW STOPWATCH (TRIAL)
  // ==============================
  const [activeTrialItem, setActiveTrialItem] = useState<{ id: number, label: string, target: string } | null>(null)
  const [trialTimeMs, setTrialTimeMs] = useState(0)
  const [isTrialRunning, setIsTrialRunning] = useState(false)
  const trialTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  // ==============================
  // STATE: WHY GAP (FAILURE ANALYSIS)
  // ==============================
  const [whyGapModalOpen, setWhyGapModalOpen] = useState(false)
  const [whyGapItem, setWhyGapItem] = useState<{ id: number, label: string } | null>(null)
  const [whyGapReason, setWhyGapReason] = useState("")

  // ==============================
  // STATE: RPE POST-TRAINING
  // ==============================
  const [rpeModalOpen, setRpeModalOpen] = useState(false)
  const [rpeValue, setRpeValue] = useState(5)
  const coachTargetRPE = 8 // Dummy target from coach

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

  const openWhyGap = (item: any) => {
    setWhyGapItem(item)
    setWhyGapReason("")
    setWhyGapModalOpen(true)
  }

  const submitWhyGap = () => {
    if (whyGapItem) {
      // Mark as skipped/failed with reason (just visual simulation)
      setCheckedItems(prev => ({...prev, [whyGapItem.id]: true}))
    }
    setWhyGapModalOpen(false)
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
    const ms100 = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")
    return `${mins}:${secs}.${ms100}`
  }

  // Parse target "@ 1:50" to milliseconds for Ghost Training
  const getTargetMs = (target: string) => {
    const match = target.match(/(\d+):(\d+)/)
    if (match) {
      return (parseInt(match[1]) * 60 + parseInt(match[2])) * 1000
    }
    return 110000 // default 1:50
  }

  const activeTargetMs = activeTrialItem ? getTargetMs(activeTrialItem.target) : 100000
  const ghostProgress = Math.min((trialTimeMs / activeTargetMs) * 100, 100)

  return (
    <div className="flex flex-col h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-indigo-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#1e1b4b] dark:via-[#09090b] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Interactive Training" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        
        {/* Info Grid */}
        <div className="px-5 pt-4 pb-6 border-b border-slate-200 dark:border-[#2a293d]">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight uppercase font-heading tracking-wider">The Blue Mile 🐟</h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 mb-5">Coach: Albert (Elite Class)</p>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-indigo-500" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Distance</p><p className="text-sm font-semibold text-slate-900 dark:text-white">1,500 m</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#ff4b4b]" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Est. Duration</p><p className="text-sm font-semibold text-slate-900 dark:text-white">42 min</p></div>
            </div>
          </div>
        </div>

        {/* ==========================================
            TECHNIQUE ALERT (IMMEDIATE FEEDBACK)
            ========================================== */}
        <div className="px-4 py-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-4 flex gap-3 shadow-sm relative overflow-hidden">
            <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                Technique Insight
                <Badge className="bg-indigo-600 text-white border-none text-[8px] h-4 py-0 px-1">AI</Badge>
              </h3>
              <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed font-medium">
                Skor *Stroke* Anda saat ini 88%. Hari ini latihannya berfokus pada daya tahan (*endurance*), tapi pastikan Anda tetap menjaga posisi *High Elbow Catch* saat fase tarikan!
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            STRUKTUR TABEL (GROUP NAME | TARGET | TIME)
            ========================================== */}
        <div className="w-full px-4 space-y-6">
          {(type === 'personal' ? drylandSets : trainingSets).map((group, gIdx) => (
            <div key={gIdx} className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl overflow-hidden shadow-sm">
              
              {/* Header Kolom */}
              <div className="grid grid-cols-[10fr_4fr_5fr] bg-slate-100 dark:bg-secondary/50 px-4 py-3 border-b border-slate-200 dark:border-border">
                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{group.groupName}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Target</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Aksi</span>
              </div>
              
              {/* Baris Latihan */}
              {group.items.map((item, iIdx) => {
                const isChecked = checkedItems[item.id]
                return (
                  <div key={iIdx} className={`grid grid-cols-[10fr_4fr_5fr] items-center py-4 pl-4 pr-3 border-b last:border-b-0 border-slate-100 dark:border-border relative transition-colors ${isChecked ? 'bg-slate-50 dark:bg-secondary/20 opacity-60' : 'bg-white dark:bg-card'}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.color}`}></div>
                    
                    {/* Kolom 1: Nama Set */}
                    <div className="flex items-center pl-2">
                      <span className={`text-sm font-bold ${isChecked ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Kolom 2: Target */}
                    <div className="text-center text-[12px] font-bold text-slate-500">
                      {item.target}
                    </div>
                    
                    {/* Kolom 3: Aksi */}
                    <div className="flex justify-end items-center gap-2">
                      {type === 'program' ? (
                        <div className="text-[11px] font-bold uppercase tracking-wide">
                          {('athleteStatus' in item) && (item as any).athleteStatus === "Time" ? (
                            <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/50">{(item as any).athleteTime}</span>
                          ) : ('athleteStatus' in item) && (item as any).athleteStatus === "Skip" ? (
                            <span className="text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#161622] px-2 py-1 rounded border border-slate-200 dark:border-[#2a293d]">Skip</span>
                          ) : (
                            <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-200 dark:border-blue-800/50">Done</span>
                          )}
                        </div>
                      ) : (
                        <>
                          <Button 
                            onClick={() => openWhyGap(item)}
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 rounded-full text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                            title="Skip / Gagal"
                          >
                            <FileWarning className="h-4 w-4" />
                          </Button>

                          <Button 
                            onClick={() => setActiveTrialItem(item)}
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full border-red-200 text-[#ff4b4b] hover:bg-red-50 shadow-sm"
                          >
                            <Timer className="h-4 w-4" />
                          </Button>
                          
                          <div className="bg-slate-100 dark:bg-secondary p-1 rounded-md ml-1">
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

      {/* FIXED BOTTOM ACTION (FINISH TRAINING) */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <Button onClick={() => setRpeModalOpen(true)} className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30">
          <Check className="mr-2 h-4 w-4" /> Finish Training
        </Button>
      </div>


      {/* ==========================================
          MODAL STOPWATCH WITH GHOST TRAINING
          ========================================== */}
      <Dialog open={activeTrialItem !== null} onOpenChange={(open) => !open && closeTrialModal()}>
        <DialogContent className="max-w-md w-[95%] rounded-3xl bg-slate-950 p-0 overflow-hidden text-white border-slate-800">
          <DialogHeader className="p-4 bg-slate-900 border-b border-slate-800 relative">
            <Button variant="ghost" size="icon" onClick={closeTrialModal} className="absolute right-2 top-2 h-8 w-8 rounded-full text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-left text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" /> Ghost Training Mode
            </DialogTitle>
            <p className="text-left text-xl font-black text-white mt-1">{activeTrialItem?.label}</p>
          </DialogHeader>

          <div className="p-6">
            <div className="text-center mb-8">
              <div className="text-7xl font-mono font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {formatTime(trialTimeMs)}
              </div>
            </div>

            {/* Ghost Pacer Visual */}
            <div className="space-y-4 mb-8">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  <span>Ghost (Target {activeTrialItem?.target})</span>
                  <span>{formatTime(activeTargetMs)}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 transition-all duration-300" style={{ width: `${isTrialRunning ? ghostProgress + 10 : 0}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">
                  <span>You (Actual)</span>
                  <span>{formatTime(trialTimeMs)}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  <div className="h-full bg-indigo-500 transition-all duration-75" style={{ width: `${ghostProgress}%` }}></div>
                </div>
              </div>
            </div>

            <Button 
              onClick={toggleTrialTimer} 
              className={`w-full h-14 rounded-2xl font-black text-lg tracking-widest uppercase transition-all shadow-xl/50 ${isTrialRunning ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-950'}`}
            >
              {isTrialRunning ? 'Pause' : 'Start Trial'}
            </Button>
          </div>
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <Button 
              className="w-full bg-[#ff4b4b] hover:bg-red-600 text-white h-12 font-bold uppercase tracking-widest"
              disabled={trialTimeMs === 0}
              onClick={() => {
                alert(`Tercatat! Anda terpaut ${formatTime(Math.abs(trialTimeMs - activeTargetMs))} dari target.`);
                closeTrialModal();
              }}
            >
              <Save className="mr-2 h-4 w-4" /> Record Time
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      {/* ==========================================
          MODAL WHY GAP (FAILURE ANALYSIS)
          ========================================== */}
      <Dialog open={whyGapModalOpen} onOpenChange={setWhyGapModalOpen}>
        <DialogContent className="max-w-md w-[95%] rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-black uppercase text-slate-900 dark:text-white">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> Analisis Kegagalan
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
              Kenapa set <span className="font-bold text-slate-900 dark:text-white">{whyGapItem?.label}</span> tidak dituntaskan sesuai target? Data ini krusial untuk pelatih.
            </p>
            <div className="space-y-2">
              {['Kelelahan Fisik Ekstrem', 'Cidera Ringan / Sakit', 'Fokus Hilang (Mental Fatigue)', 'Kendala Teknis (Kram, Kacamata Air)'].map((reason) => (
                <div 
                  key={reason}
                  onClick={() => setWhyGapReason(reason)}
                  className={`p-3 rounded-xl border text-sm font-bold cursor-pointer transition-colors ${whyGapReason === reason ? 'border-[#ff4b4b] bg-red-50 text-[#ff4b4b] dark:bg-[#ff4b4b]/10' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-secondary/50'}`}
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitWhyGap} disabled={!whyGapReason} className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold uppercase tracking-widest h-12 rounded-xl">
              Simpan Analisis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==========================================
          MODAL RPE (RATE OF PERCEIVED EXERTION)
          ========================================== */}
      <Dialog open={rpeModalOpen} onOpenChange={setRpeModalOpen}>
        <DialogContent className="max-w-md w-[95%] rounded-3xl p-6 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-background border-indigo-100 dark:border-indigo-900">
          <DialogHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-2">
              <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <DialogTitle className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white text-center">
              RPE Sync
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <p className="text-xs font-medium text-center text-slate-600 dark:text-slate-300">
              Seberapa berat sesi latihan hari ini menurut fisik Anda?
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-black text-indigo-600 dark:text-indigo-400">
                {rpeValue}
              </div>
              <input 
                type="range" 
                min="1" max="10" 
                value={rpeValue} 
                onChange={(e) => setRpeValue(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="w-full flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                <span>1 (Sangat Ringan)</span>
                <span>10 (Maksimal)</span>
              </div>
            </div>

            <div className="bg-white dark:bg-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Target Pelatih</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">Level {coachTargetRPE}</p>
              </div>
              {rpeValue < coachTargetRPE - 2 ? (
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Underload</Badge>
              ) : rpeValue > coachTargetRPE + 1 ? (
                <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Overload</Badge>
              ) : (
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Optimal</Badge>
              )}
            </div>
            
            {rpeValue < coachTargetRPE - 2 && (
              <p className="text-[10px] text-amber-600 dark:text-amber-400 text-center font-medium bg-amber-50 dark:bg-amber-900/10 p-2 rounded-lg">
                Sepertinya latihan ini terlalu ringan untuk Anda. Hubungi pelatih untuk penyesuaian program.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => { alert("Data RPE tersimpan. Latihan selesai!"); router.back() }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest h-12 rounded-xl">
              Sync Data & Finish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function TrainingDetailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-[#fff5f5] dark:bg-background text-slate-500 dark:text-slate-400 font-medium">Memuat Detail Latihan...</div>}>
      <TrainingDetailContent />
    </Suspense>
  )
}