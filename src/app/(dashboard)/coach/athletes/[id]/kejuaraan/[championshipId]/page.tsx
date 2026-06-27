"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Trophy, Calendar, MapPin, Medal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const getChampionshipDetails = (championshipId: string) => {
  if (championshipId === '1') {
    return {
      id: 1, 
      event: "Kejurda Jateng 2026", 
      date: "25 Juni 2026",
      location: "Kolam Renang Jatidiri, Semarang",
      totalEvents: 3,
      medals: { emas: 1, perak: 1, perunggu: 0 },
      records: [
        { id: 101, style: "50m Freestyle", time: "22.85s", medal: "Emas", medalColor: "bg-amber-100 text-amber-700 border-amber-300" },
        { id: 102, style: "100m Freestyle", time: "50.42s", medal: "Perak", medalColor: "bg-slate-200 text-slate-700 border-slate-300" },
        { id: 103, style: "50m Butterfly", time: "24.95s", medal: "Peringkat 4", medalColor: "bg-slate-50 text-slate-500 border-slate-200" }
      ]
    }
  } else {
    return {
      id: 2, 
      event: "O2SN Nasional", 
      date: "10 Agustus 2025", 
      location: "Gelora Bung Karno, Jakarta",
      totalEvents: 2,
      medals: { emas: 0, perak: 1, perunggu: 1 },
      records: [
        { id: 201, style: "100m Freestyle", time: "50.42s", medal: "Perak", medalColor: "bg-slate-200 text-slate-700 border-slate-300" },
        { id: 202, style: "200m Freestyle", time: "01:52.30s", medal: "Perunggu", medalColor: "bg-orange-100 text-orange-700 border-orange-300" }
      ]
    }
  }
}

export default function ChampionshipDetailPage({ params }: { params: Promise<{ id: string, championshipId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  
  const championship = getChampionshipDetails(resolvedParams.championshipId)

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 w-full" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex-1">Detail Kejuaraan</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-12 space-y-4">
        
        {/* Championship Header Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-400"></div>
          
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-black text-slate-900 leading-tight">
              {championship.event}
            </h2>
          </div>

          <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center text-slate-600">
              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
              <span className="text-xs font-semibold">{championship.date}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-slate-400" />
              <span className="text-xs font-semibold">{championship.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total: {championship.totalEvents} Nomor</p>
            <div className="flex gap-2">
              {championship.medals.emas > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-md border border-amber-200">
                  <Medal className="h-3 w-3" /> {championship.medals.emas}
                </span>
              )}
              {championship.medals.perak > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-300">
                  <Medal className="h-3 w-3" /> {championship.medals.perak}
                </span>
              )}
              {championship.medals.perunggu > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-1 rounded-md border border-orange-200">
                  <Medal className="h-3 w-3" /> {championship.medals.perunggu}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Time Records List */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 mb-3 px-1 flex items-center gap-2">
            Time Records
          </h3>
          
          <div className="space-y-3">
            {championship.records.map((record) => (
              <Card key={record.id} className="border-none shadow-sm bg-white overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-sm font-bold text-slate-900">{record.style}</h4>
                    <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 ${record.medalColor}`}>
                      {record.medal}
                    </Badge>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                      Official Time
                    </span>
                    <span className="text-lg font-mono font-black text-slate-800">
                      {record.time}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
