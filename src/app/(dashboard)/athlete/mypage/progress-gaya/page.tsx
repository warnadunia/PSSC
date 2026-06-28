"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Trophy, Timer, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

const STROKES = ["Bebas", "Dada", "Punggung", "Kupu-kupu"]

// Helper function to format seconds back to MM:SS.ms (optional) or just calculate differences.
const parseTimeToSeconds = (timeStr: string) => {
  if (!timeStr || timeStr === "-") return 0;
  if (timeStr.includes(":")) {
    const parts = timeStr.split(":");
    if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
    } else if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
    }
  }
  return parseFloat(timeStr) || 0;
}

// Dummy data
const dataPerGaya: Record<string, any> = {
  "Bebas": {
    chartData: [
      { month: 'Jan', time: 42.1 },
      { month: 'Feb', time: 41.5 },
      { month: 'Mar', time: 40.8 },
      { month: 'Apr', time: 40.0 },
      { month: 'Mei', time: 39.5 },
      { month: 'Jun', time: 39.3 },
    ],
    records: [
      { distance: "25 M", trial: "00:23.23", resmi: "00:21.30" },
      { distance: "50 M", trial: "00:44.23", resmi: "00:39.30" },
      { distance: "100 M", trial: "01:32.10", resmi: "01:28.05" },
      { distance: "200 M", trial: "03:15.00", resmi: "-" },
    ]
  },
  "Dada": {
    chartData: [
      { month: 'Jan', time: 55.0 },
      { month: 'Feb', time: 53.5 },
      { month: 'Mar', time: 51.2 },
      { month: 'Apr', time: 49.8 },
      { month: 'Mei', time: 48.5 },
      { month: 'Jun', time: 47.0 },
    ],
    records: [
      { distance: "25 M", trial: "00:28.10", resmi: "00:26.50" },
      { distance: "50 M", trial: "00:52.00", resmi: "00:47.00" },
      { distance: "100 M", trial: "01:55.20", resmi: "01:45.30" },
      { distance: "200 M", trial: "-", resmi: "-" },
    ]
  },
  "Punggung": {
    chartData: [
      { month: 'Jan', time: 50.1 },
      { month: 'Feb', time: 49.5 },
      { month: 'Mar', time: 48.8 },
      { month: 'Apr', time: 47.5 },
      { month: 'Mei', time: 46.2 },
      { month: 'Jun', time: 45.8 },
    ],
    records: [
      { distance: "25 M", trial: "00:26.15", resmi: "00:25.00" },
      { distance: "50 M", trial: "00:50.00", resmi: "00:45.80" },
      { distance: "100 M", trial: "01:48.30", resmi: "-" },
      { distance: "200 M", trial: "-", resmi: "-" },
    ]
  },
  "Kupu-kupu": {
    chartData: [
      { month: 'Jan', time: 48.0 },
      { month: 'Feb', time: 47.2 },
      { month: 'Mar', time: 46.5 },
      { month: 'Apr', time: 45.0 },
      { month: 'Mei', time: 44.5 },
      { month: 'Jun', time: 43.1 },
    ],
    records: [
      { distance: "25 M", trial: "00:24.50", resmi: "00:23.10" },
      { distance: "50 M", trial: "00:48.10", resmi: "00:43.10" },
      { distance: "100 M", trial: "-", resmi: "-" },
      { distance: "200 M", trial: "-", resmi: "-" },
    ]
  }
}

