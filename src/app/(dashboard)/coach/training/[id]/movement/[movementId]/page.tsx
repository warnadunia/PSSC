"use client"

import { useState, useRef, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Play, Square, Save, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function MovementDetailPage({ params }: { params: Promise<{ id: string, movementId: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  
  // Basic mock data based on movementId
  const getMovementInfo = (id: string) => {
    switch(id) {
      case '11': 
        return { title: 'Hand Drill : Push Up', target: '3 x 30', timeTarget: '@ 02:00' };
      case '12': 
        return { title: 'Hand Drill : Pull Up', target: '3 x 15', timeTarget: '@ 02:30' };
      case '13': 
        return { title: 'Core Training : Plank', target: '3 x 60s', timeTarget: '@ 01:00' };
      case '14': 
        return { title: 'Core Training : Sit Up', target: '3 x 20', timeTarget: '@ 01:30' };
      default:
        return { title: 'Hand Drill : Push Up', target: '3 x 30', timeTarget: '@ 02:00' };
    }
  }

  const movementInfo = getMovementInfo(resolvedParams.movementId)

  // Stopwatch state
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
    return () => { 
      if (timerRef.current) clearInterval(timerRef.current) 
    }
  }, [])

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, "0")
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0")
    const centisecs = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")
    return `${mins}:${secs}.${centisecs}`
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 w-full" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex-1">{movementInfo.title}</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full">
        {/* Info Area */}
        <div className="bg-white px-5 py-6 mb-2 border-b border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">How to</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Lakukan gerakan dengan posisi tubuh lurus, mulai dari kepala hingga tumit. Turunkan tubuh hingga dada hampir menyentuh lantai, lalu dorong kembali ke posisi awal.
          </p>

          <h3 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-wide">Fungsi Latihan</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Meningkatkan kekuatan otot dada, bahu, dan trisep, serta memperkuat otot inti (core). Sangat penting untuk stabilitas gerakan tangan di dalam air.
          </p>
        </div>

        {/* Media Area */}
        <div className="bg-white p-5 mb-2 border-y border-slate-100 shadow-sm text-center">
          <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Video / Photo Tutorial</h3>
          <div className="w-full aspect-video bg-slate-800 rounded-xl overflow-hidden relative shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=800&auto=format&fit=crop" 
              alt="Push up tutorial" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Play className="h-6 w-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Target & Stopwatch Area */}
        <div className="bg-white p-6 border-t border-slate-100 shadow-sm flex flex-col items-center flex-1 pb-32">
          
          <div className="flex items-center justify-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200 mb-8 w-full max-w-sm">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target</p>
              <p className="text-lg font-black text-slate-800">{movementInfo.target}</p>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
              <p className="text-lg font-black text-slate-800">{movementInfo.timeTarget}</p>
            </div>
          </div>

          <div className="text-center w-full max-w-sm">
            <div className="text-7xl font-mono font-black text-slate-900 tracking-tighter mb-8 drop-shadow-sm">
              {formatTime(timeMs)}
            </div>

            <Button 
              onClick={toggleTimer} 
              className={`w-full h-16 rounded-2xl font-black text-lg shadow-lg transition-all duration-300 mb-4 ${
                isRunning 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25' 
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/25'
              }`}
            >
              {isRunning ? (
                <><Square className="h-5 w-5 mr-3 fill-white" /> PAUSE TIMER</>
              ) : (
                <><Play className="h-5 w-5 mr-3 fill-white" /> LAKUKAN SEKARANG</>
              )}
            </Button>

            <Button 
              variant="outline"
              disabled={timeMs === 0 || isRunning}
              onClick={() => {
                alert(`Waktu ${formatTime(timeMs)} berhasil disimpan!`);
                setTimeMs(0);
                router.back();
              }}
              className="w-full h-14 rounded-2xl font-bold text-slate-700 border-2 border-slate-200 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              SIMPAN Waktu
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}
