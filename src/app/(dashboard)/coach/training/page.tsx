"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { createPortal } from "react-dom"
import { useRouter, useSearchParams } from "next/navigation"
import { Play, Square, Timer, Check, X, Camera, MapPin, Users, Activity, Save, Award, ChevronRight, AlertTriangle, ShieldCheck, Heart, ArrowLeft, CheckSquare, RefreshCw } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

// ==========================================
// DUMMY DATA UNTUK ACTIVE TRAINING CONSOLE
// ==========================================
interface Athlete {
  id: string
  name: string
  classLevel: string
  attendance: "present" | "excused" | "absent" | "unmarked"
}

const initialAthletes: Athlete[] = [
  { id: "ath-1", name: "Bima Arya W.", classLevel: "Basic 2", attendance: "present" },
  { id: "ath-2", name: "Dinda Aulia", classLevel: "Basic 2", attendance: "present" },
  { id: "ath-3", name: "Sakti Mahesa", classLevel: "Basic 1", attendance: "present" },
  { id: "ath-4", name: "Kevin Sanjaya", classLevel: "Basic 1", attendance: "present" },
  { id: "ath-5", name: "Nadia Putri", classLevel: "Basic 1", attendance: "present" },
  { id: "ath-6", name: "Rara Kirana", classLevel: "Elite", attendance: "present" },
]

interface DrillItem {
  id: number
  label: string
  target: string
  needTimer: boolean
  color: string
}

interface ClassProgram {
  title: string
  drills: DrillItem[]
}

const classPrograms: Record<string, ClassProgram> = {
  "Basic 1": {
    title: "Koordinasi Gaya Bebas",
    drills: [
      { id: 1, label: "Warm-Up: 200M Free", target: "@ 4:30", needTimer: false, color: "bg-emerald-400" },
      { id: 2, label: "Kick Drill: 4x50M Free Kick", target: "@ 1:20", needTimer: true, color: "bg-[#ff4b4b]" },
      { id: 3, label: "Cool-Down: 100M Santai", target: "Bebas", needTimer: false, color: "bg-blue-400" }
    ]
  },
  "Basic 2": {
    title: "Endurance & Turn Efficiency",
    drills: [
      { id: 4, label: "Warm-Up: 300M IM", target: "@ 6:00", needTimer: false, color: "bg-emerald-400" },
      { id: 5, label: "Main Set: 4x100M Freestyle", target: "@ 1:50", needTimer: true, color: "bg-[#ff4b4b]" },
      { id: 6, label: "Stroke Drill: 4x50M Catch-Up", target: "@ 1:15", needTimer: true, color: "bg-pink-400" },
      { id: 7, label: "Cool-Down: 100M Backstroke", target: "Santai", needTimer: false, color: "bg-blue-400" }
    ]
  },
  "Elite": {
    title: "V02 Max & Threshold Swim",
    drills: [
      { id: 8, label: "Warm-Up: 400M Medley", target: "@ 8:00", needTimer: false, color: "bg-emerald-400" },
      { id: 9, label: "Threshold: 8x100M Free Pace", target: "@ 1:30", needTimer: true, color: "bg-[#ff4b4b]" },
      { id: 10, label: "Recovery: 200M Pull", target: "@ 4:00", needTimer: false, color: "bg-blue-400" }
    ]
  }
}

const scheduledClassesToday = [
  { level: "Basic 1", time: "15:30 - 17:30 WIB", athletesCount: 3 },
  { level: "Basic 2", time: "15:30 - 17:30 WIB", athletesCount: 2 },
  { level: "Elite", time: "16:30 - 18:30 WIB", athletesCount: 1 },
]

