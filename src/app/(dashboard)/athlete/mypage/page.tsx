// app/(dashboard)/athlete/mypage/page.tsx
"use client"

import { useState } from "react"
import {
  MapPin, ChevronDown, ChevronUp, Users, Calendar,
  Activity, Trophy, FileText, ClipboardCheck, Clock, CheckCircle2,
  Power, Calendar as CalendarIcon, Target, Flame, TrendingUp
} from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

const strokeProgressData: Record<string, any[]> = {
  "Bebas": [
    { month: 'Jan', rekornas: 22.5, bestTime: 25.1 },
    { month: 'Feb', rekornas: 22.5, bestTime: 24.8 },
    { month: 'Mar', rekornas: 22.5, bestTime: 24.5 },
    { month: 'Apr', rekornas: 22.5, bestTime: 24.2 },
    { month: 'Mei', rekornas: 22.5, bestTime: 23.9 },
    { month: 'Jun', rekornas: 22.5, bestTime: 23.6 },
  ],
  "Kupu-kupu": [
    { month: 'Jan', rekornas: 24.0, bestTime: 26.5 },
    { month: 'Feb', rekornas: 24.0, bestTime: 26.2 },
    { month: 'Mar', rekornas: 24.0, bestTime: 25.9 },
    { month: 'Apr', rekornas: 24.0, bestTime: 25.5 },
    { month: 'Mei', rekornas: 24.0, bestTime: 25.2 },
    { month: 'Jun', rekornas: 24.0, bestTime: 24.9 },
  ],
  "Punggung": [
    { month: 'Jan', rekornas: 25.1, bestTime: 28.1 },
    { month: 'Feb', rekornas: 25.1, bestTime: 27.5 },
    { month: 'Mar', rekornas: 25.1, bestTime: 27.2 },
    { month: 'Apr', rekornas: 25.1, bestTime: 26.9 },
    { month: 'Mei', rekornas: 25.1, bestTime: 26.6 },
    { month: 'Jun', rekornas: 25.1, bestTime: 26.3 },
  ],
  "Dada": [
    { month: 'Jan', rekornas: 27.5, bestTime: 31.0 },
    { month: 'Feb', rekornas: 27.5, bestTime: 30.5 },
    { month: 'Mar', rekornas: 27.5, bestTime: 30.0 },
    { month: 'Apr', rekornas: 27.5, bestTime: 29.5 },
    { month: 'Mei', rekornas: 27.5, bestTime: 29.2 },
    { month: 'Jun', rekornas: 27.5, bestTime: 28.8 },
  ]
}

