"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Trophy, Clock, Target, UserCircle, Activity, Medal, Settings2, CheckCircle2, ChevronRight, MapPin, Check, Timer } from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ==========================================
// DUMMY DATA: ATLET & STATISTIK
// ==========================================
const athlete = { 
  id: "ath-1",
  name: "Bima Arya 'The Torpedo' Wibowo", 
  ku: "KU 1", 
  level: "Elite (Nasional)",
  photo: "https://i.pravatar.cc/150?u=bimaarya",
  specialty: "Sprint Freestyle"
}

const radarData = [
  { subject: 'Speed', A: 95 },
  { subject: 'Stamina', A: 85 },
  { subject: 'Turn', A: 75 },
  { subject: 'Start', A: 90 },
  { subject: 'Technique', A: 88 },
]

// SKORING 4 GAYA 
const styleBreakdown = [
  {
    name: "Gaya Bebas (Freestyle)",
    short: "Bebas",
    metrics: [
      { label: "Stroke / Tarikan", value: 88 },
      { label: "Kick / Kaki", value: 92 },
      { label: "Breath / Napas", value: 80 },
      { label: "Start / Breakout", value: 95 },
      { label: "Underwater Kicks", value: 85 },
      { label: "Turn Efficiency", value: 75 },
    ]
  },
  {
    name: "Gaya Kupu-kupu (Butterfly)",
    short: "Kupu-kupu",
    metrics: [
      { label: "Stroke Mechanics", value: 85 },
      { label: "Dolphin Kick", value: 90 },
      { label: "Breathing Timing", value: 78 },
      { label: "Start / Breakout", value: 92 },
      { label: "Underwater Transition", value: 85 },
      { label: "Turn Efficiency", value: 70 },
    ]
  },
  {
    name: "Gaya Punggung (Backstroke)",
    short: "Punggung",
    metrics: [
      { label: "Body Rotation", value: 82 },
      { label: "Kicking Power", value: 85 },
      { label: "Start (Backstroke)", value: 80 },
      { label: "Underwater Kicks", value: 88 },
      { label: "Turn Efficiency", value: 78 },
    ]
  },
  {
    name: "Gaya Dada (Breaststroke)",
    short: "Dada",
    metrics: [
      { label: "Pull Mechanics", value: 75 },
      { label: "Whip Kick Power", value: 80 },
      { label: "Glide Timing", value: 78 },
      { label: "Pullout (Underwater)", value: 82 },
      { label: "Turn Efficiency", value: 75 },
    ]
  }
]
const chartData = [
  { month: 'Jan', lastYear: 35.1, thisYear: 32.4 }, { month: 'Feb', lastYear: 34.8, thisYear: 31.9 }, { month: 'Mar', lastYear: 34.5, thisYear: 31.5 },
  { month: 'Apr', lastYear: 34.2, thisYear: 30.8 }, { month: 'Mei', lastYear: 34.0, thisYear: 30.2 }, { month: 'Jun', lastYear: 33.5, thisYear: 29.8 },
  { month: 'Jul', lastYear: 33.2, thisYear: null }, { month: 'Agt', lastYear: 33.0, thisYear: null }, { month: 'Sep', lastYear: 32.9, thisYear: null },
  { month: 'Okt', lastYear: 32.6, thisYear: null }, { month: 'Nov', lastYear: 32.5, thisYear: null }, { month: 'Des', lastYear: 32.2, thisYear: null },
]

const allChampionshipResults = [
  { id: 1, event: "KRAPSSI 2026", date: "15 Jun 2026", stroke: "Bebas", distance: "25 M", time: "00:12:34" },
  { id: 2, event: "O2SN Provinsi 2026", date: "10 Mei 2026", stroke: "Bebas", distance: "50 M", time: "00:30:12" },
  { id: 3, event: "Kejurda Jabar 2026", date: "02 Mar 2026", stroke: "Dada", distance: "50 M", time: "00:45:20" },
  { id: 4, event: "Indonesia Open 2026", date: "12 Feb 2026", stroke: "Punggung", distance: "100 M", time: "01:15:30" },
  { id: 5, event: "KRAPSSI 2025", date: "15 Jun 2025", stroke: "Bebas", distance: "50 M", time: "00:33:10" },
  { id: 6, event: "KRAPSSI 2026", date: "16 Jun 2026", stroke: "Kupu", distance: "50 M", time: "00:35:10" },
]

