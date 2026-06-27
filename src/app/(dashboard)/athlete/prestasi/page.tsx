"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trophy, Plus, Activity, Settings2, MapPin, Clock, ChevronRight, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GlobalHeader } from "@/components/GlobalHeader"

const radarData = [
  { subject: 'Speed', A: 85 }, { subject: 'Stamina', A: 70 }, { subject: 'Power', A: 80 },
  { subject: 'Turn', A: 75 }, { subject: 'Start', A: 90 }, { subject: 'Technique', A: 88 },
]

const styleBreakdown = [
  {
    name: "Gaya Bebas (Freestyle)", short: "Bebas", metrics: [
      { label: "Stroke / Tarikan", value: 88 }, { label: "Kick / Kaki", value: 92 }, { label: "Breath / Napas", value: 80 }
    ]
  },
  {
    name: "Gaya Kupu-kupu (Butterfly)", short: "Kupu-kupu", metrics: [
      { label: "Stroke Mechanics", value: 85 }, { label: "Dolphin Kick", value: 90 }, { label: "Breathing Timing", value: 78 }
    ]
  },
  {
    name: "Gaya Punggung (Backstroke)", short: "Punggung", metrics: [
      { label: "Body Rotation", value: 82 }, { label: "Kicking Power", value: 85 }, { label: "Start (Backstroke)", value: 80 }
    ]
  },
  {
    name: "Gaya Dada (Breaststroke)", short: "Dada", metrics: [
      { label: "Pull Mechanics", value: 75 }, { label: "Whip Kick Power", value: 80 }, { label: "Glide Timing", value: 78 }
    ]
  }
]

const historyProgramDetailed = [
  { 
    id: 1, session: "The Blue Mile 🐟", timeAgo: "3 minutes ago", distance: "1,500 m", duration: "42 min",
    groups: [
      { name: "WARM UP", drills: [{ id: 101, name: "1 × 300 Free", target: "@ 6:00", isDone: true, color: "bg-emerald-500" }, { id: 102, name: "1 × 200 IM", target: "@ 4:00", isDone: false, color: "bg-emerald-500" }] },
      { name: "MAIN SET", drills: [{ id: 103, name: "4 × 100 Free", target: "@ 1:50", isDone: false, color: "bg-[#ff4b4b]" }, { id: 104, name: "4 × 50 Stroke", target: "@ 1:00", isDone: false, color: "bg-pink-500" }] }
    ]
  },
  {
    id: 2, session: "Sprint Endurance 🔥", timeAgo: "2 days ago", distance: "800 m", duration: "30 min",
    groups: [
      { name: "MAIN SET", drills: [{ id: 201, name: "8 × 100 Freestyle", target: "@ 1:15", isDone: true, color: "bg-[#ff4b4b]" }] }
    ]
  }
]

