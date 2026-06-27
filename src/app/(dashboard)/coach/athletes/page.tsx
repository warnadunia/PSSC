"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, ChevronRight, Search, Filter, LineChart as ChartIcon, Sparkles, PieChart as PieChartIcon } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from "recharts"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

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
}

const psscAthletes: Athlete[] = [
  { id: "ath-1", name: "Bima Arya Wibowo", gender: "L", age: 17, ku: "KU 1", level: "Elite", specialty: "Sprint Free", status: "Aktif" },
  { id: "ath-2", name: "Rara Kirana", gender: "P", age: 15, ku: "KU 2", level: "Elite", specialty: "Butterfly", status: "Aktif" },
  { id: "ath-3", name: "Sakti Mahesa", gender: "L", age: 13, ku: "KU 3", level: "LTHS", specialty: "IM", status: "Aktif" },
  { id: "ath-4", name: "Dinda Aulia", gender: "P", age: 10, ku: "KU 4", level: "Basic 2", specialty: "Backstroke", status: "Aktif" },
  { id: "ath-5", name: "Kevin Sanjaya", gender: "L", age: 9, ku: "KU 5", level: "Basic 1", specialty: "Freestyle", status: "Aktif" },
  { id: "ath-6", name: "Rizky Pratama", gender: "L", age: 16, ku: "KU 1", level: "RJ", specialty: "Breaststroke", status: "Cuti" },
  { id: "ath-7", name: "Nadia Putri", gender: "P", age: 14, ku: "KU 2", level: "RS", specialty: "Freestyle", status: "Aktif" },
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
    <div className="flex flex-col h-full bg-white relative w-full">
      <GlobalHeader variant="pages" title="Athletes" />

      <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pt-5 pb-28 space-y-6 w-full">
        
        {/* STATISTIK ATLET (OVERVIEW) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">Statistik Binaan Parisakti</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-red-600 text-white border-none shadow-md">
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-red-200" />
                  <p className="text-[10px] font-semibold text-red-100 uppercase tracking-wider">Total Atlet</p>
                </div>
                <p className="text-3xl font-black tracking-tighter">{totalAthletes} <span className="text-xs font-normal text-red-200">Orang</span></p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm bg-slate-50/50">
              <CardContent className="p-4 space-y-3">
                {/* Custom Progress Bar Laki-laki */}
                <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1.5">
                        <span>Laki-laki (L)</span>
                        <span>{totalMale}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all" style={{ width: `${pctMale}%` }} />
                    </div>
                </div>

                {/* Custom Progress Bar Perempuan */}
                <div>
  <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1.5">
    <span>Perempuan (P)</span>
    <span>{totalFemale}</span>
  </div>
  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
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
            <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Insight & Rekomendasi
            </h2>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4">
              
              {/* Grafik Tingkat Kehadiran */}
              <Card className="w-[300px] shadow-sm border-slate-100 bg-white shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-2">
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
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="present" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPresent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Grafik Jenis Gaya */}
              <Card className="w-[280px] shadow-sm border-slate-100 bg-white shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-2">
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
                        <span className="text-[9px] font-semibold text-slate-600 truncate">{spec.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rekomendasi Promosi */}
              <Card className="w-[300px] shadow-sm border-slate-100 bg-white shrink-0">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Saran Promosi Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">{rec.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[9px] font-semibold text-slate-500">{rec.currentLevel}</span>
                          <ChevronRight className="h-2.5 w-2.5 text-slate-300" />
                          <span className="text-[9px] font-bold text-amber-600">{rec.targetLevel}</span>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 shadow-none text-[10px]">
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Cari nama atlet..." 
              className="pl-9 h-10 bg-slate-50 border-slate-200 text-xs focus-visible:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-2 p-1">
                {filterLevels.map((lvl) => (
                  <Badge
                    key={lvl}
                    variant="outline"
                    className={`cursor-pointer px-4 py-1.5 text-[11px] font-semibold transition-all border-none ${
                      activeFilter === lvl 
                      ? "bg-red-600 text-white shadow-md hover:bg-red-700" 
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
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

        {/* LISTING ATLET (CLICKABLE) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Daftar Atlet ({filteredAthletes.length})</h3>
            <span className="text-[10px] font-medium text-slate-400">Ketuk untuk detail</span>
          </div>

          <div className="grid gap-3">
            {filteredAthletes.length > 0 ? (
              filteredAthletes.map((ath) => (
                <div 
                  key={ath.id}
                  onClick={() => router.push(`/coach/athletes/${ath.id}`)}
                  className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-red-100 transition-all cursor-pointer group"
                >
                  <Avatar className="h-12 w-12 ring-2 ring-slate-50 group-hover:ring-red-100 transition-all">
                    <AvatarFallback className={`font-bold text-sm ${ath.gender === 'L' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                      {ath.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-red-600 transition-colors">{ath.name}</h4>
                      {ath.status === "Cuti" && (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[8px] px-1 py-0 border-none h-4">Cuti</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <span>{ath.age} Thn</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <span className="text-slate-700 font-bold">{ath.ku}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <span>{ath.gender}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
                    <Badge className={`text-[9px] px-2 py-0.5 shadow-none border-none ${ath.level === 'Elite' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-slate-800 text-white hover:bg-slate-900'}`}>
                      {ath.level}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <Users className="h-8 w-8 text-slate-300 mb-2" />
                <p className="text-xs text-slate-500 font-medium">Tidak ada atlet di kelas ini.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}