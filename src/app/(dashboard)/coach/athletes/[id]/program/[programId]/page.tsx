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
            { id: 103, label: "4 × 100 Free", target: "@ 1:50", isDone: false, color: "bg-primary" },
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
            { id: 201, label: "8 × 100 Freestyle", target: "@ 1:15", isDone: true, color: "bg-primary" }
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
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      
      {/* Header */}
      <GlobalHeader variant="subpage" title="Detail Program Latihan" />

      <main className="flex-1 w-full pb-10">
        
        {/* Info Grid */}
        <div className="px-5 pt-5 pb-6 border-b border-border">
          <h1 className="text-2xl font-black text-foreground uppercase tracking-widest leading-tight">{program.session}</h1>
          <p className="text-xs font-medium text-muted-foreground mt-1 mb-5">{program.timeAgo}</p>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground/50" />
              <div><p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Distance</p><p className="text-sm font-black text-foreground">{program.distance}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground/50" />
              <div><p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Duration</p><p className="text-sm font-black text-foreground">{program.duration}</p></div>
            </div>
          </div>
        </div>

        {/* ==========================================
            STRUKTUR TABEL (GROUP NAME | TARGET | TIME)
            ========================================== */}
        <div className="w-full">
          {program.groups.map((group, gIdx) => (
            <div key={gIdx} className="mb-4 bg-card border-y border-border shadow-lg/30">
              
              {/* Header Kolom */}
              <div className="grid grid-cols-[10fr_4fr_5fr] bg-muted/50 px-4 py-2 border-b border-border sticky top-14 z-10 shadow-lg/30">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{group.name}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Target</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center pr-2">Waktu / Status</span>
              </div>
              
              {/* Baris Latihan */}
              {group.drills.map((drill, iIdx) => {
                const isChecked = checkedItems[drill.id] || false
                return (
                  <div key={iIdx} className={`grid grid-cols-[10fr_4fr_5fr] items-center py-4 pl-4 pr-3 border-b border-border relative transition-colors ${isChecked ? 'bg-muted/30' : 'bg-card'}`}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${drill.color}`}></div>
                    
                    {/* Kolom 1: Nama Set */}
                    <div className="flex items-center pl-2">
                      <span className={`text-[14px] font-bold uppercase tracking-widest ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {drill.label}
                      </span>
                    </div>
                    
                    {/* Kolom 2: Target */}
                    <div className="text-center text-[13px] font-bold text-muted-foreground">
                      {drill.target}
                    </div>
                    
                    {/* Kolom 3: Aksi (READ-ONLY) */}
                    <div className="flex justify-end items-center gap-3">
                      <div className="text-[11px] font-bold uppercase tracking-wide">
                        {drill.isDone ? (
                          <span className="text-blue-400 bg-blue-500/20 px-2 py-1 rounded border border-blue-500/30">Done</span>
                        ) : drill.label.includes("104") ? (
                          <span className="text-muted-foreground bg-muted/30 px-2 py-1 rounded border border-border">Skip</span>
                        ) : (
                          <span className="text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded border border-emerald-500/30">01:45</span>
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