export default function PrestasiPage() {
  const router = useRouter()

  const [selectedYear, setSelectedYear] = useState("2026")
  const [selectedStroke, setSelectedStroke] = useState("Bebas")

  const chartData = [
    { month: 'Jan', lastYear: 35.1, thisYear: 32.4 },
    { month: 'Feb', lastYear: 34.8, thisYear: 31.9 },
    { month: 'Mar', lastYear: 34.5, thisYear: 31.5 },
    { month: 'Apr', lastYear: 34.2, thisYear: 30.8 },
    { month: 'Mei', lastYear: 34.0, thisYear: 30.2 },
    { month: 'Jun', lastYear: 33.5, thisYear: 29.8 },
    { month: 'Jul', lastYear: 33.2, thisYear: null },
    { month: 'Agt', lastYear: 33.0, thisYear: null },
    { month: 'Sep', lastYear: 32.9, thisYear: null },
    { month: 'Okt', lastYear: 32.6, thisYear: null },
    { month: 'Nov', lastYear: 32.5, thisYear: null },
    { month: 'Des', lastYear: 32.2, thisYear: null },
  ]

  const allChampionshipResults = [
    { id: 1, event: "KRAPSSI 2026", date: "15 Jun 2026", stroke: "Bebas", distance: "25 M", time: "00:12:34" },
    { id: 2, event: "O2SN Provinsi 2026", date: "10 Mei 2026", stroke: "Bebas", distance: "50 M", time: "00:30:12" },
    { id: 3, event: "Kejurda Jabar 2026", date: "02 Mar 2026", stroke: "Dada", distance: "50 M", time: "00:45:20" },
    { id: 4, event: "Indonesia Open 2026", date: "12 Feb 2026", stroke: "Punggung", distance: "100 M", time: "01:15:30" },
    { id: 5, event: "KRAPSSI 2025", date: "15 Jun 2025", stroke: "Bebas", distance: "50 M", time: "00:33:10" },
    { id: 6, event: "KRAPSSI 2026", date: "16 Jun 2026", stroke: "Kupu", distance: "50 M", time: "00:35:10" },
    { id: 7, event: "Kejurcab Bandung", date: "01 Jan 2026", stroke: "Bebas", distance: "100 M", time: "01:05:40" },
    { id: 8, event: "Festival Aquatik 2026", date: "20 Jul 2026", stroke: "Bebas", distance: "200 M", time: "02:20:15" },
    { id: 9, event: "PORSENI 2026", date: "14 Agt 2026", stroke: "Dada", distance: "100 M", time: "01:30:45" },
    { id: 10, event: "PORSENI 2025", date: "14 Agt 2025", stroke: "Dada", distance: "100 M", time: "01:35:00" },
    { id: 11, event: "Kejuaraan Antar Klub", date: "10 Sep 2026", stroke: "Punggung", distance: "50 M", time: "00:32:10" },
    { id: 12, event: "Kejuaraan Antar Klub", date: "10 Sep 2025", stroke: "Punggung", distance: "50 M", time: "00:34:25" },
    { id: 13, event: "Invitasi Renang Nasional", date: "05 Nov 2026", stroke: "Kupu", distance: "100 M", time: "01:10:05" },
    { id: 14, event: "O2SN Nasional 2026", date: "20 Des 2026", stroke: "Bebas", distance: "50 M", time: "00:29:50" },
    { id: 15, event: "O2SN Nasional 2025", date: "20 Des 2025", stroke: "Bebas", distance: "50 M", time: "00:31:00" },
  ]

  const filteredResults = allChampionshipResults.filter(
    (r) => r.stroke === selectedStroke && r.date.includes(selectedYear)
  )

  return (
    <div className="flex flex-col min-h-[100dvh] w-full pb-20">
      
      {/* Header */}
      <GlobalHeader variant="pages" title="Prestasi & Rekor" />

      <div className="px-4">
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4 bg-[#161622] border border-[#2a293d] p-1 rounded-xl">
            <TabsTrigger value="program" className="rounded-lg text-[11px] font-bold data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-blue-600 data-[state=active]:shadow-lg">
              Program
            </TabsTrigger>
            <TabsTrigger value="time-trial" className="rounded-lg text-[11px] font-bold data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-blue-600 data-[state=active]:shadow-lg">
              Time Trial
            </TabsTrigger>
            <TabsTrigger value="kejuaraan" className="rounded-lg text-[11px] font-bold data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-blue-600 data-[state=active]:shadow-lg">
              Kejuaraan
            </TabsTrigger>
          </TabsList>

          {/* TAB: PROGRAM LATIHAN */}
          <TabsContent value="program" className="space-y-6 outline-none">
            {/* 1. RADAR CHART */}
            <Card className="shadow-lg border-none bg-[#1f1e2e]">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                  <Target className="h-4 w-4 text-[#ff4b4b]" /> Atribut Kemampuan Atlet
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="#2a293d" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Ability" dataKey="A" stroke="#ff4b4b" fill="#ff4b4b" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 2. SKORING TEKNIK (TABS MODE) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2 uppercase tracking-widest">
                  <Activity className="h-4 w-4 text-[#ff4b4b]" /> Analisis Teknik per Gaya
                </h3>
              </div>
              <div className="bg-[#ff4b4b]/10 p-2.5 rounded-lg flex gap-2 items-start border border-[#ff4b4b]/20 mb-2">
                <Settings2 className="h-4 w-4 text-[#ff4b4b] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#ff4b4b] font-medium leading-relaxed">
                  *Komponen penilaian disinkronisasi dinamis dari target kurikulum Pusat.
                </p>
              </div>

              <Tabs defaultValue={styleBreakdown[0].short} className="w-full">
                <ScrollArea className="w-full whitespace-nowrap mb-3">
                  <TabsList className="w-max flex bg-[#161622] border border-[#2a293d] p-1 rounded-xl">
                    {styleBreakdown.map((style, idx) => (
                      <TabsTrigger 
                        key={idx} 
                        value={style.short}
                        className="text-[11px] py-1.5 px-4 data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-[#ff4b4b] data-[state=active]:shadow-lg font-bold transition-all"
                      >
                        {style.short}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                {styleBreakdown.map((style, idx) => (
                  <TabsContent key={idx} value={style.short} className="bg-[#1f1e2e] p-4 rounded-xl shadow-lg border border-[#2a293d] mt-0 space-y-3">
                    <h4 className="font-bold text-xs text-white mb-2 border-b border-[#2a293d] pb-2">{style.name}</h4>
                    {style.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-400">{metric.label}</span>
                          <span className={metric.value >= 90 ? 'text-[#ff4b4b]' : 'text-white'}>{metric.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#2a293d] rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-700 ${metric.value >= 90 ? 'bg-[#ff4b4b]' : 'bg-slate-400'}`}
                            style={{ width: `${metric.value}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* 3. DAFTAR PROGRAM LATIHAN */}
            <section className="space-y-4 pt-4 border-t border-[#2a293d]">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 uppercase tracking-widest">
                <Activity className="h-4 w-4 text-blue-600" /> Histori Program Latihan
              </h3>
              {historyProgramDetailed.map((session) => {
                let totalDrills = 0;
                let completedDrills = 0;
                session.groups.forEach(group => {
                  group.drills.forEach(drill => {
                    totalDrills++;
                    if (drill.isDone) completedDrills++;
                  });
                });
                const completionRate = totalDrills > 0 ? Math.round((completedDrills / totalDrills) * 100) : 0;
                const isTuntas = completionRate === 100;

                return (
                  <Card key={session.id} className="border border-[#2a293d] shadow-lg bg-[#1f1e2e] overflow-hidden relative">
                    <div className={`absolute left-0 top-0 w-1.5 h-full ${isTuntas ? 'bg-emerald-500' : 'bg-[#ff4b4b]'}`} />
                    <CardContent className="p-0">
                      <div className="p-4 pl-5">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Latihan : {session.timeAgo}</p>
                        <h3 className="text-lg font-black text-white leading-tight mb-3">{session.session}</h3>
                        
                        <div className="flex gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-300">{session.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-300">{session.duration}</span>
                          </div>
                        </div>

                        <div className="bg-[#161622] p-3 rounded-xl border border-[#2a293d]">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Status: {isTuntas ? <span className="text-emerald-600">Tuntas</span> : <span className="text-[#ff4b4b]">Belum Tuntas</span>}
                            </span>
                            <span className={`text-[10px] font-black ${isTuntas ? 'text-emerald-600' : 'text-slate-300'}`}>
                              {completionRate}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-700 ${isTuntas ? 'bg-emerald-500' : 'bg-[#ff4b4b]'}`}
                              style={{ width: `${completionRate}%` }} 
                            />
                          </div>
                        </div>
                      </div>

                      <div 
                        onClick={() => router.push(`/athlete/training/${session.id}?type=program`)}
                        className="bg-[#161622] border-t border-[#2a293d] p-3 flex justify-center items-center cursor-pointer hover:bg-[#2a293d] transition-colors group"
                      >
                        <span className="text-xs font-bold text-blue-600 group-hover:text-[#ff4b4b]/80 flex items-center">
                          Lihat Detail <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </section>
          </TabsContent>

          {/* TAB: TIME TRIAL */}
          <TabsContent value="time-trial" className="space-y-4 outline-none">
            {/* Filter Gaya: Tabbed */}
            <div className="mb-3">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 p-1">
                  {["Bebas", "Dada", "Punggung", "Kupu"].map(gaya => (
                    <Button 
                      key={gaya}
                      variant={selectedStroke === gaya ? "default" : "outline"}
                      className={`rounded-full h-8 px-4 text-[11px] font-bold ${selectedStroke === gaya ? 'bg-[#ff4b4b] text-white shadow-[0_0_8px_#ff4b4b]' : 'bg-[#1f1e2e] text-slate-400 border-[#2a293d]'}`}
                      onClick={() => setSelectedStroke(gaya)}
                    >
                      Gaya {gaya}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
              </ScrollArea>
            </div>

            {/* Chart */}
            <div className="bg-[#1f1e2e] p-4 rounded-2xl shadow-lg border border-[#2a293d]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-white">Tren Waktu Time Trial (Detik)</h3>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-[#161622] border border-[#2a293d] rounded-lg text-[10px] py-1 px-2 text-slate-300 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-lg"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a293d" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['auto', 'auto']} />
                    <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    <Line type="monotone" name="Tahun Berjalan" dataKey="thisYear" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" name="Tahun Lalu" dataKey="lastYear" stroke="#475569" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabel Hasil Time Trial */}
            <div className="bg-[#1f1e2e] rounded-2xl shadow-lg border border-[#2a293d] overflow-hidden">
              <div className="p-3 bg-[#161622] border-b border-[#2a293d]">
                <h3 className="text-xs font-bold text-white">Semua Hasil Time Trial</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1f1e2e] border-b border-[#2a293d]">
                    <tr>
                      <th className="px-3 py-2.5 font-bold text-slate-400">Nomor Jarak</th>
                      <th className="px-3 py-2.5 font-bold text-slate-400 text-center">Time Record</th>
                      <th className="px-3 py-2.5 font-bold text-slate-400">Nama Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((record) => (
                        <tr key={record.id} className="border-b border-[#2a293d] hover:bg-[#161622]/50">
                          <td className="px-3 py-3 font-semibold text-white">{record.distance} {record.stroke}</td>
                          <td className="px-3 py-3 text-center">
                            <span className="font-bold text-blue-600 bg-[#ff4b4b]/10 px-2 py-1 rounded border border-[#ff4b4b]/30">
                              {record.time}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-400">Time Trial Rutin</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-3 py-6 text-center text-slate-400 font-medium">
                          Tidak ada data untuk filter ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB: KEJUARAAN */}
          <TabsContent value="kejuaraan" className="space-y-4 outline-none">
            
            {/* Input Manual Button */}
            <Button onClick={() => router.push('/athlete/prestasi/input')} className="w-full bg-[#ff4b4b] hover:bg-[#ff4b4b]/90 text-white rounded-xl h-12 shadow-lg font-bold shadow-[0_0_15px_rgba(255,75,75,0.4)]">
              <Plus className="h-5 w-5 mr-2" />
              Input Manual Kejuaraan
            </Button>

            {/* Filter Gaya: Tabbed */}
            <div className="mb-3">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 p-1">
                  {["Bebas", "Dada", "Punggung", "Kupu"].map(gaya => (
                    <Button 
                      key={gaya}
                      variant={selectedStroke === gaya ? "default" : "outline"}
                      className={`rounded-full h-8 px-4 text-[11px] font-bold ${selectedStroke === gaya ? 'bg-[#ff4b4b] text-white shadow-[0_0_8px_#ff4b4b]' : 'bg-[#1f1e2e] text-slate-400 border-[#2a293d]'}`}
                      onClick={() => setSelectedStroke(gaya)}
                    >
                      Gaya {gaya}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
              </ScrollArea>
            </div>

            {/* Chart */}
            <div className="bg-[#1f1e2e] p-4 rounded-2xl shadow-lg border border-[#2a293d]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-white">Tren Waktu (Detik)</h3>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-[#161622] border border-[#2a293d] rounded-lg text-[10px] py-1 px-2 text-slate-300 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-lg"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a293d" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['auto', 'auto']} />
                    <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    <Line type="monotone" name="Tahun Berjalan" dataKey="thisYear" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" name="Tahun Lalu" dataKey="lastYear" stroke="#475569" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabel Hasil Perlombaan */}
            <div className="bg-[#1f1e2e] rounded-2xl shadow-lg border border-[#2a293d] overflow-hidden">
              <div className="p-3 bg-[#161622] border-b border-[#2a293d]">
                <h3 className="text-xs font-bold text-white">Semua Hasil Perlombaan</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1f1e2e] border-b border-[#2a293d]">
                    <tr>
                      <th className="px-3 py-2.5 font-bold text-slate-400">Nomor Kejuaraan</th>
                      <th className="px-3 py-2.5 font-bold text-slate-400 text-center">Time Record</th>
                      <th className="px-3 py-2.5 font-bold text-slate-400">Nama Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((record) => (
                        <tr key={record.id} className="border-b border-[#2a293d] hover:bg-[#161622]/50">
                          <td className="px-3 py-3 font-semibold text-white">{record.distance} {record.stroke}</td>
                          <td className="px-3 py-3 text-center">
                            <span className="font-bold text-[#ff4b4b] bg-[#ff4b4b]/10 px-2 py-1 rounded border border-[#ff4b4b]/30">
                              {record.time}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-400">{record.event}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-3 py-6 text-center text-slate-400 font-medium">
                          Tidak ada data untuk filter ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}
