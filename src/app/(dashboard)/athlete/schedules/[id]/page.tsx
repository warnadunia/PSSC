"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calendar as CalendarIcon, MapPin, Clock, Info } from "lucide-react"

import { Button } from "@/components/ui/button"

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
  hadir: { color: "bg-emerald-100 text-emerald-700", label: "Masuk/Latihan" },
  dinas: { color: "bg-blue-100 text-blue-700", label: "Dinas Luar" },
  event: { color: "bg-amber-100 text-amber-700", label: "Event Lomba" },
  libur: { color: "bg-slate-100 text-slate-600", label: "Libur" },
  cuti: { color: "bg-purple-100 text-purple-700", label: "Cuti" },
  ijin: { color: "bg-rose-100 text-rose-700", label: "Ijin" },
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
    <div className="flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex-1">Detail Agenda</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-12">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 relative overflow-hidden">
          
          <div className={`absolute top-0 left-0 w-1.5 h-full ${config.color.split(" ")[0]}`}></div>

          <div className="flex items-center mb-4 pl-2">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${config.color}`}>
              {config.label}
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 leading-tight mb-6 pl-2">
            {agenda.title}
          </h2>

          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-slate-100 pl-2">
            <div className="flex items-start text-slate-600">
              <CalendarIcon className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Tanggal</p>
                <p className="text-sm font-semibold text-slate-800">{dateDisplay}</p>
              </div>
            </div>
            
            {agenda.time && (
              <div className="flex items-start text-slate-600">
                <Clock className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Waktu</p>
                  <p className="text-sm font-semibold text-slate-800">{agenda.time}</p>
                </div>
              </div>
            )}

            {agenda.location && (
              <div className="flex items-start text-slate-600">
                <MapPin className="h-5 w-5 mr-3 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Lokasi</p>
                  <p className="text-sm font-semibold text-slate-800">{agenda.location}</p>
                </div>
              </div>
            )}
          </div>

          <div className="pl-2">
            <div className="flex items-center text-slate-800 font-bold text-sm mb-3">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              Catatan / Deskripsi
            </div>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {agenda.description || "Tidak ada catatan tambahan untuk agenda ini."}
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
