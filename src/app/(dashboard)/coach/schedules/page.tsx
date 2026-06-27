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
  hadir: { color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", dotColor: "bg-emerald-500", textColor: "text-emerald-500", icon: CheckCircle2, label: "Masuk/Latihan" },
  dinas: { color: "bg-blue-500/10 text-blue-500 border-blue-500/30", dotColor: "bg-blue-500", textColor: "text-blue-500", icon: Briefcase, label: "Dinas Luar" },
  event: { color: "bg-amber-500/10 text-amber-500 border-amber-500/30", dotColor: "bg-amber-500", textColor: "text-amber-500", icon: Flag, label: "Event Lomba" },
  libur: { color: "bg-slate-500/10 text-slate-400 border-slate-500/30", dotColor: "bg-slate-500", textColor: "text-slate-400", icon: Ban, label: "Libur" },
  cuti: { color: "bg-purple-500/10 text-purple-500 border-purple-500/30", dotColor: "bg-purple-500", textColor: "text-purple-500", icon: CalendarIcon, label: "Cuti" },
  ijin: { color: "bg-rose-500/10 text-rose-500 border-rose-500/30", dotColor: "bg-rose-500", textColor: "text-rose-500", icon: CalendarIcon, label: "Ijin" },
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
        <div className="flex items-center justify-between bg-card p-3 rounded-2xl border border-border shadow-xl/30">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8 hover:bg-muted">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase">
              {monthNames[month]} {year}
            </h2>
            <p className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">Kalender Pelatih</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8 hover:bg-muted">
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        {/* SECTION KALENDER & LEGENDA */}
        <div className="space-y-3">
          {/* CARD KALENDER CUSTOM (GRID) */}
          <Card className="border-border overflow-hidden bg-card p-4 rounded-3xl shadow-xl/30">
            <CardContent className="p-0">
              {/* LEGENDA BADGE (Di atas kalender) */}
              <div className="flex flex-wrap gap-x-4 gap-y-3 items-center justify-center pb-6 border-b border-border/50 mb-4">
                {Object.values(TYPE_CONFIG).map((conf, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${(conf as { dotColor: string }).dotColor}`} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{conf.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 mb-2">
                {dayNames.map((day, idx) => {
                  const isWeekend = idx >= 5; // Sab (5) and Min (6)
                  return (
                    <div key={day} className={`py-2 text-center text-[11px] font-black uppercase tracking-widest ${isWeekend ? 'text-primary' : 'text-muted-foreground'}`}>
                      {day}
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-7 gap-0">
                {daysArray.map((day, idx) => {
                  const dayAgendas = day.dateString ? dummyAgendas.filter(ag => ag.date === day.dateString) : []
                  const isSelected = day.dateString === selectedDate
                  const isToday = day.dateString === "2026-06-26" 
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => day.dateString && setSelectedDate(day.dateString)}
                      className="min-h-[50px] flex flex-col items-center justify-center cursor-pointer"
                    >
                      {day.dayNumber && (
                        <div className={`
                          w-10 h-10 flex flex-col items-center justify-center rounded-2xl transition-all
                          ${isSelected ? 'bg-primary shadow-lg shadow-primary/20' : ''}
                          ${!isSelected && isToday ? 'border-2 border-primary bg-primary/5' : ''}
                          ${!day.isCurrentMonth ? 'opacity-30' : ''}
                        `}>
                          <span className={`
                            text-[13px] font-bold 
                            ${isSelected ? 'text-primary-foreground' : (isToday ? 'text-primary' : 'text-foreground')}
                          `}>
                            {day.dayNumber}
                          </span>
                          
                          {/* DOT INDICATOR */}
                          {dayAgendas.length > 0 && (
                            <div className="flex gap-0.5 mt-0.5">
                              {dayAgendas.map(ag => {
                                const config = TYPE_CONFIG[ag.type] as { dotColor: string }
                                return (
                                  <div key={ag.id} className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} title={ag.title} />
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CARD KETERANGAN AKTIVITAS HARIAN */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2 px-1 tracking-wider uppercase mb-4">
            <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
              <CalendarIcon className="h-4 w-4" />
            </div>
            <span>Aktivitas Tanggal <span className="text-primary">{selectedDate ? selectedDate.split("-")[2] : ""} {monthNames[month]} {year}</span></span>
          </h3>

          {selectedAgendas.length > 0 ? (
            selectedAgendas.map(agenda => {
              const config = TYPE_CONFIG[agenda.type] as any
              const Icon = config.icon
              return (
                <div 
                  key={agenda.id} 
                  onClick={() => router.push(`/coach/schedules/${agenda.id}`)}
                  className={`flex items-center p-4 rounded-3xl cursor-pointer transition-all border ${config.color}`}
                >
                  <div className="h-10 w-10 shrink-0 bg-background/50 rounded-full flex items-center justify-center mr-4">
                    <Icon className={`h-5 w-5 ${config.textColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-black text-sm mb-0.5 ${config.textColor}`}>{agenda.title}</h4>
                      {agenda.time && (
                        <span className={`text-[10px] font-bold ${config.textColor} opacity-80`}>{agenda.time}</span>
                      )}
                    </div>
                    {agenda.location && (
                      <p className={`text-[11px] font-medium opacity-80 ${config.textColor}`}>
                        {agenda.location}
                      </p>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-card rounded-3xl border border-border border-dashed p-6 text-center shadow-xl/30">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Tidak ada agenda pada tanggal ini.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}