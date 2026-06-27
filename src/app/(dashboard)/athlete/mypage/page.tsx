// app/(dashboard)/athlete/mypage/page.tsx
"use client"

import { useState } from "react"
import { 
  MapPin, ChevronDown, ChevronUp, Users, Calendar, 
  Activity, Trophy, FileText, ClipboardCheck, Clock, CheckCircle2,
  Power, Calendar as CalendarIcon
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
  
  // Fake state to simulate checked-in or not based on query param (can be passed back or just simulated locally)
  // We'll assume the user is checked in if they have a query param `checkedin=true` or similar, 
  // but for now let's just keep it local. 
  // In a real app this comes from DB/Context.
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;

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
            0. WELCOME HEADER
            ========================================== */}
        <section className="flex items-center gap-4 mb-2">
          <div className="relative shrink-0">
            <div className="h-[72px] w-[72px] rounded-full bg-[#EAEAEA] border-[1.5px] border-slate-400"></div>
            <div className="absolute bottom-0 right-1 h-[18px] w-[18px] bg-green-500 rounded-full border-[2.5px] border-slate-50"></div>
          </div>
          <div>
            <p className="text-[13px] text-slate-600 font-medium tracking-tight mb-0.5">Salam Profesional Coach</p>
            <h1 className="text-2xl font-normal text-black leading-none mb-1">John Doe</h1>
            <span className="inline-block px-1.5 py-0.5 bg-[#FBDCD3] text-[#7A2E1A] text-[11px] font-medium rounded-sm">
              Head Coach, PSSC Yogyakarta
            </span>
          </div>
        </section>

        {/* ==========================================
            1. CARD ABSENSI COACH (Location Locked)
            ========================================== */}
        <section>
          <Card className="bg-[#F0F0F0] text-slate-800 shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] border-none overflow-hidden relative rounded-3xl">
            <CardContent className="p-5 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-semibold text-lg tracking-tight mb-1">JADWAL HARI INI</h2>
                  <div className="flex items-center text-slate-500 text-[10px] mb-4">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>Jumat, 26 Juni 2026 (15:30 - 17:30 WIB)</span>
                  </div>

                  <div className="flex gap-6 mt-2">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Masuk</p>
                      <p className="text-2xl font-black">{isCheckedIn ? "15:21" : "--:--"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Pulang</p>
                      {isCheckedIn ? (
                        <div className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm mt-1 inline-block">
                          {">"} On Training
                        </div>
                      ) : (
                        <p className="text-2xl font-black">--:--</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Big Power Button */}
                <div 
                  onClick={() => router?.push(isCheckedIn ? '/athlete/mypage/attendance?type=out' : '/athlete/mypage/attendance?type=in')}
                  className="cursor-pointer bg-[#e0e0e0] rounded-2xl p-2 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] active:shadow-[inset_6px_6px_10px_#bebebe,inset_-6px_-6px_10px_#ffffff] transition-all"
                >
                  <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.2)] ${isCheckedIn ? 'bg-gradient-to-b from-red-500 to-red-700' : 'bg-gradient-to-b from-emerald-400 to-emerald-600'}`}>
                    <Power className="h-8 w-8 text-white mb-1" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold text-white tracking-widest">
                      {isCheckedIn ? 'PULANG' : 'MASUK'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-300/50 pt-4 flex justify-between items-center">
                <div className="flex items-center text-slate-600 text-[10px]">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  <span className="truncate max-w-[200px]">Kolam Renang Depok Sport Center, Yogyakarta</span>
                </div>
                <span className={`text-[10px] font-bold tracking-widest ${isCheckedIn ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isCheckedIn ? 'ON DUTY' : 'PENDING'}
                </span>
              </div>
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
                <div 
                  onClick={() => router?.push('/athlete/mypage/announcement/1')}
                  className="bg-white border rounded-xl p-4 shadow-sm h-full hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Event Mendatang</p>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Kejurda Jateng 2026</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">Siapkan atlet lapis 1 untuk kualifikasi gaya bebas & ganti. Pendaftaran ditutup 10 Juli.</p>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-2 basis-[85%] md:basis-[60%] lg:basis-[40%]">
                <div 
                  onClick={() => router?.push('/athlete/mypage/announcement/2')}
                  className="bg-white border rounded-xl p-4 shadow-sm h-full hover:shadow-md transition-shadow cursor-pointer"
                >
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
