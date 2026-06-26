// app/(dashboard)/coach/mypage/page.tsx
"use client"

import { useState } from "react"
import { 
  MapPin, ChevronDown, ChevronUp, Users, Calendar, 
  Activity, Trophy, FileText, ClipboardCheck, Clock, CheckCircle2
} from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader" // Sesuaikan path jika berbeda
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CoachMyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  // Dummy Data Rekap Absensi Mingguan (Sesuai tanggal berjalan)
  const weeklyAttendance = [
    { date: "Sen, 22 Jun 2026", status: "Hadir", time: "14:45 WIB" },
    { date: "Sel, 23 Jun 2026", status: "Hadir", time: "14:50 WIB" },
    { date: "Rab, 24 Jun 2026", status: "Terlambat", time: "15:20 WIB" },
    { date: "Kam, 25 Jun 2026", status: "Dinas Luar", time: "08:00 WIB" }, // Dinas terhitung aktif
    { date: "Jum, 26 Jun 2026", status: isCheckedIn ? "Hadir" : "Pending", time: isCheckedIn ? "17:11 WIB" : "-" },
  ]

  return (
    <div className="flex flex-col h-full bg-slate-50 relative pb-6 w-full">
      
      {/* GLOBAL HEADER */}
      <GlobalHeader variant="pages" title="MyPage" />

      <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-6 pt-5 w-full">
        
        {/* ==========================================
            1. CARD ABSENSI COACH (Location Locked)
            ========================================== */}
        <section>
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md border-none overflow-hidden relative">
            {/* Ornamen Background */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
            
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold text-lg">Absensi Kehadiran</h2>
                  <p className="text-blue-100 text-xs font-medium mt-0.5">Sesi Latihan Sore</p>
                </div>
                {isCheckedIn && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-[10px]">
                    <ClipboardCheck className="h-3 w-3 mr-1" /> Hadir
                  </Badge>
                )}
              </div>

              <div className="bg-white/10 rounded-lg p-3 mb-4 flex items-center gap-3 border border-white/20">
                <div className={`p-2 rounded-full ${isCheckedIn ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-900/50 text-blue-200'}`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Status Lokasi</p>
                  <p className="text-xs font-medium truncate">
                    {isCheckedIn ? "Terkunci: Depok, DI Yogyakarta (Akurasi 4m)" : "Menunggu Koordinat GPS..."}
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setIsCheckedIn(true)}
                disabled={isCheckedIn}
                className={`w-full font-bold h-11 transition-all ${
                  isCheckedIn 
                  ? "bg-emerald-500 text-white opacity-90 cursor-not-allowed" 
                  : "bg-white text-blue-700 hover:bg-blue-50 shadow-sm"
                }`}
              >
                {isCheckedIn ? "Anda Sudah Check-in" : "Check-in Lokasi Sekarang"}
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* ==========================================
            2. SLIDER CARD PENGUMUMAN
            ========================================== */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-800">Pengumuman Pusat</h3>
            <Badge variant="outline" className="text-[9px] bg-amber-50 text-amber-700 border-amber-200">Penting</Badge>
          </div>
          <Carousel className="w-full" opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-2">
              <CarouselItem className="pl-2 basis-[85%] md:basis-[60%] lg:basis-[40%]">
                <div className="bg-white border rounded-xl p-4 shadow-sm h-full hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Event Mendatang</p>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Kejurda Jateng 2026</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">Siapkan atlet lapis 1 untuk kualifikasi gaya bebas & ganti. Pendaftaran ditutup 10 Juli.</p>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-2 basis-[85%] md:basis-[60%] lg:basis-[40%]">
                <div className="bg-white border rounded-xl p-4 shadow-sm h-full hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Update Kurikulum</p>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Program V02 Max Baru</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">Pusat telah merilis bank latihan hypoxic baru. Silahkan assign ke atlet Elite cabang.</p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>

        {/* ==========================================
            3. QUICK MENU (Expandable)
            ========================================== */}
        <section>
          <h3 className="font-bold text-sm text-slate-800 mb-3">Menu Cepat</h3>
          <Collapsible open={isMenuOpen} onOpenChange={setIsMenuOpen} className="space-y-3">
  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Input TT</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Beri Latihan</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100 group-hover:bg-purple-100 transition-colors">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Daftar Atlet</span>
              </div>
              
              {/* REVISI: Hapus asChild dan gunakan button langsung */}
    <CollapsibleTrigger className="md:hidden flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 w-full">
      <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 hover:bg-slate-200 transition-colors">
        {isMenuOpen ? <ChevronUp className="h-5 w-5 text-slate-600" /> : <ChevronDown className="h-5 w-5 text-slate-600" />}
      </div>
      <span className="text-[10px] font-medium text-slate-600 text-center">{isMenuOpen ? "Tutup" : "Lainnya"}</span>
    </CollapsibleTrigger>

              {/* Menu ekstra yang selalu tampil di tablet/desktop */}
              <div className="hidden md:flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 group-hover:bg-amber-100 transition-colors">
                  <Trophy className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Papan Skor</span>
              </div>
              <div className="hidden md:flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 group-hover:bg-rose-100 transition-colors">
                  <Calendar className="h-5 w-5 text-rose-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Kalender</span>
              </div>
            </div>
            
            <CollapsibleContent className="grid grid-cols-4 gap-3 pt-1 pb-2 md:hidden">
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 group-hover:bg-amber-100 transition-colors">
                  <Trophy className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Papan Skor</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 group-hover:bg-rose-100 transition-colors">
                  <Calendar className="h-5 w-5 text-rose-600" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center">Kalender</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* ==========================================
            4. KARTU STATISTIK ABSENSI & TABEL MINGGUAN
            ========================================== */}
        <section>
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="p-4 pb-2 border-b border-slate-50">
              <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Statistik Kehadiran Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              {/* Highlight Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="col-span-2 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">Total Jam Aktif</p>
                  <p className="text-2xl font-bold text-emerald-900 mt-1">32 <span className="text-xs font-medium text-emerald-600">Jam / Minggu</span></p>
                </div>
                <div className="bg-rose-50 rounded-lg p-3 border border-rose-100 flex flex-col justify-center items-center">
                  <p className="text-[10px] font-semibold text-rose-700 uppercase tracking-wide text-center">Terlambat</p>
                  <p className="text-xl font-bold text-rose-900 mt-1">1x</p>
                </div>
              </div>

              {/* Tabel Mingguan */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Rekap Minggu Ini</h4>
                <div className="rounded-md border border-slate-100 overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="text-[10px] font-semibold h-8 p-3 w-[45%]">Tanggal</TableHead>
                        <TableHead className="text-[10px] font-semibold h-8 p-3">Waktu</TableHead>
                        <TableHead className="text-[10px] font-semibold h-8 p-3 text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weeklyAttendance.map((row, idx) => (
                        <TableRow key={idx} className="hover:bg-slate-50/50">
                          <TableCell className="text-[11px] font-medium p-3 text-slate-700">{row.date}</TableCell>
                          <TableCell className="text-[11px] text-slate-500 p-3 font-mono">{row.time}</TableCell>
                          <TableCell className="text-right p-3">
                            <Badge 
                              variant="outline" 
                              className={`text-[9px] px-1.5 py-0.5 border-none font-medium whitespace-nowrap ${
                                row.status === "Hadir" ? "bg-emerald-100 text-emerald-700" : 
                                row.status === "Terlambat" ? "bg-rose-100 text-rose-700" : 
                                row.status === "Dinas Luar" ? "bg-blue-100 text-blue-700" : // Dinas = aktif
                                "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {row.status === "Dinas Luar" && <CheckCircle2 className="h-2.5 w-2.5 mr-1 inline" />}
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