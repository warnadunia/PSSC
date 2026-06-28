"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Clock, Activity, ArrowRight } from "lucide-react"

export default function SleepTrackerPage() {
  const router = useRouter()
  const [isSleeping, setIsSleeping] = useState(false)
  const [sleepStart, setSleepStart] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState("00:00:00")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSleeping && sleepStart) {
      interval = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - sleepStart.getTime()
        
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        )
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSleeping, sleepStart])

  const toggleSleep = () => {
    if (!isSleeping) {
      setIsSleeping(true)
      setSleepStart(new Date())
    } else {
      // Wake up
      setIsSleeping(false)
      alert(`Selamat pagi! Anda tidur selama ${elapsedTime}. Data Readiness Anda telah diupdate.`)
      router.back()
    }
  }

  return (
    <div className={`flex flex-col min-h-[100dvh] w-full relative transition-colors duration-1000 ${isSleeping ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 dark:bg-background text-slate-900 dark:text-foreground'} font-sans z-0`}>
      
      {!isSleeping && (
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-indigo-100 via-slate-50 to-slate-50 dark:from-indigo-950/50 dark:via-background dark:to-transparent -z-10 pointer-events-none"></div>
      )}

      {/* When sleeping, hide the header to make it fully immersive, or just use a custom simple header */}
      {isSleeping ? (
        <div className="h-16 flex items-center px-4 justify-between pt-safe">
          <div className="w-10"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Sleep Mode</p>
          <div className="w-10"></div>
        </div>
      ) : (
        <GlobalHeader variant="subpage" title="Sleep Recovery" />
      )}

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 flex flex-col items-center justify-center relative">
        
        {/* Sleeping Stars Animation */}
        {isSleeping && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
            <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-[30%] left-[80%] w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-150"></div>
            <div className="absolute top-[80%] left-[70%] w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
          </div>
        )}

        <div className="text-center mb-12 relative z-10">
          <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-1000 ${isSleeping ? 'bg-indigo-900/50 shadow-[0_0_50px_rgba(49,46,129,0.5)]' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
            {isSleeping ? (
              <Moon className="h-16 w-16 text-indigo-300 animate-pulse" />
            ) : (
              <Sun className="h-16 w-16 text-amber-500" />
            )}
          </div>
          
          <h1 className="font-heading font-black text-3xl uppercase tracking-wider mb-2">
            {isSleeping ? 'Good Night' : 'Sleep Tracker'}
          </h1>
          <p className={`text-sm max-w-[280px] mx-auto font-medium ${isSleeping ? 'text-indigo-200' : 'text-slate-500 dark:text-muted-foreground'}`}>
            {isSleeping 
              ? 'Regenerasi sel otot sedang berlangsung. Jangan tutup aplikasi ini (atau biarkan di background).' 
              : 'Tidur yang cukup adalah kunci pemulihan otot (Hypertrophy) dan sistem saraf.'}
          </p>

          {isSleeping && (
            <div className="mt-8">
              <p className="font-mono text-5xl font-black text-white tracking-tighter shadow-lg">{elapsedTime}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mt-2">Time Elapsed</p>
            </div>
          )}
        </div>

        <div className="w-full max-w-sm space-y-4 relative z-10">
          {!isSleeping && (
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-border p-4 rounded-2xl shadow-lg mb-8 text-left">
              <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-emerald-500" /> Target Malam Ini
              </h3>
              <ul className="space-y-2">
                <li className="text-[11px] text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>Target Durasi:</span> <span className="font-bold">8.5 Jam</span>
                </li>
                <li className="text-[11px] text-slate-600 dark:text-slate-300 flex justify-between">
                  <span>Waktu Optimal Bangun:</span> <span className="font-bold">04:30 WIB</span>
                </li>
              </ul>
            </div>
          )}

          <Button 
            onClick={toggleSleep}
            className={`w-full h-16 rounded-2xl font-black text-lg tracking-widest uppercase transition-all duration-500 shadow-lg/50 ${
              isSleeping 
                ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isSleeping ? 'WAKE UP' : 'START SLEEP'}
          </Button>
          
          {!isSleeping && (
            <Button variant="ghost" className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest" onClick={() => router.back()}>
              Input Manual <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>

      </main>
    </div>
  )
}
