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

export default function AthleteMyPage() {

  // Fake state to simulate checked-in or not 
  const [isCheckedIn, setIsCheckedIn] = useState(false)
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
            <div className="h-[72px] w-[72px] rounded-full bg-secondary border-[1.5px] border-border overflow-hidden shadow-lg">
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
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
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

          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
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
          <Card className="bg-card border-border shadow-sm overflow-hidden relative rounded-3xl">
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
            <h3 className="font-heading font-bold tracking-widest uppercase text-sm text-foreground">Progress Gaya Utama</h3>
            <span onClick={() => router.push('/athlete/mypage/progress-gaya')} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline cursor-pointer">Lihat Detail</span>
          </div>
          <Card className="bg-card border-border shadow-sm p-4">
            <div className="h-32 w-full bg-secondary rounded-xl flex items-end justify-between p-2 gap-2 relative border border-border/50">
              <div className="absolute top-2 left-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">100m Freestyle</div>
              {/* Dummy Bars dengan warna dinamis (bukan slate lagi) */}
              <div className="w-1/6 bg-muted-foreground/30 rounded-t-sm h-[60%] transition-all hover:bg-primary"></div>
              <div className="w-1/6 bg-muted-foreground/30 rounded-t-sm h-[65%] transition-all hover:bg-primary"></div>
              <div className="w-1/6 bg-muted-foreground/30 rounded-t-sm h-[50%] transition-all hover:bg-primary"></div>
              <div className="w-1/6 bg-muted-foreground/30 rounded-t-sm h-[70%] transition-all hover:bg-primary"></div>
              <div className="w-1/6 bg-primary rounded-t-sm h-[85%] transition-all shadow-[0_0_10px_var(--color-primary)]"></div>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Feb</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Mar</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Apr</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Mei</span>
              <span className="text-[8px] font-bold text-primary uppercase">Jun</span>
            </div>
          </Card>
        </section>

        {/* ==========================================
            4. KARTU STATISTIK ABSENSI (Log Kehadiran)
            ========================================== */}
        <section>
          <Card className="bg-card border-border shadow-sm">
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