export default function AthleteMyPage() {

  // Fake state to simulate checked-in or not 
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [selectedProgressStroke, setSelectedProgressStroke] = useState("Bebas")
  const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

  // Dummy Data Rekap Absensi
  const weeklyAttendance = [
    { date: "Sen, 22 Jun 2026", status: "Hadir", time: "14:45 WIB" },
    { date: "Sel, 23 Jun 2026", status: "Hadir", time: "14:50 WIB" },
    { date: "Rab, 24 Jun 2026", status: "Hadir", time: "15:20 WIB" },
    { date: "Kam, 25 Jun 2026", status: "Ijin", time: "-" },
    { date: "Jum, 26 Jun 2026", status: isCheckedIn ? "Hadir" : "Pending", time: isCheckedIn ? "17:11 WIB" : "-" },
  ]

  return (
    <div className="flex flex-col h-full relative pb-6 w-full z-0 bg-background text-foreground">

      {/* GLOBAL FIXED BACKGROUND GRADIENT (Bebas Hex Color) */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/10 via-background to-transparent -z-10 pointer-events-none"></div>

      {/* GLOBAL HEADER */}
      <GlobalHeader variant="pages" title="MyPage" />

      <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-6 pt-5 pb-32 w-full">

        {/* ==========================================
            0. WELCOME HEADER (ATHLETE STYLE)
            ========================================== */}
        <section className="flex items-center gap-4 mb-5">
          <div className="relative shrink-0">
            <div className="h-[72px] w-[72px] rounded-full bg-secondary border-[1.5px] border-border overflow-hidden shadow-xl">
              <img src="https://i.pravatar.cc/150?img=62" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-1 h-[18px] w-[18px] bg-emerald-500 rounded-full border-[2.5px] border-background"></div>
          </div>
          <div>
            <p className="text-[13px] text-muted-foreground font-medium tracking-tight mb-0.5">Salam Semangat Calon Juara!</p>
            <h1 className="text-2xl font-heading font-bold text-foreground leading-none mb-1 tracking-wide uppercase">John Doe</h1>
            <span className="inline-block px-2 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-500 text-[11px] font-bold rounded-md uppercase tracking-widest border border-amber-500/30">
              Level Basic 2, PSSC
            </span>
          </div>
        </section>

        {/* ==========================================
            1. HIGHLIGHT: NEXT COMPETITION & RECENT BEST (HEX COLOR CLEARED)
            ========================================== */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Target Event</p>
              <h3 className="font-heading font-bold text-sm text-foreground uppercase leading-tight line-clamp-2 mb-3">Kejurda Jateng 2026</h3>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-center border border-border/50">
              <p className="text-2xl font-heading font-black text-primary leading-none">14</p>
              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Hari Lagi</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Recent Best Time</p>
              <h3 className="font-heading font-bold text-sm text-foreground uppercase leading-tight line-clamp-1 mb-3">50m Freestyle</h3>
            </div>
            <div className="bg-primary/10 rounded-lg p-2 text-center border border-primary/20 flex flex-col items-center justify-center h-full">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-3 w-3 text-primary" />
                <p className="text-2xl font-mono font-black text-primary leading-none">26.85<span className="text-xs">s</span></p>
              </div>
              <p className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1 flex items-center justify-center gap-1">
                <TrendingUp className="h-2 w-2" /> -0.2s dari PB
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. MISSION OF THE DAY (Fokus Latihan)
            ========================================== */}
        <section>
          <Card className="bg-card border-border shadow-xl overflow-hidden relative rounded-3xl">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Fokus Latihan Hari Ini</p>
              </div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase tracking-wider mb-2">Stroke Mechanics & Turn</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fokus pada tarikan air yang maksimal (catch phase) dan efisiensi waktu saat melakukan putaran (flip turn). Coach akan memantau waktu underwater kick kamu!
              </p>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-bold text-foreground">15:30 WIB</span>
                </div>
                <Badge className="bg-secondary text-foreground hover:bg-secondary border-none uppercase tracking-widest font-bold text-[9px]">
                  Kolam DSC
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ==========================================
            3. PERFORMANCE HEATMAP (Statistik Kemajuan)
            ========================================== */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold tracking-widest uppercase text-sm text-foreground">PROGRES GAYA</h3>
            <span onClick={() => router.push('/athlete/mypage/progress-gaya')} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline cursor-pointer">Lihat Detail</span>
          </div>
          
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
            {["Bebas", "Kupu-kupu", "Punggung", "Dada"].map(stroke => (
              <Button
                key={stroke}
                variant={selectedProgressStroke === stroke ? "default" : "outline"}
                className={`rounded-full h-8 px-4 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedProgressStroke === stroke 
                    ? 'bg-[#ff4b4b] hover:bg-[#ff4b4b]/90 text-white shadow-[0_0_10px_#ff4b4b] border-none' 
                    : 'bg-card text-muted-foreground border-border hover:bg-secondary'
                }`}
                onClick={() => setSelectedProgressStroke(stroke)}
              >
                {stroke}
              </Button>
            ))}
          </div>

          <Card className="bg-card border-border shadow-xl p-4">
            <div className="h-40 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={strokeProgressData[selectedProgressStroke]} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} domain={['auto', 'auto']} reversed />
                  <RechartsTooltip 
                    contentStyle={{ fontSize: '10px', borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }} 
                    itemStyle={{ color: '#ff4b4b', fontWeight: 'bold' }}
                    formatter={(value: any) => [`${value}s`, 'Waktu']}
                  />
                  <Line 
                    type="monotone" 
                    name="Best Time" 
                    dataKey="bestTime" 
                    stroke="#ff4b4b" 
                    strokeWidth={2} 
                    dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} 
                    activeDot={{ r: 5, fill: "#ff4b4b" }} 
                  />
                  <Line 
                    type="stepAfter" 
                    name="Rekornas" 
                    dataKey="rekornas" 
                    stroke="#3b82f6" 
                    strokeDasharray="4 4"
                    strokeWidth={2} 
                    dot={false}
                    activeDot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-[#ff4b4b]"></div>
                <span className="text-[9px] font-bold text-muted-foreground">Best Time</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-[#3b82f6] border-dashed border-b-2 border-transparent"></div>
                <span className="text-[9px] font-bold text-muted-foreground">Rekornas</span>
              </div>
            </div>
          </Card>
        </section>

        {/* ==========================================
            4. KARTU STATISTIK ABSENSI (Log Kehadiran)
            ========================================== */}
        <section>
          <Card className="bg-card border-border shadow-xl">
            <CardHeader className="p-4 pb-2 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-heading font-bold text-card-foreground uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Disiplin Latihan
              </CardTitle>
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/30 uppercase tracking-widest font-bold text-[9px] shadow-none">95% Hadir</Badge>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              <div>
                <div className="rounded-xl border border-border overflow-hidden bg-background">
                  <Table>
                    <TableHeader className="bg-secondary">
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-[10px] font-bold text-muted-foreground h-8 p-3 w-[45%] uppercase tracking-widest">Tanggal</TableHead>
                        <TableHead className="text-[10px] font-bold text-muted-foreground h-8 p-3 uppercase tracking-widest">Waktu</TableHead>
                        <TableHead className="text-[10px] font-bold text-muted-foreground h-8 p-3 text-right uppercase tracking-widest">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weeklyAttendance.map((row, idx) => (
                        <TableRow key={idx} className="hover:bg-secondary/50 border-border">
                          <TableCell className="text-[11px] font-bold p-3 text-foreground">{row.date}</TableCell>
                          <TableCell className="text-[11px] text-muted-foreground p-3 font-mono">{row.time}</TableCell>
                          <TableCell className="text-right p-3">
                            <Badge
                              variant="outline"
                              className={`text-[9px] px-1.5 py-0.5 border-none font-bold whitespace-nowrap uppercase tracking-widest ${row.status === "Hadir" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                                row.status === "Terlambat" ? "bg-primary/20 text-primary" :
                                  row.status === "Ijin" ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" :
                                    "bg-secondary text-muted-foreground"
                                }`}
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  )
}