function ActiveTrainingConsole() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classesParam = searchParams.get("classes")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ==========================================
  // STATE NAVIGATION WORKFLOW
  // steps: "select-classes" | "attendance" | "active-session"
  // ==========================================
  const [step, setStep] = useState<"select-classes" | "attendance" | "active-session">("select-classes")

  // ==========================================
  // STATE 1: MULTI-CLASS SELECTION
  // ==========================================
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["Basic 1", "Basic 2"])

  useEffect(() => {
    if (classesParam) {
      const parsed = classesParam.split(",")
      setSelectedClasses(parsed)
      setStep("attendance")
    }
  }, [classesParam])

  // ==========================================
  // STATE 2: ATTENDANCE LOG
  // ==========================================
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes)

  // ==========================================
  // STATE 3: PARALLEL TIMERS (Dual Stopwatch)
  // ==========================================
  const [timer1, setTimer1] = useState(0)
  const [isT1Running, setIsT1Running] = useState(false)
  const t1Ref = useRef<NodeJS.Timeout | null>(null)

  const [timer2, setTimer2] = useState(0)
  const [isT2Running, setIsT2Running] = useState(false)
  const t2Ref = useRef<NodeJS.Timeout | null>(null)

  // Track checked drills per class
  const [checkedDrills, setCheckedDrills] = useState<Record<number, boolean>>({})

  // ==========================================
  // STATE 4: STOPWATCH LOG MODAL POP-UP
  // ==========================================
  interface LapLog {
    id: string
    time: number
    athleteId: string
  }

  const [activeSWDrill, setActiveSWDrill] = useState<DrillItem | null>(null)
  const [activeSWClass, setActiveSWClass] = useState<string>("")
  const [swTimer, setSwTimer] = useState(0)
  const [isSwRunning, setIsSwRunning] = useState(false)
  const swIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [lapLogs, setLapLogs] = useState<LapLog[]>([])

  // ==========================================
  // CLEAN UP TIMERS ON UNMOUNT
  // ==========================================
  useEffect(() => {
    return () => {
      if (t1Ref.current) clearInterval(t1Ref.current)
      if (t2Ref.current) clearInterval(t2Ref.current)
      if (swIntervalRef.current) clearInterval(swIntervalRef.current)
    }
  }, [])

  // ==========================================
  // ACTIONS: CLASS SELECTOR TABS
  // ==========================================
  const handleToggleClass = (level: string) => {
    setSelectedClasses(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    )
  }

  // ==========================================
  // ACTIONS: ATTENDANCE TAPPER
  // ==========================================
  const toggleAttendance = (athId: string) => {
    setAthletes(prev => prev.map(ath => {
      if (ath.id === athId) {
        let next: "present" | "excused" | "absent" = "present"
        if (ath.attendance === "present") next = "excused"
        else if (ath.attendance === "excused") next = "absent"
        else if (ath.attendance === "absent") next = "present"
        return { ...ath, attendance: next }
      }
      return ath
    }))
  }

  // ==========================================
  // ACTIONS: PARALLEL TIMERS CONTROLLERS
  // ==========================================
  const toggleTimer1 = () => {
    if (isT1Running) {
      if (t1Ref.current) clearInterval(t1Ref.current)
      setIsT1Running(false)
    } else {
      setIsT1Running(true)
      const start = Date.now() - timer1
      t1Ref.current = setInterval(() => setTimer1(Date.now() - start), 10)
    }
  }

  const toggleTimer2 = () => {
    if (isT2Running) {
      if (t2Ref.current) clearInterval(t2Ref.current)
      setIsT2Running(false)
    } else {
      setIsT2Running(true)
      const start = Date.now() - timer2
      t2Ref.current = setInterval(() => setTimer2(Date.now() - start), 10)
    }
  }

  const resetTimer1 = () => {
    if (t1Ref.current) clearInterval(t1Ref.current)
    setIsT1Running(false)
    setTimer1(0)
  }

  const resetTimer2 = () => {
    if (t2Ref.current) clearInterval(t2Ref.current)
    setIsT2Running(false)
    setTimer2(0)
  }

  const formatTimer = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, "0")
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0")
    const ms100 = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")
    return `${mins}:${secs}.${ms100}`
  }

  // ==========================================
  // ACTIONS: POP-UP STOPWATCH LOGGER ENGINE
  // ==========================================
  const openStopwatchPopup = (drill: DrillItem, classLevel: string) => {
    setActiveSWDrill(drill)
    setActiveSWClass(classLevel)
    setSwTimer(0)
    setIsSwRunning(false)
    setLapLogs([])
  }

  const toggleSWTimer = () => {
    if (isSwRunning) {
      if (swIntervalRef.current) clearInterval(swIntervalRef.current)
      setIsSwRunning(false)
    } else {
      setIsSwRunning(true)
      const start = Date.now() - swTimer
      swIntervalRef.current = setInterval(() => setSwTimer(Date.now() - start), 10)
    }
  }

  const resetSWTimer = () => {
    if (swIntervalRef.current) clearInterval(swIntervalRef.current)
    setIsSwRunning(false)
    setSwTimer(0)
    setLapLogs([])
  }

  const recordLapLog = () => {
    if (swTimer > 0) {
      const newId = Math.random().toString(36).substring(2, 9)
      setLapLogs(prev => [...prev, { id: newId, time: swTimer, athleteId: "" }])
    }
  }

  const removeLapLog = (logId: string) => {
    setLapLogs(prev => prev.filter(log => log.id !== logId))
  }

  const assignAthleteToLog = (logId: string, athleteId: string) => {
    setLapLogs(prev => prev.map(log => {
      if (log.id === logId) {
        return { ...log, athleteId }
      }
      return log
    }))
  }

  const saveSWData = () => {
    if (activeSWDrill) {
      setCheckedDrills(prev => ({ ...prev, [activeSWDrill.id]: true }))
      // Clean up timer
      if (swIntervalRef.current) clearInterval(swIntervalRef.current)
      setIsSwRunning(false)
      setActiveSWDrill(null)
      alert("Catatan waktu berhasil disimpan untuk atlet!")
    }
  }

  const closeSWPopup = () => {
    if (swIntervalRef.current) clearInterval(swIntervalRef.current)
    setIsSwRunning(false)
    setActiveSWDrill(null)
  }

  // Filter athletes matching selected classes
  const activeClassAthletes = athletes.filter(a => selectedClasses.includes(a.classLevel))

  // Filter present athletes for the active stopwatch popup class
  const presentAthletesForSW = athletes.filter(
    a => a.classLevel === activeSWClass && a.attendance === "present"
  )

  // Finish session
  const finishSession = () => {
    alert("Sesi Latihan bersama berhasil diselesaikan dan waktu tercatat ke server.")
    router.push("/coach/mypage")
  }

  // ==========================================
  // RENDERING: STEP 1 - CHOOSE CLASSES TO TRAIN
  // ==========================================
  if (step === "select-classes") {
    return (
      <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
        <GlobalHeader variant="pages" title="Training Center" />
        
        <main className="flex-1 p-4 md:px-6 pt-5 pb-28 space-y-6 max-w-md mx-auto w-full">
          <div className="text-center space-y-1">
            <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Pilih Kelas Latihan</h1>
            <p className="text-xs text-muted-foreground font-medium">Pilih satu atau lebih kelas yang akan dilatih bersamaan hari ini.</p>
          </div>

          <Card className="border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-4 bg-slate-50 dark:bg-secondary/40 border-b border-border/50">
              <CardTitle className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#ff4b4b]" /> Jadwal Kelas Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {scheduledClassesToday.map((c) => {
                const isChecked = selectedClasses.includes(c.level)
                return (
                  <div 
                    key={c.level} 
                    onClick={() => handleToggleClass(c.level)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      isChecked ? 'bg-[#ff4b4b]/5 border-[#ff4b4b]/30 text-slate-950 dark:text-white' : 'bg-background border-slate-200 dark:border-border hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        id={`class-${c.level}`}
                        checked={isChecked}
                        onCheckedChange={() => {}} 
                        className="h-5 w-5 data-[state=checked]:bg-[#ff4b4b] data-[state=checked]:border-[#ff4b4b]"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-white">Kelas {c.level}</h3>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{c.time} • {c.athletesCount} Atlet</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Button 
            disabled={selectedClasses.length === 0}
            onClick={() => setStep("attendance")}
            className="w-full h-14 bg-[#ff4b4b] hover:bg-[#ff4b4b]/90 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg disabled:opacity-50"
          >
            Lanjut ke Absensi Atlet <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </main>
      </div>
    )
  }

  // ==========================================
  // RENDERING: STEP 2 - ATHLETES ATTENDANCE
  // ==========================================
  if (step === "attendance") {
    return (
      <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
        <GlobalHeader variant="pages" title="Training Center" />
        
        <main className="flex-1 p-4 md:px-6 pt-5 pb-28 space-y-6 max-w-md mx-auto w-full">
          
          <button 
            onClick={() => setStep("select-classes")}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-[#ff4b4b] transition-all uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" /> Ubah Pilihan Kelas
          </button>

          <div>
            <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Presensi Atlet</h1>
            <p className="text-xs text-muted-foreground font-medium mt-1">Tap kartu atlet untuk mencatat status kehadiran mereka.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeClassAthletes.map(ath => (
              <div 
                key={ath.id}
                onClick={() => toggleAttendance(ath.id)}
                className={`p-3 border rounded-2xl cursor-pointer transition-all flex flex-col items-center text-center justify-between h-28 relative ${
                  ath.attendance === 'present' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400 font-bold' :
                  ath.attendance === 'excused' ? 'bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-400 font-bold' :
                  ath.attendance === 'absent' ? 'bg-rose-500/10 border-rose-500/40 text-rose-700 dark:text-rose-400 font-bold' :
                  'bg-white dark:bg-card border-slate-200 dark:border-border text-slate-700 dark:text-white'
                }`}
              >
                <div className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full ${
                  ath.attendance === 'present' ? 'bg-emerald-500' :
                  ath.attendance === 'excused' ? 'bg-blue-500' :
                  ath.attendance === 'absent' ? 'bg-rose-500' :
                  'bg-slate-300 dark:bg-slate-700'
                }`} />
                
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-secondary flex items-center justify-center font-bold text-xs uppercase text-slate-500 border border-border">
                  {ath.name.charAt(0)}
                </div>
                
                <div>
                  <h3 className="text-xs font-bold truncate max-w-[130px]">{ath.name}</h3>
                  <p className="text-[9px] text-muted-foreground mt-0.5">{ath.classLevel}</p>
                </div>

                <span className="text-[8px] font-black uppercase tracking-wider">
                  {ath.attendance === 'present' ? "Hadir" :
                   ath.attendance === 'excused' ? "Ijin" :
                   ath.attendance === 'absent' ? "Absen" :
                   "Tap Absen"}
                </span>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => setStep("active-session")}
            className="w-full h-14 bg-[#ff4b4b] hover:bg-[#ff4b4b]/90 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg mt-4"
          >
            <Play className="h-5 w-5 mr-2 fill-white" /> Mulai Sesi Latihan Gabungan
          </Button>
        </main>
      </div>
    )
  }

  // ==========================================
  // RENDERING: STEP 3 - ACTIVE POOLDECK WORKSPACE
  // ==========================================
  const firstClass = selectedClasses[0] || "Basic 1"
  const secondClass = selectedClasses[1]

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
      <GlobalHeader variant="subpage" title="Sesi Kolam Aktif" />
      
      <main className="flex-1 w-full pb-48">
        
        {/* Dynamic Class Tabs */}
        <Tabs defaultValue="lane1" className="w-full">
          <TabsList className={`w-full grid ${secondClass ? 'grid-cols-2' : 'grid-cols-1'} bg-slate-900 px-1 py-0 rounded-none h-14 sticky top-14 z-20 shadow-md`}>
            <TabsTrigger value="lane1" className="text-xs py-3.5 data-[state=active]:bg-white dark:bg-[#1f1e2e] text-slate-400 data-[state=active]:text-[#ff4b4b] data-[state=active]: font-bold transition-all rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff4b4b]">
              Kelas {firstClass}
            </TabsTrigger>
            {secondClass && (
              <TabsTrigger value="lane2" className="text-xs py-3.5 data-[state=active]:bg-white dark:bg-[#1f1e2e] text-slate-400 data-[state=active]:text-[#ff4b4b] data-[state=active]: font-bold transition-all rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff4b4b]">
                Kelas {secondClass}
              </TabsTrigger>
            )}
          </TabsList>

          {/* TAB COLUMN 1: FIRST SELECTED CLASS */}
          <TabsContent value="lane1" className="p-4 space-y-5 outline-none">
            
            {/* Lane 1 Stopwatch Console */}
            <Card className="border-none bg-slate-950 text-white rounded-3xl overflow-hidden shadow-lg">
              <CardContent className="p-5 flex flex-col items-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-[#ff4b4b]" /> Stopwatch Kelas {firstClass}
                </p>
                <div className="text-5xl font-mono font-black text-white tracking-tighter mb-4">
                  {formatTimer(timer1)}
                </div>
                <div className="flex gap-3 w-full">
                  <Button 
                    onClick={toggleTimer1}
                    className={`flex-1 h-11 text-xs font-bold uppercase tracking-wider rounded-xl ${isT1Running ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-950'}`}
                  >
                    {isT1Running ? "Pause" : "Start"}
                  </Button>
                  <Button 
                    onClick={resetTimer1}
                    variant="outline"
                    className="border-slate-800 text-slate-400 hover:text-white h-11 w-20 text-xs font-bold uppercase tracking-wider rounded-xl"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Drills List for First Class */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-muted-foreground mb-1">
                Fokus Sesi: {classPrograms[firstClass]?.title || "Materi Umum"}
              </h3>
              
              {(classPrograms[firstClass]?.drills || []).map((drill) => {
                const isChecked = checkedDrills[drill.id] || false
                return (
                  <Card 
                    key={drill.id} 
                    className={`border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-2xl overflow-hidden relative transition-colors ${isChecked ? 'bg-slate-50 dark:bg-secondary/20 opacity-60' : ''}`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${drill.color}`}></div>
                    <CardContent className="p-4 pl-6 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className={`text-xs font-bold uppercase tracking-wide truncate ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                          {drill.label}
                        </h4>
                        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Target: {drill.target}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        {drill.needTimer ? (
                          <Button 
                            size="sm"
                            onClick={() => openStopwatchPopup(drill, firstClass)}
                            className="bg-[#ff4b4b] hover:bg-[#ff4b4b]/95 text-white text-[10px] font-bold uppercase tracking-wider h-8 rounded-lg px-2.5 shadow-sm"
                          >
                            <Timer className="h-3.5 w-3.5 mr-1" /> Stopwatch
                          </Button>
                        ) : (
                          <Checkbox 
                            checked={isChecked}
                            onCheckedChange={(checked: any) => setCheckedDrills(prev => ({ ...prev, [drill.id]: !!checked }))}
                            className="h-6 w-6 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

          </TabsContent>

          {/* TAB COLUMN 2: SECOND SELECTED CLASS */}
          {secondClass && (
            <TabsContent value="lane2" className="p-4 space-y-5 outline-none">
              
              {/* Lane 2 Stopwatch Console */}
              <Card className="border-none bg-slate-950 text-white rounded-3xl overflow-hidden shadow-lg">
                <CardContent className="p-5 flex flex-col items-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <Activity className="h-3 w-3 text-[#ff4b4b]" /> Stopwatch Kelas {secondClass}
                  </p>
                  <div className="text-5xl font-mono font-black text-white tracking-tighter mb-4">
                    {formatTimer(timer2)}
                  </div>
                  <div className="flex gap-3 w-full">
                    <Button 
                      onClick={toggleTimer2}
                      className={`flex-1 h-11 text-xs font-bold uppercase tracking-wider rounded-xl ${isT2Running ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-950'}`}
                    >
                      {isT2Running ? "Pause" : "Start"}
                    </Button>
                    <Button 
                      onClick={resetTimer2}
                      variant="outline"
                      className="border-slate-800 text-slate-400 hover:text-white h-11 w-20 text-xs font-bold uppercase tracking-wider rounded-xl"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Drills List for Second Class */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-muted-foreground mb-1">
                  Fokus Sesi: {classPrograms[secondClass]?.title || "Materi Umum"}
                </h3>
                
                {(classPrograms[secondClass]?.drills || []).map((drill) => {
                  const isChecked = checkedDrills[drill.id] || false
                  return (
                    <Card 
                      key={drill.id} 
                      className={`border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-2xl overflow-hidden relative transition-colors ${isChecked ? 'bg-slate-50 dark:bg-secondary/20 opacity-60' : ''}`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${drill.color}`}></div>
                      <CardContent className="p-4 pl-6 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className={`text-xs font-bold uppercase tracking-wide truncate ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                            {drill.label}
                          </h4>
                          <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Target: {drill.target}</p>
                        </div>
                        
                        <div className="flex items-center gap-3 shrink-0">
                          {drill.needTimer ? (
                            <Button 
                              size="sm"
                              onClick={() => openStopwatchPopup(drill, secondClass)}
                              className="bg-[#ff4b4b] hover:bg-[#ff4b4b]/95 text-white text-[10px] font-bold uppercase tracking-wider h-8 rounded-lg px-2.5 shadow-sm"
                            >
                              <Timer className="h-3.5 w-3.5 mr-1" /> Stopwatch
                            </Button>
                          ) : (
                            <Checkbox 
                              checked={isChecked}
                              onCheckedChange={(checked: any) => setCheckedDrills(prev => ({ ...prev, [drill.id]: !!checked }))}
                              className="h-6 w-6 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                            />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

            </TabsContent>
          )}
        </Tabs>

      </main>

      {/* ==========================================
          STOPWATCH LOG MODAL POP-UP (TIMED DRILLS)
          ========================================== */}
      {activeSWDrill && isMounted && createPortal(
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-card w-full max-w-md rounded-none sm:rounded-3xl border-0 sm:border border-slate-200 dark:border-border overflow-hidden h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-250">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-50 dark:bg-secondary/40 border-b border-border/50 flex justify-between items-center shrink-0">
              <div>
                <span className="text-[9px] font-black text-[#ff4b4b] uppercase tracking-wider">
                  Stopwatch Kelas {activeSWClass}
                </span>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase truncate max-w-[250px]">
                  {activeSWDrill.label}
                </h3>
              </div>
              <button 
                onClick={closeSWPopup} 
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable logs list at the top */}
            <ScrollArea className="flex-1 p-5 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1 mb-1">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Log Urutan Finish ({lapLogs.length})
                  </h4>
                  <span className="text-[9px] font-medium text-muted-foreground">Pilih atlet sesuai urutan finish</span>
                </div>

                {lapLogs.length > 0 ? (
                  <div className="space-y-2.5">
                    {lapLogs.map((log, index) => {
                      const isAlreadyAssigned = (athId: string, currentLogId: string) => {
                        return lapLogs.some(l => l.athleteId === athId && l.id !== currentLogId)
                      }
                      
                      return (
                        <div 
                          key={log.id} 
                          className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-border/50 rounded-2xl gap-3"
                        >
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                            <span className="font-mono font-bold text-xs bg-slate-250 dark:bg-secondary text-slate-800 dark:text-white px-2 py-1 rounded-lg">
                              {formatTimer(log.time)}
                            </span>
                          </div>
                          
                          {/* Dropdown Selector for Athletes */}
                          <div className="flex-1 min-w-[130px]">
                            <select
                              value={log.athleteId}
                              onChange={(e) => assignAthleteToLog(log.id, e.target.value)}
                              className="w-full h-9 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl text-xs px-2.5 font-bold outline-none text-slate-700 dark:text-white"
                            >
                              <option value="">-- Pilih Atlet --</option>
                              {presentAthletesForSW.map(ath => (
                                <option 
                                  key={ath.id} 
                                  value={ath.id}
                                  disabled={isAlreadyAssigned(ath.id, log.id)}
                                >
                                  {ath.name} {isAlreadyAssigned(ath.id, log.id) ? " (Sudah)" : ""}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Delete Log Button */}
                          <button 
                            onClick={() => removeLapLog(log.id)}
                            className="p-1 rounded-full hover:bg-rose-150 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                          >
                            <X className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-slate-50 dark:bg-secondary/20 rounded-2xl border border-dashed border-slate-250 dark:border-border/50">
                    <p className="text-xs font-semibold text-slate-400 dark:text-muted-foreground">Belum ada log waktu. Ketuk tombol &quot;TAP / SENTUH DINDING&quot; di bawah saat atlet sampai.</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Controls Panel: Fixed at bottom */}
            <div className="p-5 border-t border-border bg-slate-50/50 dark:bg-[#1a1926] shrink-0 space-y-4">
              
              {/* GIANT TAP LOG BUTTON */}
              <Button 
                disabled={!isSwRunning}
                onClick={recordLapLog}
                className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-40 disabled:scale-100"
              >
                ⏱️ TAP / SENTUH DINDING
              </Button>

              {/* Running Time Display */}
              <div className="flex items-center justify-between p-4 bg-slate-950 text-white rounded-2xl shadow-inner border border-slate-900">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                    Waktu Berjalan
                  </span>
                  <div className="text-2xl font-mono font-black tracking-tight text-white select-none">
                    {formatTimer(swTimer)}
                  </div>
                </div>
                
                {/* Controller Buttons inline */}
                <div className="flex gap-2">
                  <Button 
                    onClick={toggleSWTimer}
                    size="sm"
                    className={`h-9 px-4 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                      isSwRunning ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-950'
                    }`}
                  >
                    {isSwRunning ? "Pause" : "Start"}
                  </Button>
                  <Button 
                    onClick={resetSWTimer}
                    variant="outline"
                    size="sm"
                    className="border-slate-800 text-slate-400 hover:text-white h-9 px-3 text-[10px] font-bold uppercase tracking-wider rounded-lg"
                  >
                    Reset
                  </Button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 pb-safe pb-6 border-t border-border bg-slate-50 dark:bg-secondary/20 flex gap-3 shrink-0">
              <Button 
                variant="outline" 
                onClick={closeSWPopup}
                className="flex-1 h-12 text-xs font-bold uppercase tracking-wider rounded-xl"
              >
                Batal
              </Button>
              <Button 
                onClick={saveSWData}
                className="flex-1 h-12 text-xs font-bold uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl"
              >
                <Check className="h-4 w-4 mr-1.5" /> Simpan Waktu
              </Button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* ==========================================
          FIXED BOTTOM PANEL FOR FINISHING SESSION
          ========================================== */}
      <div className="fixed bottom-16 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={finishSession} 
            className="w-full h-12 text-xs font-bold uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-xl flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" /> Selesaikan Sesi Latihan
          </Button>
        </div>
      </div>

    </div>
  )
}

export default function ActiveTrainingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs text-slate-500 font-medium uppercase tracking-widest">Memuat Konsol Latihan...</div>}>
      <ActiveTrainingConsole />
    </Suspense>
  )
}