const historyProgramDetailed = [
  { 
    id: 1, 
    session: "The Blue Mile 🐟",
    timeAgo: "3 minutes ago",
    distance: "1,500 m",
    duration: "42 min",
    groups: [
      {
        name: "WARM UP",
        drills: [
          { id: 101, name: "1 × 300 Free", target: "@ 6:00", isDone: true, color: "bg-emerald-500" },
          { id: 102, name: "1 × 200 IM", target: "@ 4:00", isDone: false, color: "bg-emerald-500" },
        ]
      },
      {
        name: "MAIN SET",
        drills: [
          { id: 103, name: "4 × 100 Free", target: "@ 1:50", isDone: false, color: "bg-red-600" },
          { id: 104, name: "4 × 50 Stroke", target: "@ 1:00", isDone: false, color: "bg-pink-500" },
        ]
      }
    ]
  },
  {
    id: 2,
    session: "Sprint Endurance 🔥",
    timeAgo: "2 days ago",
    distance: "800 m",
    duration: "30 min",
    groups: [
      {
        name: "MAIN SET",
        drills: [
          { id: 201, name: "8 × 100 Freestyle", target: "@ 1:15", isDone: true, color: "bg-red-600" }
        ]
      }
    ]
  }
]

export default function AthleteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  
  const [selectedYear, setSelectedYear] = useState("2026")
  const [selectedStroke, setSelectedStroke] = useState("Bebas")

  const filteredResults = allChampionshipResults.filter(
    (r) => r.stroke === selectedStroke && r.date.includes(selectedYear)
  )

  return (
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      
      <GlobalHeader variant="subpage" title="Detail Atlet" />

      <main className="flex-1 px-4 md:px-6 pt-5 pb-28 space-y-6 w-full">
        
        {/* ==========================================
            1. HEADER PROFIL & BIODATA LINK
            ========================================== */}
        <section className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-xl/30">
          <Avatar className="h-20 w-20 ring-4 ring-primary/20 shadow-xl/30">
            <AvatarImage src={athlete.photo} alt={athlete.name} className="object-cover" />
            <AvatarFallback className="bg-primary text-primary-foreground font-black text-2xl">
              {athlete.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg text-foreground leading-tight truncate uppercase tracking-widest">{athlete.name}</h1>
            <div className="flex flex-wrap gap-1.5 mt-1.5 mb-3">
              <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">{athlete.level}</Badge>
              <Badge variant="outline" className="border-border text-muted-foreground">{athlete.ku}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-[10px] w-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
              onClick={() => router.push(`/coach/athletes/${resolvedParams.id}/biodata`)}
            >
              <UserCircle className="mr-1.5 h-3.5 w-3.5" /> Lihat Biodata Lengkap
            </Button>
          </div>
        </section>

        {/* ==========================================
            TABS: SLIDER PROGRAM & KEJUARAAN
            ========================================== */}
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-primary p-1 rounded-full mb-2">
            <TabsTrigger value="program" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]: font-bold transition-all rounded-full text-primary-foreground shadow-xl/30">
              Program
            </TabsTrigger>
            <TabsTrigger value="time-trial" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]: font-bold transition-all rounded-full text-primary-foreground shadow-xl/30">
              Time Trial
            </TabsTrigger>
            <TabsTrigger value="kejuaraan" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]: font-bold transition-all rounded-full text-primary-foreground shadow-xl/30">
              Kejuaraan
            </TabsTrigger>
          </TabsList>

          {/* ==========================================
              TAB PROGRAM LATIHAN
              ========================================== */}
          <TabsContent value="program" className="space-y-6 outline-none">
            
            {/* 2. RADAR CHART (OVERALL FM STYLE) */}
            <Card className="border-border bg-card shadow-xl/30">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" /> Atribut Kemampuan Atlet
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#2a293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Ability" dataKey="A" stroke="#ff4b4b" fill="#ff4b4b" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ==========================================
            3. SKORING TEKNIK (TABS MODE)
            ========================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Analisis Teknik per Gaya
            </h3>
          </div>
          <div className="bg-primary/10 p-2.5 rounded-lg flex gap-2 items-start border border-primary/20 mb-2">
            <Settings2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-primary/90 font-medium leading-relaxed">
              *Komponen penilaian disinkronisasi dinamis dari target kurikulum Pusat.
            </p>
          </div>

          {/* Menggunakan Tabs dengan ScrollArea agar muat di layar HP */}
          <Tabs defaultValue={styleBreakdown[0].short} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap mb-3">
              <TabsList className="w-full grid grid-cols-4 bg-muted/30 p-1 rounded-full border border-border gap-1">
                {styleBreakdown.map((style, idx) => (
                  <TabsTrigger 
                    key={idx} 
                    value={style.short}
                    className="text-[11px] py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]: font-bold transition-all rounded-full w-full text-muted-foreground shadow-xl/30"
                  >
                    {style.short}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>

            {styleBreakdown.map((style, idx) => (
              <TabsContent key={idx} value={style.short} className="bg-card p-4 rounded-xl border border-border mt-0 space-y-3 shadow-xl/30">
                <h4 className="font-bold text-xs text-foreground uppercase tracking-widest mb-2 border-b border-border pb-2">{style.name}</h4>
                {style.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className={metric.value >= 90 ? 'text-primary' : 'text-foreground'}>{metric.value}%</span>
                    </div>
                    {/* Manual Progress Bar biar nggak kena Hydration Error */}
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${metric.value >= 90 ? 'bg-primary' : 'bg-muted-foreground'}`}
                        style={{ width: `${metric.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>

          {/* 4. DAFTAR PROGRAM LATIHAN */}
          <section className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" /> Histori Program Latihan
            </h3>
            {historyProgramDetailed.map((session) => {
                // Hitung Completion Rate
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
                  <Card key={session.id} className="border border-border bg-card overflow-hidden relative shadow-xl/30">
                    <div className={`absolute left-0 top-0 w-1.5 h-full ${isTuntas ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <CardContent className="p-0">
                      
                      {/* Header Info */}
                      <div className="p-4 pl-5">
                        <p className="text-[10px] font-bold text-muted-foreground mb-1">Latihan : {session.timeAgo}</p>
                        <h3 className="text-lg font-black text-foreground uppercase tracking-widest leading-tight mb-3">{session.session}</h3>
                        
                        <div className="flex gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground/50" />
                            <span className="text-xs font-bold text-foreground">{session.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground/50" />
                            <span className="text-xs font-bold text-foreground">{session.duration}</span>
                          </div>
                        </div>

                        {/* Progress Status */}
                        <div className="bg-muted/30 p-3 rounded-xl border border-border">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              Status: {isTuntas ? <span className="text-emerald-500">Tuntas</span> : <span className="text-red-500">Belum Tuntas</span>}
                            </span>
                            <span className={`text-[10px] font-black ${isTuntas ? 'text-emerald-500' : 'text-foreground'}`}>
                              {completionRate}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-700 ${isTuntas ? 'bg-emerald-500' : 'bg-red-500'}`}
                              style={{ width: `${completionRate}%` }} 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div 
                        onClick={() => router.push(`/coach/athletes/${resolvedParams.id}/program/${session.id}`)}
                        className="bg-muted/30 border-t border-border p-3 flex justify-center items-center cursor-pointer hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-xs font-bold text-primary group-hover:text-primary/80 flex items-center uppercase tracking-widest">
                          Lihat Detail <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </section>
          </TabsContent>

          <TabsContent value="time-trial" className="space-y-4 outline-none">
              {/* Filter Gaya: Tabbed */}
              <div className="mb-3">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="w-full grid grid-cols-4 gap-1 bg-muted/30 p-1 rounded-full border border-border">
                    {["Bebas", "Dada", "Punggung", "Kupu"].map(gaya => (
                      <Button 
                        key={gaya}
                        variant="ghost"
                        className={`rounded-full h-8 w-full text-[11px] font-bold transition-all ${selectedStroke === gaya ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/50'}`}
                        onClick={() => setSelectedStroke(gaya)}
                      >
                        {gaya}
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
              </div>

              {/* Chart */}
              <div className="bg-card p-4 rounded-2xl border border-border shadow-xl/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Tren Waktu Time Trial (Detik)</h3>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-muted/30 border border-border rounded-lg text-[10px] py-1 px-2 text-foreground font-bold focus:outline-none focus:ring-1 focus:ring-primary shadow-xl/30"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a293b" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa' }} domain={['auto', 'auto']} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#1f1e2e', color: '#fff', fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                      <Line type="monotone" name="Tahun Berjalan" dataKey="thisYear" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" name="Tahun Lalu" dataKey="lastYear" stroke="#a1a1aa" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabel Hasil Time Trial */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl/30">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Semua Hasil Time Trial</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-card border-b border-border">
                      <tr>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase tracking-widest">Nomor Jarak</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground text-center uppercase tracking-widest">Time Record</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase tracking-widest">Nama Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.length > 0 ? (
                        filteredResults.map((record) => (
                          <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                            <td className="px-3 py-3 font-semibold text-foreground">{record.distance} {record.stroke}</td>
                            <td className="px-3 py-3 text-center">
                              <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                {record.time}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-muted-foreground">Time Trial Rutin</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground font-medium">
                            Tidak ada data untuk filter ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
          </TabsContent>

          <TabsContent value="kejuaraan" className="space-y-4 outline-none">
              
              {/* Filter Gaya: Tabbed */}
              <div className="mb-3">
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="w-full grid grid-cols-4 gap-1 bg-muted/30 p-1 rounded-full border border-border">
                    {["Bebas", "Dada", "Punggung", "Kupu"].map(gaya => (
                      <Button 
                        key={gaya}
                        variant="ghost"
                        className={`rounded-full h-8 w-full text-[11px] font-bold transition-all ${selectedStroke === gaya ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90' : 'text-muted-foreground hover:bg-muted/50'}`}
                        onClick={() => setSelectedStroke(gaya)}
                      >
                        {gaya}
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="hidden" />
                </ScrollArea>
              </div>

              {/* Chart */}
              <div className="bg-card p-4 rounded-2xl border border-border shadow-xl/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Tren Waktu (Detik)</h3>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-muted/30 border border-border rounded-lg text-[10px] py-1 px-2 text-foreground font-bold focus:outline-none focus:ring-1 focus:ring-primary shadow-xl/30"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a293b" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa' }} domain={['auto', 'auto']} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#1f1e2e', color: '#fff', fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                      <Line type="monotone" name="Tahun Berjalan" dataKey="thisYear" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" name="Tahun Lalu" dataKey="lastYear" stroke="#a1a1aa" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tabel Hasil Perlombaan */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl/30">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Semua Hasil Perlombaan</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-card border-b border-border">
                      <tr>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase tracking-widest">Nomor Kejuaraan</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground text-center uppercase tracking-widest">Time Record</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase tracking-widest">Nama Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.length > 0 ? (
                        filteredResults.map((record) => (
                          <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                            <td className="px-3 py-3 font-semibold text-foreground">{record.distance} {record.stroke}</td>
                            <td className="px-3 py-3 text-center">
                              <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                {record.time}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-muted-foreground">{record.event}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground font-medium">
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

      </main>
    </div>
  )
}