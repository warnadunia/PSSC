"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trophy, Plus, Activity, Settings2, MapPin, Clock, ChevronRight, Target, AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine } from "recharts"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

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

// HELPER: Convert time format like "00:30:12" or "30.5" to seconds
const parseTimeToSeconds = (timeStr: string) => {
  if (!timeStr) return 0;
  if (timeStr.includes(":")) {
    const parts = timeStr.split(":");
    if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
    }
  }
  return parseFloat(timeStr) || 0;
}

const kuLimits: Record<string, number> = {
  "Bebas": 28.50,
  "Kupu": 30.20,
  "Punggung": 31.80,
  "Dada": 35.00
}

export default function PrestasiPage() {
  const router = useRouter()

  const [selectedYear, setSelectedYear] = useState("2026")
  const [selectedStroke, setSelectedStroke] = useState("Bebas")
  
  // Modal state for Interactive Radar Chart
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null)

  const currentLimit = kuLimits[selectedStroke] || 30.00;

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
    { id: 1, event: "KRAPSSI 2026", date: "15 Jun 2026", stroke: "Bebas", distance: "25 M", time: "00:00:12" }, // format was 00:12:34 which is 12 hours? Let's fix to seconds for 50m
    { id: 2, event: "O2SN Provinsi 2026", date: "10 Mei 2026", stroke: "Bebas", distance: "50 M", time: "00:00:30" }, // 30s
    { id: 3, event: "Kejurda Jabar 2026", date: "02 Mar 2026", stroke: "Dada", distance: "50 M", time: "00:00:38" }, // 38s
    { id: 4, event: "Indonesia Open 2026", date: "12 Feb 2026", stroke: "Punggung", distance: "100 M", time: "00:01:15" },
    { id: 5, event: "KRAPSSI 2025", date: "15 Jun 2025", stroke: "Bebas", distance: "50 M", time: "00:00:27" }, // 27s (Lolos Limit!)
    { id: 6, event: "KRAPSSI 2026", date: "16 Jun 2026", stroke: "Kupu", distance: "50 M", time: "00:00:35" },
    { id: 14, event: "O2SN Nasional 2026", date: "20 Des 2026", stroke: "Bebas", distance: "50 M", time: "00:00:28" }, // 28s (Lolos Limit!)
  ]

  const filteredResults = allChampionshipResults.filter(
    (r) => r.stroke === selectedStroke && r.date.includes(selectedYear)
  )

  return (
    <div className="flex flex-col min-h-[100dvh] w-full pb-20 bg-transparent relative z-0" suppressHydrationWarning>
      
      {/* Header */}
      <GlobalHeader variant="pages" title="Prestasi & Rekor" />

      {/* ==========================================
          STAGNATION & HOME TREATMENT ALERT
          ========================================== */}
      <div className="px-4 mt-4 mb-4">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex gap-3 shadow-sm relative overflow-hidden backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-amber-900 dark:text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-2">
              Status Performa: Stagnan
              <Badge className="bg-amber-500 text-white border-none text-[8px] h-4 py-0 px-1">3 Bulan</Badge>
            </h3>
            <p className="text-[11px] text-amber-800/80 dark:text-amber-500/80 leading-relaxed font-medium mb-3">
              Analisis: Penurunan atribut <b>Stamina (70%)</b>. Tingkat penyelesaian Main Set bulan ini hanya 72% akibat tingginya rasio <i>Kelelahan Fisik Ekstrem</i>.
            </p>
            <Button onClick={() => router.push('/athlete/training?tab=personal')} className="h-8 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 rounded-lg shadow-amber-500/20 shadow-lg">
              Mulai Home Treatment
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4">
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4 bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-border/50 p-1 rounded-xl">
            <TabsTrigger value="program" className="rounded-lg text-[11px] font-bold data-[state=active]:bg-white dark:bg-card/60 backdrop-blur-md data-[state=active]:text-[#ff4b4b] shadow-xl/30">
              Program
            </TabsTrigger>
            <TabsTrigger value="time-trial" className="rounded-lg text-[11px] font-bold data-[state=active]:bg-white dark:bg-card/60 backdrop-blur-md data-[state=active]:text-[#ff4b4b] shadow-xl/30">
              Time Trial
            </TabsTrigger>
            <TabsTrigger value="kejuaraan" className="rounded-lg text-[11px] font-bold data-[state=active]:bg-white dark:bg-card/60 backdrop-blur-md data-[state=active]:text-[#ff4b4b] shadow-xl/30">
              Kejuaraan
            </TabsTrigger>
          </TabsList>

          {/* TAB: PROGRAM LATIHAN */}
          <TabsContent value="program" className="space-y-6 outline-none">
            {/* 1. RADAR CHART (INTERACTIVE) */}
            <Card className="border border-slate-200 dark:border-border/50 bg-white dark:bg-card/40 backdrop-blur-md shadow-xl/30">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#ff4b4b]" /> Atribut Atlet
                  </span>
                  <Badge variant="outline" className="text-[8px] bg-blue-500/10 text-blue-500 border-none font-bold">INTERAKTIF</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 relative">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      cx="50%" cy="50%" outerRadius="75%" data={radarData}
                      onClick={(e) => {
                        if (e && e.activeLabel) setSelectedAttribute(e.activeLabel)
                      }}
                      className="cursor-pointer"
                    >
                      <PolarGrid stroke="#2a293d" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Ability" dataKey="A" stroke="#ff4b4b" fill="#ff4b4b" fillOpacity={0.4} />
                      <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(31, 30, 46, 0.9)' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[9px] text-center text-slate-500 dark:text-slate-400 absolute bottom-2 w-full left-0 font-medium">
                  Ketuk salah satu atribut (e.g. Stamina) untuk melihat analisis.
                </p>
              </CardContent>
            </Card>

            {/* 2. SKORING TEKNIK */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                  <Activity className="h-4 w-4 text-[#ff4b4b]" /> Analisis Teknik per Gaya
                </h3>
              </div>
              <div className="bg-[#ff4b4b]/10 p-2.5 rounded-lg flex gap-2 items-start border border-[#ff4b4b]/20 mb-2">
                <Settings2 className="h-4 w-4 text-[#ff4b4b] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#ff4b4b] font-medium leading-relaxed">
                  *Komponen disinkronisasi dinamis dari target kurikulum Pusat.
                </p>
              </div>

              <Tabs defaultValue={styleBreakdown[0].short} className="w-full">
                <ScrollArea className="w-full whitespace-nowrap mb-3">
                  <TabsList className="w-max flex bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-border/50 p-1 rounded-xl">
                    {styleBreakdown.map((style, idx) => (
                      <TabsTrigger 
                        key={idx} 
                        value={style.short}
                        className="text-[11px] py-1.5 px-4 data-[state=active]:bg-white dark:bg-card/60 backdrop-blur-md data-[state=active]:text-[#ff4b4b] data-[state=active]: font-bold transition-all shadow-xl/30"
                      >
                        {style.short}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>

                {styleBreakdown.map((style, idx) => (
                  <TabsContent key={idx} value={style.short} className="bg-white dark:bg-card/40 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-border/50 mt-0 space-y-3 shadow-xl/30">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 border-b border-slate-200 dark:border-border/50 pb-2">{style.name}</h4>
                    {style.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-500 dark:text-slate-400">{metric.label}</span>
                          <span className={metric.value >= 90 ? 'text-[#ff4b4b]' : 'text-slate-900 dark:text-white'}>{metric.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-secondary/40 rounded-full overflow-hidden">
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
            <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-border/50">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-widest">
                <Activity className="h-4 w-4 text-[#ff4b4b]" /> Histori Program Latihan
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
                  <Card key={session.id} className="border border-slate-200 dark:border-border/50 bg-white dark:bg-card/60 backdrop-blur-md overflow-hidden relative shadow-xl/30">
                    <div className={`absolute left-0 top-0 w-1.5 h-full ${isTuntas ? 'bg-emerald-500' : 'bg-[#ff4b4b]'}`} />
                    <CardContent className="p-0">
                      <div className="p-4 pl-5">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Latihan : {session.timeAgo}</p>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-3">{session.session}</h3>
                        
                        <div className="flex gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{session.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{session.duration}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-secondary/40 p-3 rounded-xl border border-slate-200 dark:border-border/50">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                              Status: {isTuntas ? <span className="text-emerald-600">Tuntas</span> : <span className="text-[#ff4b4b]">Belum Tuntas</span>}
                            </span>
                            <span className={`text-[10px] font-black ${isTuntas ? 'text-emerald-600' : 'text-slate-600 dark:text-slate-300'}`}>
                              {completionRate}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-700 ${isTuntas ? 'bg-emerald-500' : 'bg-[#ff4b4b]'}`}
                              style={{ width: `${completionRate}%` }} 
                            />
                          </div>
                        </div>
                      </div>

                      <div 
                        onClick={() => router.push(`/athlete/training/${session.id}?type=program`)}
                        className="bg-slate-50 dark:bg-secondary/40 border-t border-slate-200 dark:border-border/50 p-3 flex justify-center items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-secondary/60 transition-colors group"
                      >
                        <span className="text-xs font-bold text-[#ff4b4b] group-hover:text-red-500 flex items-center">
                          Lihat Detail <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </section>
          </TabsContent>

          {/* TAB: TIME TRIAL & KEJUARAAN (Identical in Structure but different contexts) */}
          {["time-trial", "kejuaraan"].map(tabType => (
            <TabsContent key={tabType} value={tabType} className="space-y-4 outline-none">
              
              {tabType === "kejuaraan" && (
                <Button onClick={() => router.push('/athlete/prestasi/input')} className="w-full bg-[#ff4b4b] hover:bg-[#ff4b4b]/90 text-white rounded-xl h-12 font-bold shadow-[0_0_15px_rgba(255,75,75,0.4)]">
                  <Plus className="h-5 w-5 mr-2" />
                  Input Manual Kejuaraan
                </Button>
              )}

              {/* Filter Gaya */}
              <div className="mb-3">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-2 p-1">
                    {Object.keys(kuLimits).map(gaya => (
                      <Button 
                        key={gaya}
                        variant={selectedStroke === gaya ? "default" : "outline"}
                        className={`rounded-full h-8 px-4 text-[11px] font-bold ${selectedStroke === gaya ? 'bg-[#ff4b4b] text-white shadow-[0_0_8px_#ff4b4b]' : 'bg-white dark:bg-card/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-border/50'}`}
                        onClick={() => setSelectedStroke(gaya)}
                      >
                        Gaya {gaya}
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
              </div>

              {/* Chart dengan Limit KU */}
              <div className="bg-white dark:bg-card/40 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-border/50 shadow-xl/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                    Tren Waktu (Detik)
                  </h3>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-border/50 rounded-lg text-[10px] py-1 px-2 text-slate-600 dark:text-slate-300 font-bold focus:outline-none focus:ring-1 focus:ring-[#ff4b4b] shadow-xl/30"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a293d" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['auto', 'auto']} reversed />
                      <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(31, 30, 46, 0.9)', color: '#fff' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                      
                      {/* GARIS EMAS LIMIT KU */}
                      <ReferenceLine 
                        y={currentLimit} 
                        stroke="#eab308" 
                        strokeDasharray="4 4" 
                        strokeWidth={2}
                        label={{ position: 'insideTopLeft', value: `LIMIT KU: ${currentLimit}s`, fill: '#eab308', fontSize: 10, fontWeight: 900 }} 
                      />

                      <Line type="monotone" name="Tahun Berjalan" dataKey="thisYear" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" name="Tahun Lalu" dataKey="lastYear" stroke="#475569" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabel Hasil */}
              <div className="bg-white dark:bg-card/40 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-border/50 overflow-hidden shadow-xl/30">
                <div className="p-3 bg-slate-50 dark:bg-secondary/40 border-b border-slate-200 dark:border-border/50 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">
                    Hasil {tabType === 'kejuaraan' ? 'Perlombaan' : 'Time Trial'}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white dark:bg-card/60 border-b border-slate-200 dark:border-border/50">
                      <tr>
                        <th className="px-3 py-2.5 font-bold text-slate-500 dark:text-slate-400">Jarak</th>
                        <th className="px-3 py-2.5 font-bold text-slate-500 dark:text-slate-400 text-center">Rekor Waktu</th>
                        <th className="px-3 py-2.5 font-bold text-slate-500 dark:text-slate-400 text-center">Status KU</th>
                        <th className="px-3 py-2.5 font-bold text-slate-500 dark:text-slate-400">Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.length > 0 ? (
                        filteredResults.map((record) => {
                          const timeInSecs = parseTimeToSeconds(record.time);
                          const isLolos = timeInSecs > 0 && timeInSecs <= currentLimit;
                          const selisih = timeInSecs > 0 ? (timeInSecs - currentLimit).toFixed(2) : "0.00";

                          return (
                            <tr key={record.id} className="border-b border-slate-200 dark:border-border/50 hover:bg-slate-50 dark:hover:bg-secondary/30">
                              <td className="px-3 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">{record.distance} {record.stroke}</td>
                              <td className="px-3 py-3 text-center whitespace-nowrap">
                                <span className="font-bold text-[#ff4b4b] bg-[#ff4b4b]/10 px-2 py-1 rounded border border-[#ff4b4b]/30">
                                  {record.time}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-center whitespace-nowrap">
                                {isLolos ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/30 text-[9px] uppercase tracking-wider font-bold rounded-md">
                                    Lolos Limit
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-slate-500 dark:text-slate-400 border-slate-200 dark:border-border/50 text-[9px] uppercase tracking-wider font-bold rounded-md">
                                    +{selisih} s
                                  </Badge>
                                )}
                              </td>
                              <td className="px-3 py-3 text-slate-500 dark:text-slate-400 font-medium">{record.event}</td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-3 py-6 text-center text-slate-500 dark:text-slate-400 font-medium">
                            Tidak ada data untuk filter ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* ==========================================
          SHEET MODAL: INTERACTIVE RADAR INSIGHTS
          ========================================== */}
      <Sheet open={!!selectedAttribute} onOpenChange={(open) => !open && setSelectedAttribute(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-12 pt-6 bg-white dark:bg-[#1f1e2e] border-t border-slate-200 dark:border-[#2a293d]">
          <SheetHeader className="border-b border-slate-200 dark:border-[#2a293d] pb-4 mb-5 text-left">
            <SheetTitle className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#ff4b4b]" /> Analisis: {selectedAttribute}
            </SheetTitle>
          </SheetHeader>
          
          <div className="space-y-5">
            {selectedAttribute === 'Stamina' ? (
              <>
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4">
                  <h4 className="text-[11px] font-bold text-amber-900 dark:text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3" /> Mengapa Stamina 70%?
                  </h4>
                  <p className="text-xs font-medium text-amber-900/80 dark:text-amber-400/80 leading-relaxed">
                    Data 30 hari terakhir menunjukkan Anda melewatkan / gagal di <b>5 program ketahanan</b> (Main Set). Tag alasan terbanyak yang dikonfirmasi oleh Coach adalah: <i>Kelelahan Fisik Ekstrem</i>.
                  </p>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4">
                  <h4 className="text-[11px] font-bold text-emerald-900 dark:text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Target className="h-3 w-3" /> Solusi Pemulihan
                  </h4>
                  <p className="text-xs font-medium text-emerald-900/80 dark:text-emerald-400/80 leading-relaxed mb-4">
                    Coach menyarankan agar Anda mengurangi beban latihan statis dan fokus pada peregangan otot dinamis (Dynamic Stretching). Menu Home Treatment ini sudah ditambahkan ke Personal Training Anda.
                  </p>
                  <Button 
                    onClick={() => router.push('/athlete/training?tab=personal')} 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold tracking-widest text-[10px] uppercase h-10 shadow-emerald-500/25 shadow-lg"
                  >
                    Buka Menu Home Treatment
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 dark:bg-secondary/40 border border-slate-200 dark:border-border/50 rounded-2xl p-4 text-center">
                <Trophy className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Performa {selectedAttribute} Optimal</h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                  Tidak ada anomali atau stagnasi pada metrik ini. Terus pertahankan ritme latihan Anda!
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

    </div>
  )
}