export default function ProgressGayaPage() {
  const router = useRouter()
  const [selectedStroke, setSelectedStroke] = useState("Bebas")

  const currentData = dataPerGaya[selectedStroke]

  return (
    <div className="flex flex-col min-h-[100dvh] w-full pb-20 bg-background">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center px-4 h-16">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 text-foreground">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-heading font-black tracking-widest uppercase text-foreground">
            Progress Gaya
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Pills Slider */}
        <div className="-mx-4 px-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              {STROKES.map(gaya => (
                <Button 
                  key={gaya}
                  variant={selectedStroke === gaya ? "default" : "outline"}
                  className={`rounded-full h-10 px-5 text-[11px] font-bold uppercase tracking-widest transition-all ${
                    selectedStroke === gaya 
                      ? 'bg-[#ff4b4b] hover:bg-[#ff4b4b]/90 text-white shadow-[0_0_10px_#ff4b4b] border-none' 
                      : 'bg-card text-muted-foreground border-border hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedStroke(gaya)}
                >
                  {gaya}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Info Text */}
        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
          Menampilkan catatan kemajuan waktu spesifik untuk <span className="text-foreground font-bold">Gaya {selectedStroke}</span>. Waktu yang lebih singkat saat Kejuaraan Resmi menandakan kesiapan mental tanding yang baik.
        </p>

        {/* Tabel Perbandingan Time Records */}
        <div className="bg-card/60 backdrop-blur-md rounded-2xl border border-border overflow-hidden shadow-xl/30">
          <div className="p-3 bg-secondary/40 border-b border-border flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#ff4b4b]" />
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">
              Time Trial vs Kejuaraan
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-card/80 border-b border-border">
                <tr>
                  <th className="px-3 py-3 font-bold text-muted-foreground">Jarak</th>
                  <th className="px-3 py-3 font-bold text-muted-foreground text-center">Time Trial</th>
                  <th className="px-3 py-3 font-bold text-muted-foreground text-center">Kejuaraan</th>
                  <th className="px-3 py-3 font-bold text-muted-foreground text-right">Progres</th>
                </tr>
              </thead>
              <tbody>
                {currentData.records.map((record: any, idx: number) => {
                  const tTrial = parseTimeToSeconds(record.trial);
                  const tResmi = parseTimeToSeconds(record.resmi);
                  
                  let diff = 0;
                  let isFaster = false;
                  
                  if (tTrial > 0 && tResmi > 0) {
                    diff = tResmi - tTrial;
                    isFaster = diff < 0;
                  }

                  return (
                    <tr key={idx} className="border-b last:border-b-0 border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-3 py-3.5 font-bold text-foreground whitespace-nowrap">
                        {record.distance}
                      </td>
                      <td className="px-3 py-3.5 text-center whitespace-nowrap">
                        {record.trial !== "-" ? (
                          <span className="font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded border border-border/50">
                            {record.trial}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-center whitespace-nowrap">
                        {record.resmi !== "-" ? (
                          <span className="font-mono font-bold text-foreground bg-[#ff4b4b]/10 border border-[#ff4b4b]/20 px-1.5 py-0.5 rounded">
                            {record.resmi}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-right whitespace-nowrap">
                        {tTrial > 0 && tResmi > 0 ? (
                          <div className={`flex items-center justify-end gap-1 font-bold ${isFaster ? 'text-emerald-500' : 'text-[#ff4b4b]'}`}>
                            {isFaster ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                            {diff > 0 ? '+' : ''}{diff.toFixed(2)}s
                          </div>
                        ) : (
                          <div className="flex items-center justify-end text-muted-foreground/50">
                            <Minus className="h-3 w-3" />
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Mini Chart */}
        <Card className="bg-card/40 backdrop-blur-md border-border shadow-xl/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#ff4b4b]" /> Tren Kecepatan (50M)
              </h3>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a293d" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['auto', 'auto']} reversed />
                  <RechartsTooltip 
                    contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(31, 30, 46, 0.9)', color: '#fff' }} 
                    itemStyle={{ color: '#ff4b4b', fontWeight: 'bold' }}
                    formatter={(value: number) => [`${value}s`, 'Waktu']}
                  />
                  <Line 
                    type="monotone" 
                    name="Waktu (detik)" 
                    dataKey="time" 
                    stroke="#ff4b4b" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "#ff4b4b", strokeWidth: 0 }} 
                    activeDot={{ r: 6, fill: "#ff4b4b" }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-center text-muted-foreground mt-2 font-medium">
              *Grafik direkam berdasarkan waktu tercepat pada jarak 50 Meter setiap bulannya. Kurva turun mengindikasikan peningkatan kecepatan.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
