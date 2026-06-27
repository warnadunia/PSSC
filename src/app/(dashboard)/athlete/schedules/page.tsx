"use client"

import { useRouter } from "next/navigation"

import { useState } from "react"
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  MapPin, Flag, Briefcase, CheckCircle2, Ban
} from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// ==========================================
// DUMMY DATA AGENDA (Bulan Juni 2026)
// ==========================================
type AgendaType = "hadir" | "dinas" | "event" | "libur" | "cuti" | "ijin"

interface Agenda {
  id: string
  date: string 
  type: AgendaType
  title: string
  time?: string
  location?: string
}

const dummyAgendas: Agenda[] = [
  { id: "ag-1", date: "2026-06-20", type: "event", title: "Kejurda Renang Jateng-DIY", location: "Kolam Renang UNY" },
  { id: "ag-2", date: "2026-06-25", type: "dinas", title: "Rapat Koordinasi BUMD Olahraga", time: "08:00 WIB", location: "Kantor Pemprov DIY" },
  { id: "ag-3", date: "2026-06-26", type: "hadir", title: "Sesi Latihan Sore (Elite)", time: "15:00 WIB", location: "Kradenan Pool" },
  { id: "ag-4", date: "2026-06-28", type: "libur", title: "Libur Pemeliharaan Kolam", location: "Kradenan Pool" },
]

const TYPE_CONFIG = {
  hadir: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2, label: "Masuk/Latihan" },
  dinas: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Briefcase, label: "Dinas Luar" },
  event: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Flag, label: "Event Lomba" },
  libur: { color: "bg-slate-100 text-slate-600 border-slate-200", icon: Ban, label: "Libur" },
  cuti: { color: "bg-purple-100 text-purple-700 border-purple-200", icon: CalendarIcon, label: "Cuti" },
  ijin: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: CalendarIcon, label: "Ijin" },
}

export default function CoachSchedules() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 26)) 
  const [selectedDate, setSelectedDate] = useState<string>("2026-06-26")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 
  
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]

  const daysArray = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startDay + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`
      return { dayNumber, dateString, isCurrentMonth: true }
    }
    return { dayNumber: null, dateString: null, isCurrentMonth: false }
  })

  const selectedAgendas = dummyAgendas.filter(ag => ag.date === selectedDate)

  return (
    <div className="flex flex-col h-full relative pb-6 w-full">
      <GlobalHeader variant="pages" title="Schedules" />

      <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-5 pt-5 w-full pb-32">
        
        {/* SLIDER BULAN TAHUN */}
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8 hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-bold text-blue-700 tracking-wide">
              {monthNames[month]} {year}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">Kalender Pelatih</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8 hover:bg-slate-100">
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </Button>
        </div>

        {/* SECTION KALENDER & LEGENDA */}
        <div className="space-y-3">
          {/* CARD KALENDER CUSTOM (GRID) */}
          <Card className="shadow-sm border-slate-100 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                {dayNames.map(day => (
                  <div key={day} className="py-2 text-center text-[10px] font-bold text-slate-500 uppercase">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {daysArray.map((day, idx) => {
                  const dayAgendas = day.dateString ? dummyAgendas.filter(ag => ag.date === day.dateString) : []
                  const isSelected = day.dateString === selectedDate
                  const isToday = day.dateString === "2026-06-26" 
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => day.dateString && setSelectedDate(day.dateString)}
                      className={`
                        min-h-[70px] md:min-h-[90px] border-b border-r border-slate-100 p-1 cursor-pointer transition-colors
                        ${!day.isCurrentMonth ? 'bg-slate-50/50' : 'bg-white hover:bg-blue-50/30'}
                        ${isSelected ? 'ring-2 ring-inset ring-blue-500 bg-blue-50/20' : ''}
                      `}
                    >
                      {day.dayNumber && (
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start">
                            <span className={`
                              text-[11px] font-semibold flex items-center justify-center h-5 w-5 rounded-full
                              ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}
                            `}>
                              {day.dayNumber}
                            </span>
                          </div>
                          
                          <div className="mt-1 flex flex-col gap-0.5">
                            {dayAgendas.map(ag => {
                              const config = TYPE_CONFIG[ag.type]
                              return (
                                <div key={ag.id} className={`w-full truncate rounded px-1 py-0.5 text-[8px] font-bold border ${config.color}`}>
                                  {ag.title}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* LEGENDA BADGE (Dipindah persis ke bawah kalender) */}
          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-wrap gap-2 items-center justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 w-full text-center md:w-auto md:text-left">Legenda:</span>
            {Object.values(TYPE_CONFIG).map((conf, idx) => (
              <div key={idx} className={`flex items-center gap-1 px-2 py-1 rounded border ${conf.color} bg-opacity-40`}>
                <conf.icon className="h-3 w-3" />
                <span className="text-[9px] font-bold">{conf.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD KETERANGAN AKTIVITAS HARIAN */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1 px-1">
            <CalendarIcon className="h-4 w-4 text-blue-500" />
            Agenda Tanggal {selectedDate ? selectedDate.split("-")[2] : ""} {monthNames[month]}
          </h3>

          {selectedAgendas.length > 0 ? (
            selectedAgendas.map(agenda => {
              const Icon = TYPE_CONFIG[agenda.type].icon
              return (
                <Card 
                  key={agenda.id} 
                  onClick={() => router.push(`/athlete/schedules/${agenda.id}`)}
                  className="shadow-sm border-slate-100 relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className={`absolute left-0 top-0 w-1 h-full ${TYPE_CONFIG[agenda.type].color.split(" ")[0]}`} />
                  <CardContent className="p-4 pl-5">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 border-transparent ${TYPE_CONFIG[agenda.type].color}`}>
                        {TYPE_CONFIG[agenda.type].label}
                      </Badge>
                      {agenda.time && (
                        <span className="text-[10px] font-bold text-slate-500">{agenda.time}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{agenda.title}</h4>
                    {agenda.location && (
                      <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {agenda.location}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="bg-white rounded-xl border border-slate-100 border-dashed p-6 text-center">
              <p className="text-xs text-slate-400 font-medium">Tidak ada agenda pada tanggal ini.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
