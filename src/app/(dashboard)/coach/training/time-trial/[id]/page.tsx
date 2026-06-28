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
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      <GlobalHeader variant="subpage" title="Live Time Trial" />

      <main className="flex-1 w-full pb-40">
        
        {/* Detail Gaya & Jarak */}
        <div className="bg-card p-5 border-b border-border flex justify-between items-center shadow-lg/30">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Kategori Lomba</p>
            <h2 className="text-xl font-black text-foreground uppercase tracking-widest">{jarak} Gaya {gaya}</h2>
          </div>
          <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <Flag className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Big Timer */}
        <div className="p-6 flex flex-col items-center bg-card mb-4 border-b border-border shadow-lg/30">
          <div className="text-7xl font-mono font-black text-foreground tracking-tighter mb-6">
            {formatTime(timeMs)}
          </div>

          <div className="flex gap-4 w-full max-w-sm">
            <Button 
              onClick={toggleTimer} 
              className={`flex-1 h-14 rounded-2xl font-bold text-sm shadow-lg uppercase tracking-widest ${isRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
            >
              {isRunning ? <><Square className="h-5 w-5 mr-2 fill-white" /> Pause</> : <><Play className="h-5 w-5 mr-2 fill-white" /> Start</>}
            </Button>

            <Button 
              onClick={recordSplit} 
              disabled={!isRunning}
              className="flex-1 h-14 rounded-2xl font-bold text-sm bg-muted hover:bg-muted/80 text-foreground disabled:opacity-50 uppercase tracking-widest shadow-lg/30"
            >
              <Timer className="h-5 w-5 mr-2" /> Catat Waktu
            </Button>
          </div>
        </div>

        {/* List Hasil Splis */}
        <div className="px-4">
          <h3 className="font-bold text-sm text-foreground uppercase tracking-widest mb-3">Waktu Tercatat ({splits.length})</h3>
          
          <div className="space-y-3">
            {splits.length === 0 ? (
              <div className="p-8 text-center bg-card rounded-2xl border-dashed border-2 border-border shadow-lg/30">
                <p className="text-xs font-medium text-muted-foreground">Belum ada waktu yang tercatat.</p>
              </div>
            ) : (
              splits.map((split, idx) => (
                <div key={split.id} className="bg-card p-3 rounded-2xl border border-border flex items-center justify-between gap-4 shadow-lg/30">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      #{idx + 1}
                    </div>
                    <span className="font-mono text-primary font-bold text-base bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                      {formatTime(split.time)}
                    </span>
                  </div>
                  
                  <select 
                    value={split.athleteId}
                    onChange={(e) => handleAssignAthlete(split.id, e.target.value)}
                    className="flex-1 bg-background border border-border rounded-lg text-xs p-2.5 text-foreground font-bold focus:outline-none focus:ring-1 focus:ring-primary"
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
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-card border-t border-border -[0_-4px_10px_rgba(0,0,0,0.2)] z-30 shadow-lg/30">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 h-14 font-bold rounded-xl text-base uppercase tracking-widest text-primary-foreground shadow-lg/30"
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
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-background text-muted-foreground font-medium uppercase tracking-widest">Memuat Time Trial...</div>}>
      <TimeTrialContent />
    </Suspense>
  )
}
