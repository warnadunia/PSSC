"use client"

import { useRouter, useParams } from "next/navigation"
import { Play, Square, ChevronLeft, Info, AlertTriangle, Timer, Activity, Zap } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const dummyMovements: Record<string, any> = {
  "11": { title: "Push Up", type: "Hand Drill", target: "3 x 30", focus: ["Pectoralis", "Triceps", "Core"], warn: "Jaga punggung tetap lurus, jangan biarkan pinggul turun." },
  "12": { title: "Pull Up", type: "Hand Drill", target: "3 x 15", focus: ["Latissimus Dorsi", "Biceps", "Grip"], warn: "Gunakan otot punggung untuk menarik, jangan mengayun (kipping)." },
  "13": { title: "Plank", type: "Core Training", target: "3 x 60s", focus: ["Transverse Abdominis", "Lower Back"], warn: "Jangan menahan napas. Bernapas konstan selama menahan beban." },
  "14": { title: "Sit Up", type: "Core Training", target: "3 x 20", focus: ["Rectus Abdominis", "Hip Flexors"], warn: "Tarik tubuh dengan otot perut, jangan tarik leher Anda ke depan." },
}

export default function MovementDetailPage() {
  const router = useRouter()
  const params = useParams()
  const movementId = params?.movementId as string
  
  const data = dummyMovements[movementId] || { title: "Gerakan Latihan", type: "Personal", target: "N/A", focus: [], warn: "" }
  
  // Timer state for static holds like plank
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

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, "0")
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-transparent relative z-0" suppressHydrationWarning>
      <GlobalHeader variant="subpage" title="Movement Detail" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        {/* ==========================================
            VIDEO PLAYER MOCKUP (TOP)
            ========================================== */}
        <div className="w-full aspect-video bg-black relative flex items-center justify-center overflow-hidden">
          {/* Mockup visual for a video thumbnail / player */}
          <div className="absolute inset-0 bg-slate-900 opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          <div className="z-10 flex flex-col items-center">
            <Button variant="ghost" size="icon" className="h-16 w-16 rounded-full border-2 border-white/30 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md">
              <Play className="h-8 w-8 ml-1" />
            </Button>
            <p className="text-white font-bold tracking-widest text-[10px] uppercase mt-4 opacity-70">Tap to Play Demo</p>
          </div>
          
          <Badge className="absolute top-4 left-4 bg-[#ff4b4b] text-white border-none uppercase tracking-widest text-[9px] font-black">
            {data.type}
          </Badge>
        </div>

        {/* ==========================================
            INFO HEADER
            ========================================== */}
        <div className="px-5 pt-5 pb-6 border-b border-slate-200 dark:border-border/50">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{data.title}</h1>
          </div>
          <div className="flex items-center gap-2 mb-6 text-[#ff4b4b]">
            <Activity className="h-5 w-5" />
            <p className="text-sm font-bold uppercase tracking-widest">Target: {data.target}</p>
          </div>

          <div className="space-y-4">
            {/* Muscle Focus */}
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Zap className="h-3 w-3" /> Muscle Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {data.focus.map((muscle: string) => (
                  <Badge key={muscle} variant="outline" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 uppercase text-[10px] tracking-wide">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Common Mistakes Alert */}
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3 flex gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-amber-800 dark:text-amber-500 uppercase tracking-widest mb-1">Common Mistake</p>
                <p className="text-xs font-medium text-amber-900/80 dark:text-amber-400/80 leading-relaxed">
                  {data.warn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SMART TIMER (IF NEEDED)
            ========================================== */}
        <div className="px-5 py-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Timer className="h-3 w-3" /> Workout Timer
          </p>
          <Card className="bg-white dark:bg-card/60 backdrop-blur-md border border-slate-200 dark:border-border/50 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="text-6xl font-mono font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                {formatTime(timeMs)}
              </div>
              <div className="flex gap-4 w-full max-w-[200px]">
                <Button 
                  onClick={toggleTimer} 
                  className={`flex-1 h-12 rounded-full font-bold uppercase tracking-widest ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#ff4b4b] hover:bg-red-700'} text-white shadow-xl/30`}
                >
                  {isRunning ? <Square className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
                </Button>
                <Button 
                  onClick={() => {
                    setIsRunning(false)
                    if (timerRef.current) clearInterval(timerRef.current)
                    setTimeMs(0)
                  }}
                  variant="outline"
                  className="h-12 w-12 rounded-full border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100"
                >
                  <Timer className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  )
}
