"use client"

import { useState, useEffect, useRef, use } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Clock, Timer, Check, X, ChevronLeft } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const getProgramDetails = (programId: string) => {
  if (programId === '1') {
    return {
      id: 1, 
      session: "The Blue Mile 🐟",
      timeAgo: "3 minutes ago",
      distance: "1,500 m",
      duration: "42 min",
      groups: [
        {
          name: "WARM UP",
          drills: [
            { id: 101, label: "1 × 300 Free", target: "@ 6:00", isDone: true, color: "bg-emerald-500" },
            { id: 102, label: "1 × 200 IM", target: "@ 4:00", isDone: false, color: "bg-emerald-500" },
          ]
        },
        {
          name: "MAIN SET",
          drills: [
            { id: 103, label: "4 × 100 Free", target: "@ 1:50", isDone: false, color: "bg-red-600" },
            { id: 104, label: "4 × 50 Stroke", target: "@ 1:00", isDone: false, color: "bg-pink-500" },
          ]
        }
      ]
    }
  } else {
    return {
      id: 2,
      session: "Sprint Endurance 🔥",
      timeAgo: "2 days ago",
      distance: "800 m",
      duration: "30 min",
      groups: [
        {
          name: "MAIN SET",
          drills: [
            { id: 201, label: "8 × 100 Freestyle", target: "@ 1:15", isDone: true, color: "bg-red-600" }
          ]
        }
      ]
    }
  }
}

export default function AthleteProgramDetailPage({ params }: { params: Promise<{ id: string, programId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  
  const program = getProgramDetails(resolvedParams.programId)

  // Inisialisasi state checkbox dari data isDone
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})
  
  useEffect(() => {
    const initialCheckedState: Record<number, boolean> = {}
    program.groups.forEach(group => {
      group.drills.forEach(drill => {
        initialCheckedState[drill.id] = drill.isDone
      })
    })
    setCheckedItems(initialCheckedState)
  }, [program.id])

  return (
    <div className="flex flex-col h-[100dvh] bg-white w-full relative" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex-1">Detail Program Latihan</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full bg-white pb-10">
        
        {/* Info Grid */}
        <div className="px-5 pt-5 pb-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{program.session}</h1>
          <p className="text-xs font-medium text-slate-500 mt-1 mb-5">{program.timeAgo}</p>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-slate-400" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Distance</p><p className="text-sm font-semibold text-slate-800">{program.distance}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-slate-400" />
              <div><p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Duration</p><p className="text-sm font-semibold text-slate-800">{program.duration}</p></div>
            </div>
          </div>
        </div>

        {/* ==========================================
            STRUKTUR TABEL (GROUP NAME | TARGET | TIME)
            ========================================== */}
        <div className="w-full bg-slate-50">
          {program.groups.map((group, gIdx) => (
            <div key={gIdx} className="mb-4 bg-white border-b border-slate-100">
              
              {/* Header Kolom */}
              <div className="grid grid-cols-[10fr_4fr_5fr] bg-slate-100/70 px-4 py-2 border-y border-slate-200 sticky top-14 z-10 shadow-sm">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{group.name}</span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Target</span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center pr-2">Waktu / Status</span>
              </div>
              
              {/* Baris Latihan */}
              {group.drills.map((drill, iIdx) => {
                const isChecked = checkedItems[drill.id] || false
                return (
                  <div key={iIdx} className={`grid grid-cols-[10fr_4fr_5fr] items-center py-4 pl-4 pr-3 border-b border-slate-100 relative transition-colors ${isChecked ? 'bg-slate-50' : 'bg-white'}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${drill.color}`}></div>
                    
                    {/* Kolom 1: Nama Set */}
                    <div className="flex items-center pl-2">
                      <span className={`text-[14px] font-bold ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {drill.label}
                      </span>
                    </div>
                    
                    {/* Kolom 2: Target */}
                    <div className="text-center text-[13px] font-bold text-slate-500">
                      {drill.target}
                    </div>
                    
                    {/* Kolom 3: Aksi (READ-ONLY) */}
                    <div className="flex justify-end items-center gap-3">
                      <div className="text-[11px] font-bold uppercase tracking-wide">
                        {drill.isDone ? (
                          <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">Done</span>
                        ) : drill.label.includes("104") ? (
                          <span className="text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">Skip</span>
                        ) : (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">01:45</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
