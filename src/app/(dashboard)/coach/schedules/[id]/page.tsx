"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calendar as CalendarIcon, MapPin, Clock, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlobalHeader } from "@/components/GlobalHeader"

type AgendaType = "hadir" | "dinas" | "event" | "libur" | "cuti" | "ijin"

interface Agenda {
  id: string
  date: string 
  type: AgendaType
  title: string
  time?: string
  location?: string
  description?: string
}

const dummyAgendas: Agenda[] = [
  { 
    id: "ag-1", 
    date: "2026-06-20", 
    type: "event", 
    title: "Kejurda Renang Jateng-DIY", 
    location: "Kolam Renang UNY",
    time: "07:00 WIB - Selesai",
    description: "Pertandingan tahunan tingkat daerah untuk menyeleksi atlet menuju Kejurnas. Semua pelatih diwajibkan hadir untuk mendampingi atlet sesuai dengan nomor pertandingannya masing-masing."
  },
  { 
    id: "ag-2", 
    date: "2026-06-25", 
    type: "dinas", 
    title: "Rapat Koordinasi BUMD Olahraga", 
    time: "08:00 WIB", 
    location: "Kantor Pemprov DIY",
    description: "Rapat penyusunan anggaran dan strategi pembinaan olahraga daerah. Pakaian rapi (Batik PSSC)."
  },
  { 
    id: "ag-3", 
    date: "2026-06-26", 
    type: "hadir", 
    title: "Sesi Latihan Sore (Elite)", 
    time: "15:00 WIB", 
    location: "Kradenan Pool",
    description: "Fokus latihan pada teknik start dan pembalikan. Jangan lupa siapkan stopwatch dan papan tulis strategi."
  },
  { 
    id: "ag-4", 
    date: "2026-06-28", 
    type: "libur", 
    title: "Libur Pemeliharaan Kolam", 
    location: "Kradenan Pool",
    description: "Pengurasan rutin dan pemberian bahan kimia air (Kaporit). Dilarang mengadakan aktivitas apapun di area kolam."
  },
]

const TYPE_CONFIG = {
  hadir: { color: "bg-emerald-500/20 text-emerald-400", label: "Masuk/Latihan" },
  dinas: { color: "bg-blue-500/20 text-blue-400", label: "Dinas Luar" },
  event: { color: "bg-amber-500/20 text-amber-400", label: "Event Lomba" },
  libur: { color: "bg-slate-500/20 text-slate-400", label: "Libur" },
  cuti: { color: "bg-purple-500/20 text-purple-400", label: "Cuti" },
  ijin: { color: "bg-rose-500/20 text-rose-400", label: "Ijin" },
}

export default function ScheduleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  
  const agenda = dummyAgendas.find(ag => ag.id === resolvedParams.id) || dummyAgendas[0]
  const config = TYPE_CONFIG[agenda.type]

  // Parse date for display
  const dateObj = new Date(agenda.date)
  const dateDisplay = dateObj.toLocaleDateString("id-ID", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      
      {/* Header */}
      <GlobalHeader variant="subpage" title="Detail Agenda" />

      <main className="flex-1 overflow-y-auto w-full p-4 pb-12">
        <div className="bg-card rounded-3xl p-6 border border-border mb-6 relative overflow-hidden shadow-lg/30">
          
          <div className={`absolute top-0 left-0 w-1.5 h-full ${config.color.split(" ")[0]}`}></div>

          <div className="flex items-center mb-4 pl-2">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${config.color}`}>
              {config.label}
            </span>
          </div>

          <h2 className="text-2xl font-black text-foreground uppercase tracking-widest leading-tight mb-6 pl-2">
            {agenda.title}
          </h2>

          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-border pl-2">
            <div className="flex items-start text-muted-foreground">
              <CalendarIcon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Tanggal</p>
                <p className="text-sm font-semibold text-foreground">{dateDisplay}</p>
              </div>
            </div>
            
            {agenda.time && (
              <div className="flex items-start text-muted-foreground">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Waktu</p>
                  <p className="text-sm font-semibold text-foreground">{agenda.time}</p>
                </div>
              </div>
            )}

            {agenda.location && (
              <div className="flex items-start text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Lokasi</p>
                  <p className="text-sm font-semibold text-foreground">{agenda.location}</p>
                </div>
              </div>
            )}
          </div>

          <div className="pl-2">
            <div className="flex items-center text-foreground font-bold text-sm mb-3 tracking-widest uppercase">
              <Info className="h-4 w-4 mr-2 text-primary" />
              Catatan / Deskripsi
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border border-border">
              {agenda.description || "Tidak ada catatan tambahan untuk agenda ini."}
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
