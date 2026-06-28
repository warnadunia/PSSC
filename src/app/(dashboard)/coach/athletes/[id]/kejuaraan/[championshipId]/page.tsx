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
        { id: 101, style: "50m Freestyle", time: "22.85s", medal: "Emas", medalColor: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
        { id: 102, style: "100m Freestyle", time: "50.42s", medal: "Perak", medalColor: "bg-slate-500/20 text-slate-300 border-slate-500/30" },
        { id: 103, style: "50m Butterfly", time: "24.95s", medal: "Peringkat 4", medalColor: "bg-muted/30 text-muted-foreground border-border" }
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
        { id: 201, style: "100m Freestyle", time: "50.42s", medal: "Perak", medalColor: "bg-slate-500/20 text-slate-300 border-slate-500/30" },
        { id: 202, style: "200m Freestyle", time: "01:52.30s", medal: "Perunggu", medalColor: "bg-orange-500/20 text-orange-400 border-orange-500/30" }
      ]
    }
  }
}

export default function ChampionshipDetailPage({ params }: { params: Promise<{ id: string, championshipId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  
  const championship = getChampionshipDetails(resolvedParams.championshipId)

  return (
    <div className="flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-card border-b border-border sticky top-0 z-50 shrink-0 shadow-lg/30">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold text-foreground uppercase tracking-widest flex-1">Detail Kejuaraan</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-12 space-y-4">
        
        {/* Championship Header Card */}
        <div className="bg-card rounded-3xl p-6 border border-border relative overflow-hidden shadow-lg/30">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500"></div>
          
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-black text-foreground uppercase tracking-widest leading-tight">
              {championship.event}
            </h2>
          </div>

          <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-border">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground/50" />
              <span className="text-xs font-semibold">{championship.date}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground/50" />
              <span className="text-xs font-semibold">{championship.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total: {championship.totalEvents} Nomor</p>
            <div className="flex gap-2">
              {championship.medals.emas > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-1 rounded-md border border-amber-500/30">
                  <Medal className="h-3 w-3" /> {championship.medals.emas}
                </span>
              )}
              {championship.medals.perak > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-500/20 text-slate-300 px-2 py-1 rounded-md border border-slate-500/30">
                  <Medal className="h-3 w-3" /> {championship.medals.perak}
                </span>
              )}
              {championship.medals.perunggu > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-500/20 text-orange-400 px-2 py-1 rounded-md border border-orange-500/30">
                  <Medal className="h-3 w-3" /> {championship.medals.perunggu}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Time Records List */}
        <div>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
            Time Records
          </h3>
          
          <div className="space-y-3">
            {championship.records.map((record) => (
              <Card key={record.id} className="border-border bg-card overflow-hidden shadow-lg/30">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">{record.style}</h4>
                    <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 ${record.medalColor}`}>
                      {record.medal}
                    </Badge>
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-3 border border-border flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                      Official Time
                    </span>
                    <span className="text-lg font-mono font-black text-foreground">
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
