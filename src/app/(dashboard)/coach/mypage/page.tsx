// app/(dashboard)/coach/mypage/page.tsx
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
    // THEME UPDATE: Background utama transparan karena kita pakai fixed background di belakang
    <div className="flex flex-col min-h-full text-slate-900 dark:text-white relative pb-6 w-full z-0">

      {/* Watermark Logo */}
      <div className="fixed inset-0 z-[-1] flex items-center justify-center pointer-events-none -top-160 -right-30">
        <img src="/assets/images/logo-parisakti.png" alt="Watermark" className="w-[70%] max-w-[600px] object-contain opacity-5" />
      </div>

      {/* GLOBAL HEADER */}
      <GlobalHeader variant="pages" title="MyPage" />

      <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-6 pt-5 w-full">

        {/* ==========================================
            0. WELCOME HEADER
            ========================================== */}
        <section className="flex items-center gap-4 mb-5">
          <div className="relative shrink-0">
            {/* THEME UPDATE: Border avatar disesuaikan dengan tema gelap */}
            <div className="h-[72px] w-[72px] rounded-full bg-slate-100 dark:bg-[#2a293d] border-[1.5px] border-slate-300 dark:border-slate-600 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=69" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-1 h-[18px] w-[18px] bg-emerald-500 rounded-full border-[2.5px] border-[#602727]"></div>
          </div>
          <div>
            <p className="text-[13px] text-slate-500 dark:text-slate-300 font-medium tracking-tight mb-0.5">Salam Profesional Coach</p>
            {/* THEME UPDATE: Nama menggunakan font heading dan text putih */}
            <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white leading-none mb-1 tracking-wide">John Doe</h1>
            {/* THEME UPDATE: Badge Head Coach menggunakan Coral Red */}
            <span className="inline-block px-2 py-0.5 bg-[#ff4b4b]/20 text-[#ff4b4b] text-[11px] font-bold rounded-md uppercase tracking-wider border border-[#ff4b4b]/30">
              Head Coach, PSSC Yogyakarta
            </span>
          </div>
        </section>

        {/* ==========================================
            1. CARD ABSENSI COACH (Location Locked)
            ========================================== */}
        <section>
          {/* THEME UPDATE: Card absensi menggunakan warna card gelap (#1f1e2e) */}
          <Card className="bg-white dark:bg-[#1f1e2e] text-slate-900 dark:text-white -black/40 border border-slate-200 dark:border-[#2a293d] overflow-hidden relative rounded-3xl shadow-lg/30">
            <CardContent className="p-5 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-heading font-bold text-lg tracking-widest text-slate-800 dark:text-white uppercase mb-1">Jadwal Hari Ini</h2>
                  <div className="flex items-center text-[#ff4b4b] text-[10px] mb-4 font-bold">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>Jumat, 26 Juni 2026 (15:30 - 17:30 WIB)</span>
                  </div>

                  <div className="flex gap-6 mt-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Masuk</p>
                      <p className="text-2xl font-heading font-bold text-slate-900 dark:text-white">{isCheckedIn ? "15:21" : "--:--"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Pulang</p>
                      {isCheckedIn ? (
                        <div className="bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded-sm mt-1 inline-block uppercase tracking-wider">
                          {">"} On Training
                        </div>
                      ) : (
                        <p className="text-2xl font-heading font-bold text-slate-400 dark:text-slate-600">--:--</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Big Power Button */}
                {/* THEME UPDATE: Style tombol disesuaikan untuk dark mode */}
                <div
                  onClick={() => router?.push(isCheckedIn ? '/coach/mypage/attendance?type=out' : '/coach/mypage/attendance?type=in')}
                  className="cursor-pointer bg-slate-50 dark:bg-[#2a293d] rounded-2xl p-2 border border-slate-200 dark:border-[#34334a] transition-all hover:bg-slate-100 dark:hover:bg-[#34334a] shadow-lg/30"
                >
                  <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl shadow-lg ${isCheckedIn ? 'bg-gradient-to-br from-[#ff4b4b] to-red-700' : 'bg-gradient-to-br from-emerald-500 to-emerald-700'}`}>
                    <Power className="h-8 w-8 text-white mb-1 drop-shadow-md" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                      {isCheckedIn ? 'Pulang' : 'Masuk'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-[#34334a] pt-4 flex justify-between items-center">
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-[10px]">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-[#ff4b4b]" />
                  <span className="truncate max-w-[200px]">Kolam Renang Depok Sport Center, Yogyakarta</span>
                </div>
                <span className={`text-[10px] font-bold tracking-widest uppercase ${isCheckedIn ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {isCheckedIn ? 'On Duty' : 'Pending'}
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
            <h3 className="font-heading font-bold tracking-widest uppercase text-sm text-slate-800 dark:text-white">Pengumuman Pusat</h3>
            <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 border-amber-500/30">Penting</Badge>
          </div>
          <Carousel className="w-full" opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-2">
              <CarouselItem className="pl-2 basis-[85%] md:basis-[60%] lg:basis-[40%]">
                {/* THEME UPDATE: Card pengumuman menggunakan dark navy */}
                <div
                  onClick={() => router?.push('/coach/mypage/announcement/1')}
                  className="bg-white dark:bg-[#1f1e2e] border border-slate-200 dark:border-[#2a293d] rounded-xl p-4 h-full hover:border-[#ff4b4b]/50 transition-colors cursor-pointer shadow-lg/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-[#ff4b4b] shadow-[0_0_8px_#ff4b4b]"></span>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Event Mendatang</p>
                  </div>
                  <h4 className="text-sm font-heading font-bold text-slate-800 dark:text-white mb-1 uppercase tracking-wide">Kejurda Jateng 2026</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">Siapkan atlet lapis 1 untuk kualifikasi gaya bebas & ganti. Pendaftaran ditutup 10 Juli.</p>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-2 basis-[85%] md:basis-[60%] lg:basis-[40%]">
                <div
                  onClick={() => router?.push('/coach/mypage/announcement/2')}
                  className="bg-white dark:bg-[#1f1e2e] border border-slate-200 dark:border-[#2a293d] rounded-xl p-4 h-full hover:border-blue-500/50 transition-colors cursor-pointer shadow-lg/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Update Kurikulum</p>
                  </div>
                  <h4 className="text-sm font-heading font-bold text-slate-800 dark:text-white mb-1 uppercase tracking-wide">Program V02 Max Baru</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">Pusat telah merilis bank latihan hypoxic baru. Silahkan assign ke atlet Elite cabang.</p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>

        {/* ==========================================
            3. QUICK MENU (Expandable)
            ========================================== */}
        <section>
          <h3 className="font-heading font-bold tracking-widest uppercase text-sm text-slate-800 dark:text-white mb-3">Menu Cepat</h3>
          <Collapsible open={isMenuOpen} onOpenChange={setIsMenuOpen} className="space-y-3">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {/* THEME UPDATE: Icon Box disesuaikan warnanya */}
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors shadow-lg/30">
                  <Activity className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Input TT</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors shadow-lg/30">
                  <FileText className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Beri Latihan</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors shadow-lg/30">
                  <Users className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Daftar Atlet</span>
              </div>

              <CollapsibleTrigger className="md:hidden flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-none p-0 w-full group">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-[#2a293d] flex items-center justify-center border border-slate-200 dark:border-[#34334a] group-hover:bg-slate-200 dark:group-hover:bg-[#34334a] transition-colors shadow-lg/30">
                  {isMenuOpen ? <ChevronUp className="h-5 w-5 text-slate-500 dark:text-slate-300" /> : <ChevronDown className="h-5 w-5 text-slate-500 dark:text-slate-300" />}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{isMenuOpen ? "Tutup" : "Lainnya"}</span>
              </CollapsibleTrigger>

              {/* Menu ekstra yang selalu tampil di tablet/desktop */}
              <div className="hidden md:flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors shadow-lg/30">
                  <Trophy className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Papan Skor</span>
              </div>
              <div className="hidden md:flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors shadow-lg/30">
                  <Calendar className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Kalender</span>
              </div>
            </div>

            <CollapsibleContent className="grid grid-cols-4 gap-3 pt-1 pb-2 md:hidden">
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors shadow-lg/30">
                  <Trophy className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Papan Skor</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors shadow-lg/30">
                  <Calendar className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Kalender</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* ==========================================
            4. KARTU STATISTIK ABSENSI & TABEL MINGGUAN
            ========================================== */}
        <section>
          {/* THEME UPDATE: Card stats */}
          <Card className="bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] shadow-lg/30">
            <CardHeader className="p-4 pb-2 border-b border-slate-200 dark:border-[#2a293d]">
              <CardTitle className="text-sm font-heading font-bold text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#ff4b4b]" />
                Statistik Kehadiran Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3">
              {/* Highlight Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="col-span-2 rounded-xl p-3 border border-slate-200 dark:border-[#2a293d] bg-slate-50 dark:bg-transparent shadow-lg/30">
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Jam Aktif</p>
                  <p className="text-3xl font-heading font-bold text-slate-900 dark:text-white mt-1">32 <span className="text-xs font-sans font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Jam / Minggu</span></p>
                </div>
                <div className="bg-rose-50 dark:bg-[#161622] rounded-xl p-3 border border-rose-200 dark:border-[#ff4b4b]/30 flex flex-col justify-center items-center -[inset_0_0_15px_rgba(255,75,75,0.05)] shadow-[inset_0_0_15px_rgba(255,75,75,0.1)]">
                  <p className="text-[10px] font-bold text-[#ff4b4b] uppercase tracking-widest text-center">Terlambat</p>
                  <p className="text-2xl font-heading font-bold text-[#ff4b4b] mt-1">1x</p>
                </div>
              </div>

              {/* Tabel Mingguan */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Rekap Minggu Ini</h4>
                <div className="rounded-xl border border-slate-200 dark:border-[#2a293d] overflow-hidden bg-slate-50 dark:bg-[#161622]">
                  <Table>
                    <TableHeader className="bg-slate-100 dark:bg-[#2a293d]">
                      <TableRow className="border-b-slate-200 dark:border-b-[#34334a] hover:bg-transparent">
                        <TableHead className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest h-10 p-3 w-[45%]">Tanggal</TableHead>
                        <TableHead className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest h-10 p-3">Waktu</TableHead>
                        <TableHead className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest h-10 p-3 text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weeklyAttendance.map((row, idx) => (
                        <TableRow key={idx} className="border-b-slate-200 dark:border-b-[#2a293d] hover:bg-slate-100 dark:hover:bg-[#1f1e2e]/50 transition-colors">
                          <TableCell className="text-[11px] font-bold p-3 text-slate-800 dark:text-white">{row.date}</TableCell>
                          <TableCell className="text-[11px] text-slate-500 dark:text-slate-400 p-3 font-mono tracking-wider">{row.time}</TableCell>
                          <TableCell className="text-right p-3">
                            <Badge
                              variant="outline"
                              className={`text-[9px] px-2 py-0.5 font-bold uppercase tracking-widest whitespace-nowrap ${row.status === "Hadir" ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400" :
                                row.status === "Terlambat" ? "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400" :
                                  row.status === "Dinas Luar" ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400" : // Dinas = aktif[cite: 11]
                                    "bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
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