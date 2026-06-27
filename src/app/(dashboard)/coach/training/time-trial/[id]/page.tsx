"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Play, Square, Timer, Save, ChevronLeft, Flag } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const dummyAthletes = [
  { id: "ath-1", name: "Bima Arya" },
  { id: "ath-2", name: "Rara Kirana" },
  { id: "ath-3", name: "Sakti Mahesa" },
  { id: "ath-4", name: "Dinda Aulia" },
]

function TimeTrialContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const gaya = searchParams.get("gaya") || "Bebas"
  const jarak = searchParams.get("jarak") || "50M"

  const [timeMs, setTimeMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Splits: { id, time, athleteId }
  const [splits, setSplits] = useState<{ id: number, time: number, athleteId: string }[]>([])

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

  const recordSplit = () => {
    if (isRunning) {
      setSplits(prev => [...prev, { id: Date.now(), time: timeMs, athleteId: "" }])
    }
  }

  const handleAssignAthlete = (splitId: number, athleteId: string) => {
    setSplits(prev => prev.map(s => s.id === splitId ? { ...s, athleteId } : s))
  }

  useEffect(() => {
    return () => { 
      if (timerRef.current) clearInterval(timerRef.current) 
    }
  }, [])

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, "0")
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0")
    const millis = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")
    return `${mins}:${secs}.${millis}`
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 w-full relative" suppressHydrationWarning>
      <div className="h-14 px-4 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex-1">Live Time Trial</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full pb-24">
        
        {/* Detail Gaya & Jarak */}
        <div className="bg-white p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kategori Lomba</p>
            <h2 className="text-xl font-black text-slate-800">{jarak} Gaya {gaya}</h2>
          </div>
          <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
            <Flag className="h-6 w-6 text-red-600" />
          </div>
        </div>

        {/* Big Timer */}
        <div className="p-6 flex flex-col items-center bg-white shadow-sm mb-4">
          <div className="text-7xl font-mono font-black text-slate-900 tracking-tighter mb-6">
            {formatTime(timeMs)}
          </div>

          <div className="flex gap-4 w-full max-w-sm">
            <Button 
              onClick={toggleTimer} 
              className={`flex-1 h-14 rounded-2xl font-bold text-sm shadow-lg ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isRunning ? <><Square className="h-5 w-5 mr-2 fill-white" /> Pause</> : <><Play className="h-5 w-5 mr-2 fill-white" /> Start</>}
            </Button>

            <Button 
              onClick={recordSplit} 
              disabled={!isRunning}
              className="flex-1 h-14 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-lg disabled:opacity-50"
            >
              <Timer className="h-5 w-5 mr-2" /> Catat Waktu
            </Button>
          </div>
        </div>

        {/* List Hasil Splis */}
        <div className="px-4">
          <h3 className="font-bold text-sm text-slate-800 mb-3">Waktu Tercatat ({splits.length})</h3>
          
          <div className="space-y-3">
            {splits.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border-dashed border-2 border-slate-200">
                <p className="text-xs font-medium text-slate-400">Belum ada waktu yang tercatat.</p>
              </div>
            ) : (
              splits.map((split, idx) => (
                <div key={split.id} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      #{idx + 1}
                    </div>
                    <span className="font-mono text-emerald-700 font-bold text-base bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                      {formatTime(split.time)}
                    </span>
                  </div>
                  
                  <select 
                    value={split.athleteId}
                    onChange={(e) => handleAssignAthlete(split.id, e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg text-xs p-2.5 text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-red-500"
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
        </div>

      </main>

      {/* FOOTER ACTION */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-40">
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 h-14 font-bold shadow-md rounded-xl text-base"
          disabled={splits.length === 0 || splits.some(s => !s.athleteId)}
          onClick={() => {
            alert(`Berhasil! ${splits.length} rekam waktu atlet telah disimpan.`);
            router.back();
          }}
        >
          <Save className="mr-2 h-5 w-5" /> Simpan Hasil Time Trial
        </Button>
      </div>
    </div>
  )
}

export default function TimeTrialActivePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-white text-slate-500 font-medium">Memuat Time Trial...</div>}>
      <TimeTrialContent />
    </Suspense>
  )
}
