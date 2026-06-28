"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, ChevronRight, Search, Filter, LineChart as ChartIcon, Sparkles, PieChart as PieChartIcon, AlertCircle, TrendingUp, Flame } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from "recharts"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// ==========================================
// DUMMY DATA ATLET PARISAKTI
// ==========================================
type Level = "LTHS" | "Basic 1" | "Basic 2" | "Elite" | "RJ" | "RS"
type KU = "KU 1" | "KU 2" | "KU 3" | "KU 4" | "KU 5"

interface Athlete {
  id: string
  name: string
  gender: "L" | "P"
  age: number
  ku: KU
  level: Level
  specialty: string
  status: "Aktif" | "Cuti"
  trainingDuration: string
  gap: string
}

const psscAthletes: Athlete[] = [
  { id: "ath-1", name: "Bima Arya Wibowo", gender: "L", age: 17, ku: "KU 1", level: "Elite", specialty: "Sprint Free", status: "Aktif", trainingDuration: "4 Thn 2 Bln", gap: "-0.40s" },
  { id: "ath-2", name: "Rara Kirana", gender: "P", age: 15, ku: "KU 2", level: "Elite", specialty: "Butterfly", status: "Aktif", trainingDuration: "3 Thn", gap: "+0.15s" },
  { id: "ath-3", name: "Sakti Mahesa", gender: "L", age: 13, ku: "KU 3", level: "LTHS", specialty: "IM", status: "Aktif", trainingDuration: "2 Thn 5 Bln", gap: "+1.20s" },
  { id: "ath-4", name: "Dinda Aulia", gender: "P", age: 10, ku: "KU 4", level: "Basic 2", specialty: "Backstroke", status: "Aktif", trainingDuration: "1 Thn", gap: "+2.50s" },
  { id: "ath-5", name: "Kevin Sanjaya", gender: "L", age: 9, ku: "KU 5", level: "Basic 1", specialty: "Freestyle", status: "Aktif", trainingDuration: "8 Bln", gap: "+4.10s" },
  { id: "ath-6", name: "Rizky Pratama", gender: "L", age: 16, ku: "KU 1", level: "RJ", specialty: "Breaststroke", status: "Cuti", trainingDuration: "2 Thn 1 Bln", gap: "+0.80s" },
  { id: "ath-7", name: "Nadia Putri", gender: "P", age: 14, ku: "KU 2", level: "RS", specialty: "Freestyle", status: "Aktif", trainingDuration: "1 Thn 5 Bln", gap: "+1.80s" },
]

const filterLevels = ["ALL", "LTHS", "Basic 1", "Basic 2", "Elite", "RJ", "RS"]

// ==========================================
// DUMMY DATA INSIGHT & REKOMENDASI
// ==========================================
const attendanceData = [
  { name: 'W1', present: 85 },
  { name: 'W2', present: 88 },
  { name: 'W3', present: 92 },
  { name: 'W4', present: 80 },
  { name: 'W5', present: 95 },
]

const specialtyData = [
  { name: 'Freestyle', value: 45, color: '#3b82f6' }, // blue-500
  { name: 'Butterfly', value: 20, color: '#a855f7' }, // purple-500
  { name: 'Breaststroke', value: 15, color: '#ec4899' }, // pink-500
  { name: 'Backstroke', value: 10, color: '#f59e0b' }, // amber-500
  { name: 'IM', value: 10, color: '#10b981' }, // emerald-500
]

const recommendations = [
  { id: 1, name: "Sakti Mahesa", currentLevel: "LTHS", targetLevel: "Basic 1", score: 92 },
  { id: 2, name: "Kevin Sanjaya", currentLevel: "Basic 1", targetLevel: "Basic 2", score: 88 },
]

