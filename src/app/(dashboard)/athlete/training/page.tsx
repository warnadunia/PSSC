"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Play, Square, Flag, CheckSquare, Dumbbell, Save, Filter, ChevronRight, Users, TrendingUp, Target, Activity } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"

const classes = ["LTHS", "Basic 1", "Basic 2", "Elite", "RJ", "RS"]

const dummyAthletes = [
  { id: "ath-1", name: "Bima Arya", level: "Elite" },
  { id: "ath-2", name: "Rara Kirana", level: "Elite" },
  { id: "ath-3", name: "Sakti Mahesa", level: "LTHS" },
  { id: "ath-4", name: "Dinda Aulia", level: "Basic 2" },
]

const programs = [
  { id: "prog-1", class: "Elite", time: "15:00 WIB", title: "The Blue Mile", progress: 75, type: "program" },
  { id: "prog-2", class: "LTHS", time: "16:00 WIB", title: "Sesi Teknik Bebas", progress: 40, type: "program" },
]

const personals = [
  { id: "pers-1", title: "Dryland Core (30 Menit)", desc: "Plank 3x1 menit, Sit-up 3x20, Push-up 3x15", type: "personal" },
  { id: "pers-2", title: "Hypoxic Stretching", desc: "Latihan kapasitas paru di darat.", type: "personal" }
]

// ==========================================
// DUMMY DATA ANALYTICS
// ==========================================
const completionData = [
  { name: 'Selesai', value: 78, color: '#10b981' }, // emerald-500
  { name: 'Belum Selesai', value: 22, color: '#f1f5f9' }, // slate-100
]

const promotionData = [
  { name: 'Bima A.', current: 95, limit: 100 },
  { name: 'Sakti M.', current: 88, limit: 100 },
  { name: 'Rara K.', current: 82, limit: 100 },
  { name: 'Dinda A.', current: 75, limit: 100 },
]

const classPerformanceData = [
  { subject: 'Elite', A: 90, fullMark: 100 },
  { subject: 'RJ', A: 85, fullMark: 100 },
  { subject: 'RS', A: 78, fullMark: 100 },
  { subject: 'LTHS', A: 72, fullMark: 100 },
  { subject: 'Basic 2', A: 65, fullMark: 100 },
  { subject: 'Basic 1', A: 50, fullMark: 100 },
]

export default function TrainingPage() {
  const router = useRouter()
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["Elite"])
  const toggleClass = (c: string) => {
    setSelectedClasses(prev => prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c])
  }

  const filteredPrograms = programs.filter(p => selectedClasses.includes(p.class) || selectedClasses.length === 0)

  return (
    <div className="flex flex-col h-full w-full" suppressHydrationWarning>
      <GlobalHeader variant="pages" title="Training Center" />

      <main className="flex-1 overflow-y-auto px-4 md:px-6 pt-4 pb-28 space-y-5 w-full">
        
        {/* ==========================================
            ANALYTICS CAROUSEL
            ========================================== */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Activity className="h-4 w-4 text-red-600" /> Analytics Training
            </h2>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4">
              
              {/* Grafik Penyelesaian Latihan */}
              <Card className="w-[280px] shadow-sm border-slate-100 bg-white shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
                    Penyelesaian Latihan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex items-center justify-center gap-4">
                  <div className="h-24 w-24 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={completionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          dataKey="value"
                          stroke="none"
                        >
                          {completionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black text-slate-800">78%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-semibold text-slate-600">Selesai (78%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                      <span className="text-[10px] font-semibold text-slate-600">Belum (22%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grafik Batas Promosi */}
              <Card className="w-[300px] shadow-sm border-slate-100 bg-white shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                    Batas Promosi Atlet
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={promotionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="current" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Grafik Performa Kelas */}
              <Card className="w-[280px] shadow-sm border-slate-100 bg-white shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-purple-500" />
                    Performa per Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={classPerformanceData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Skor" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>

        <Tabs defaultValue="program" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-slate-200/50 p-1 rounded-xl mb-4">
            <TabsTrigger value="program" className="text-xs py-2 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold">
              Program
            </TabsTrigger>
            <TabsTrigger value="personal" className="text-xs py-2 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold">
              Personal
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PROGRAM (Tetap sama) */}
          <TabsContent value="program" className="space-y-4">
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-lg text-xs font-bold transition-colors w-full bg-white border border-slate-200 text-slate-700 h-10 px-4 shadow-sm hover:bg-slate-50">
                <Filter className="mr-2 h-4 w-4 text-red-600" /> Filter Kelas ({selectedClasses.length === 0 ? 'Semua' : selectedClasses.length})
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8 pt-4">
                <SheetHeader className="border-b pb-3 mb-4 text-left">
                  <SheetTitle className="text-lg font-bold text-slate-800">Filter Group Latihan</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-2 gap-3">
                  {classes.map((c) => (
                    <div key={c} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <Checkbox id={`filter-${c}`} checked={selectedClasses.includes(c)} onCheckedChange={() => toggleClass(c)} />
                      <label htmlFor={`filter-${c}`} className="text-sm font-semibold cursor-pointer w-full text-slate-700">Kelas {c}</label>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="space-y-3">
              {filteredPrograms.length > 0 ? filteredPrograms.map((prog) => (
                <Card key={prog.id} onClick={() => router.push(`/athlete/training/${prog.id}?type=${prog.type}`)} className="border-none shadow-sm cursor-pointer hover:ring-2 hover:ring-red-100 bg-white">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-[10px] bg-red-50 text-red-700 border-red-200">{prog.class} • {prog.time}</Badge>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-800">{prog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="mt-2 space-y-1.5">
                      <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                        <span>Progress Sesi</span>
                        <span className={prog.progress === 100 ? 'text-emerald-600' : 'text-slate-600'}>{prog.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${prog.progress === 100 ? 'bg-emerald-500' : 'bg-red-600'}`} style={{ width: `${prog.progress}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="p-8 text-center bg-white rounded-2xl border-dashed border-2 border-slate-200">
                  <p className="text-xs font-medium text-slate-400">Silakan pilih kelas pada filter.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: PERSONAL */}
          <TabsContent value="personal" className="space-y-4">
            <div className="space-y-4">
              {personals.map(prog => {
                return (
                  <Card key={prog.id} className="shadow-sm border-none bg-white">
                    <CardContent className="p-4">
                      {/* Klik Header = Buka SubPage */}
                      <div className="cursor-pointer group mb-3" onClick={() => router.push(`/athlete/training/${prog.id}?type=${prog.type}`)}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors">{prog.title}</h4>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{prog.desc}</p>
                      </div>
                      
                      {/* Tombol Latihan Sekarang */}
                      <div className="pt-3 border-t border-slate-100">
                        <Button 
                          onClick={() => router.push(`/athlete/training/${prog.id}?type=${prog.type}`)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold h-9 shadow-sm"
                        >
                          <Play className="mr-2 h-4 w-4 fill-white" /> Latihan Sekarang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>


    </div>
  )
}