export default function AthletesPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter Logic
  const filteredAthletes = psscAthletes.filter(ath => {
    const matchLevel = activeFilter === "ALL" || ath.level === activeFilter
    const matchSearch = ath.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchLevel && matchSearch
  })

  // Statistik Kalkulasi
  const totalAthletes = psscAthletes.length
  const totalMale = psscAthletes.filter(a => a.gender === "L").length
  const totalFemale = psscAthletes.filter(a => a.gender === "P").length
  const pctMale = (totalMale / totalAthletes) * 100
  const pctFemale = (totalFemale / totalAthletes) * 100

  return (
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      <GlobalHeader variant="pages" title="Athletes" />

      <main className="flex-1 px-4 md:px-6 lg:px-8 pt-5 pb-28 space-y-6 w-full">
        
        {/* STATISTIK ATLET (OVERVIEW) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Statistik Binaan Parisakti</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg/30">
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary-foreground/80" />
                  <p className="text-[10px] font-semibold text-primary-foreground uppercase tracking-wider">Total Atlet</p>
                </div>
                <p className="text-3xl font-black tracking-tighter">{totalAthletes} <span className="text-xs font-normal text-primary-foreground/80">Orang</span></p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-lg/30">
              <CardContent className="p-4 space-y-3">
                {/* Custom Progress Bar Laki-laki */}
                <div>
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1.5">
                        <span>Laki-laki (L)</span>
                        <span>{totalMale}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all" style={{ width: `${pctMale}%` }} />
                    </div>
                </div>

                {/* Custom Progress Bar Perempuan */}
                <div>
  <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1.5">
    <span>Perempuan (P)</span>
    <span>{totalFemale}</span>
  </div>
  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
    <div className="h-full bg-pink-500 transition-all" style={{ width: `${pctFemale}%` }} />
  </div>
</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ==========================================
            INSIGHT & REKOMENDASI CAROUSEL
            ========================================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Insight & Rekomendasi
            </h2>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap pb-8 pt-4 -mt-4">
            <div className="flex w-max space-x-4">
              
              {/* Grafik Tingkat Kehadiran */}
              <Card className="w-[300px] border-border bg-card shrink-0 shadow-lg/30">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <ChartIcon className="h-3.5 w-3.5 text-blue-500" />
                    Kehadiran Latihan (5 Minggu)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 h-[120px] pb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={attendanceData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#a1a1aa' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#1f1e2e', color: '#fff', borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="present" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Grafik Jenis Gaya */}
              <Card className="w-[280px] border-border bg-card shrink-0 shadow-lg/30">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <PieChartIcon className="h-3.5 w-3.5 text-purple-500" />
                    Distribusi Spesialisasi Gaya
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex h-[120px] items-center">
                  <div className="h-full w-1/2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={specialtyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          dataKey="value"
                          stroke="none"
                        >
                          {specialtyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 flex flex-col justify-center gap-1.5 pr-4">
                    {specialtyData.slice(0,4).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: spec.color }}></div>
                        <span className="text-[9px] font-semibold text-muted-foreground truncate">{spec.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rekomendasi Promosi */}
              <Card className="w-[300px] border-border bg-card shrink-0 shadow-lg/30">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Saran Promosi Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="flex items-center justify-between p-2.5 bg-muted/30 border border-border rounded-xl">
                      <div>
                        <p className="text-[11px] font-bold text-foreground">{rec.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[9px] font-semibold text-muted-foreground">{rec.currentLevel}</span>
                          <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/50" />
                          <span className="text-[9px] font-bold text-amber-600">{rec.targetLevel}</span>
                        </div>
                      </div>
                      <Badge 
                        onClick={() => router.push('/coach/monitoring')}
                        className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-amber-500/30 text-[10px] shadow-xl/30 cursor-pointer"
                      >
                        Review
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>

        {/* PENCARIAN & SLIDER FILTER KELAS/LEVEL */}
        <section className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama atlet..." 
              className="pl-9 h-10 bg-muted/30 border-border text-xs focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-2 p-1">
                {filterLevels.map((lvl) => (
                  <Badge
                    key={lvl}
                    variant="outline"
                    className={`cursor-pointer px-4 py-1.5 text-[11px] font-semibold transition-all border-none ${
                      activeFilter === lvl 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "bg-card text-muted-foreground border border-border hover:bg-accent"
                    }`}
                    onClick={() => setActiveFilter(lvl)}
                  >
                    {lvl}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>
        </section>

        {/* ==========================================
            WATCHLIST: BREAKTHROUGH & STAGNANT
            ========================================== */}
        <section className="grid grid-cols-2 gap-3">
          {/* Hampir Pecah Telur */}
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-none shadow-lg text-white rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <Flame className="h-12 w-12" />
            </div>
            <CardContent className="p-4 relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-100 mb-0.5">Hampir Pecah Telur</h3>
                <p className="text-xs font-bold leading-tight mb-3">Limit Nasional <br/> dalam jangkauan</p>
              </div>
              <div className="bg-black/20 rounded-xl p-2 cursor-pointer hover:bg-black/30 transition-colors" onClick={() => router.push('/coach/athletes/ath-1')}>
                <p className="text-[10px] font-bold">Bima Arya Wibowo</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-300" />
                  <span className="text-[9px] font-mono text-emerald-300 font-bold">-0.40s to Target</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stagnan Kritis */}
          <Card className="bg-slate-100 dark:bg-[#1f1e2e] border border-slate-200 dark:border-[#2a293d] shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-0.5 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 text-[#ff4b4b]" /> Stagnan Kritis
                </h3>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight mb-3">Grafik flat &gt; 2 tahun</p>
              </div>
              <div className="bg-white dark:bg-[#161622] rounded-xl p-2 border border-slate-200 dark:border-[#34334a] cursor-pointer hover:border-[#ff4b4b]/50 transition-colors" onClick={() => router.push('/coach/athletes/ath-3')}>
                <p className="text-[10px] font-bold text-slate-900 dark:text-white">Sakti Mahesa</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] font-medium text-slate-500">Masa Latihan</span>
                  <span className="text-[9px] font-bold text-[#ff4b4b]">2 Thn 5 Bln</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* LISTING ATLET (CLICKABLE) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Daftar Atlet ({filteredAthletes.length})</h3>
            <span className="text-[10px] font-medium text-muted-foreground">Ketuk untuk detail</span>
          </div>

          <div className="grid gap-3">
            {filteredAthletes.length > 0 ? (
              filteredAthletes.map((ath) => (
                <div 
                  key={ath.id}
                  onClick={() => router.push(`/coach/athletes/${ath.id}`)}
                  className="flex items-center gap-3 p-3 bg-card border border-border rounded-2xl hover: hover:border-primary/50 transition-all cursor-pointer group shadow-lg/30"
                >
                  <Avatar className="h-12 w-12 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                    <AvatarFallback className={`font-bold text-sm ${ath.gender === 'L' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'}`}>
                      {ath.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-foreground text-sm truncate group-hover:text-primary transition-colors">{ath.name}</h4>
                      {ath.status === "Cuti" && (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground text-[8px] px-1 py-0 border-none h-4">Cuti</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                      <span>{ath.age} Thn</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                      <span className="text-foreground font-bold">{ath.ku}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                      <span>{ath.gender}</span>
                    </div>

                    {/* Masa Latihan & Gap */}
                    <div className="flex gap-3 mt-2">
                      <div className="bg-slate-50 dark:bg-[#161622] px-2 py-1 rounded-md flex flex-col justify-center">
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 mb-0.5">Latihan</span>
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-none">{ath.trainingDuration}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-[#161622] px-2 py-1 rounded-md flex flex-col justify-center">
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 mb-0.5">Gap Limit</span>
                        <span className={`text-[10px] font-bold font-mono leading-none ${ath.gap.startsWith('-') ? 'text-emerald-500' : 'text-[#ff4b4b]'}`}>
                          {ath.gap}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                    <Badge className={`text-[9px] px-2 py-0.5 shadow-none border-none ${ath.level === 'Elite' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                      {ath.level}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center flex flex-col items-center justify-center bg-muted/30 rounded-2xl border border-border border-dashed">
                <Users className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground font-medium">Tidak ada atlet di kelas ini.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}
