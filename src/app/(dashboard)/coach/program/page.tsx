"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Play, CheckSquare, Dumbbell, Save, Filter, ChevronRight, Users, TrendingUp, Target, Activity, Lock } from "lucide-react"
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

// Program kolam dari pusat (Locked)
const programs = [
  { id: "prog-1", class: "Elite", time: "15:00 WIB", title: "The Blue Mile", progress: 75, type: "program", focus: "Aerobic Capacity" },
  { id: "prog-2", class: "LTHS", time: "16:00 WIB", title: "Sesi Teknik Bebas", progress: 40, type: "program", focus: "Stroke Mechanics" },
]

// Daftar Home Work / Latihan Personal dari Pusat
const homeworks = [
  { id: "pers-1", title: "Dryland Core (30 Menit)", desc: "Plank 3x1 menit, Sit-up 3x20, Push-up 3x15", type: "personal", target: "Core Stability" },
  { id: "pers-2", title: "Hypoxic Stretching", desc: "Latihan kapasitas paru di darat.", type: "personal", target: "Lung Capacity" },
  { id: "pers-3", title: "Ankle Mobility Drill", desc: "Peregangan pergelangan kaki untuk meningkatkan dorongan kick.", type: "personal", target: "Flexibility" }
]

// ==========================================
// DUMMY DATA ANALYTICS
// ==========================================
const completionData = [
  { name: 'Selesai', value: 78, color: '#10b981' },
  { name: 'Belum Selesai', value: 22, color: '#2a293b' },
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

export default function ProgramSyllabusPage() {
  const router = useRouter()
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["Elite"])

  // State untuk melacak Home Work mana yang ditugaskan ke atlet siapa
  const [assignedHomeworks, setAssignedHomeworks] = useState<Record<string, string[]>>({
    "pers-1": ["ath-1", "ath-2"]
  })

  // State untuk bottom sheet penugasan Home Work
  const [tempAssign, setTempAssign] = useState<string[]>([])
  const [activeHWId, setActiveHWId] = useState<string | null>(null)
  const [isAssignSheetOpen, setIsAssignSheetOpen] = useState(false)

  const toggleClass = (c: string) => {
    setSelectedClasses(prev => prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c])
  }

  const handleOpenAssign = (hwId: string) => {
    setActiveHWId(hwId)
    setTempAssign(assignedHomeworks[hwId] || [])
    setIsAssignSheetOpen(true)
  }

  const handleSaveAssign = () => {
    if (activeHWId) {
      setAssignedHomeworks(prev => ({ ...prev, [activeHWId]: tempAssign }))
      setIsAssignSheetOpen(false)
    }
  }

  const filteredPrograms = programs.filter(p => selectedClasses.includes(p.class) || selectedClasses.length === 0)

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-[#ffe5e5] via-[#fff5f5] to-[#fff5f5] dark:from-[#3a1c1c] dark:via-[#09090b] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="pages" title="Program & Kurikulum" />

      <main className="flex-1 px-4 md:px-6 pt-4 pb-28 space-y-5 w-full">

        {/* ==========================================
            ANALYTICS SUMMARY
            ========================================== */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Statistik Kurikulum
            </h2>
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4">

              {/* Kurva Kepatuhan Program */}
              <Card className="w-[280px] border-border bg-card shrink-0 shadow-sm">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <CheckSquare className="h-3.5 w-3.5 text-emerald-500" />
                    Kepatuhan Kurikulum
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
                      <span className="text-lg font-black text-foreground">78%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Selesai (78%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Dilewati (22%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grafik Promosi */}
              <Card className="w-[300px] border-border bg-card shrink-0 shadow-sm">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                    Batas Promosi Atlet
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={promotionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#a1a1aa', fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#a1a1aa' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip cursor={{ fill: '#2a293b' }} contentStyle={{ borderRadius: '8px', fontSize: '10px', backgroundColor: '#1f1e2e', color: '#fff', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="current" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Rataan Performa */}
              <Card className="w-[280px] border-border bg-card shrink-0 shadow-sm">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-purple-500" />
                    Skor Teknik Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={classPerformanceData}>
                      <PolarGrid stroke="#2a293b" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 9, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Skor" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '10px', backgroundColor: '#1f1e2e', color: '#fff', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>

        {/* ==========================================
            TABS MENU: KOLAM & HOME WORK
            ========================================== */}
        <Tabs defaultValue="pool" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-[#ff4b4b] p-1 rounded-xl mb-4 gap-1">
            <TabsTrigger value="pool" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]: font-bold transition-all rounded-lg text-white shadow-sm">
              Kurikulum Kolam 🔒
            </TabsTrigger>
            <TabsTrigger value="homework" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]: font-bold transition-all rounded-lg text-white shadow-sm">
              Home Work / Personal 🏋️
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: KURIKULUM KOLAM (Pusat - Locked) */}
          <TabsContent value="pool" className="space-y-4">
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-xl text-xs font-bold transition-colors w-full bg-card border border-border text-foreground h-10 px-4 hover:bg-muted shadow-sm">
                <Filter className="mr-2 h-4 w-4 text-primary" /> Filter Kelas ({selectedClasses.length === 0 ? 'Semua' : selectedClasses.length})
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8 pt-4 bg-card border-t border-border">
                <SheetHeader className="border-b border-border pb-3 mb-4 text-left">
                  <SheetTitle className="text-lg font-bold text-foreground uppercase tracking-widest">Filter Group Latihan</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-2 gap-3">
                  {classes.map((c) => (
                    <div key={c} className="flex items-center space-x-2 bg-background p-3 rounded-xl border border-border">
                      <Checkbox id={`filter-${c}`} checked={selectedClasses.includes(c)} onCheckedChange={() => toggleClass(c)} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      <label htmlFor={`filter-${c}`} className="text-sm font-semibold cursor-pointer w-full text-foreground">{c}</label>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="space-y-3">
              {filteredPrograms.length > 0 ? filteredPrograms.map((prog) => (
                <Card 
                  key={prog.id} 
                  onClick={() => router.push(`/coach/program/${prog.id}`)} 
                  className="border border-border cursor-pointer hover:border-[#ff4b4b]/50 bg-card rounded-2xl shadow-sm relative overflow-hidden group"
                >
                  {/* Lock Indicator Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff4b4b]"></div>
                  
                  <CardHeader className="p-4 pb-2 pl-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">{prog.class} • {prog.time}</Badge>
                        <Badge className="bg-slate-100 text-slate-500 border-none text-[8px] h-4 py-0 px-1 font-bold flex items-center gap-0.5">
                          <Lock className="h-2 w-2" /> PUSAT
                        </Badge>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest">{prog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 pl-6">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Fokus Latihan: <span className="text-foreground">{prog.focus}</span>
                    </p>
                  </CardContent>
                </Card>
              )) : (
                <div className="p-8 text-center bg-card rounded-2xl border-dashed border-2 border-border">
                  <p className="text-xs font-medium text-muted-foreground">Silakan pilih kelas pada filter.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: HOME WORK / PERSONAL (Coach Assign) */}
          <TabsContent value="homework" className="space-y-4">
            <div className="space-y-4">
              {homeworks.map(hw => {
                const assignedCount = assignedHomeworks[hw.id]?.length || 0
                return (
                  <Card key={hw.id} className="border border-border bg-card rounded-2xl shadow-sm relative overflow-hidden group">
                    <CardContent className="p-4">
                      {/* Klik Header = Buka detail */}
                      <div className="cursor-pointer mb-3" onClick={() => router.push(`/coach/program/homework/${hw.id}`)}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <Badge className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-[8px] uppercase font-bold tracking-widest mb-1.5 border-none">
                              {hw.target}
                            </Badge>
                            <h4 className="font-bold text-sm text-foreground uppercase tracking-widest group-hover:text-indigo-500 transition-colors">{hw.title}</h4>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{hw.desc}</p>
                      </div>

                      {/* Tombol Tugaskan & Status */}
                      <div className="pt-3 border-t border-border space-y-3">
                        <Button
                          onClick={() => handleOpenAssign(hw.id)}
                          variant="outline"
                          className="w-full text-xs font-bold border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 h-9 rounded-xl transition-all"
                        >
                          <Play className="mr-2 h-3.5 w-3.5 fill-current" /> Tugaskan ke Atlet (Home Work)
                        </Button>
                        <div className="flex items-center gap-2 bg-background p-2 rounded-xl border border-border">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <p className="text-[10px] font-semibold text-muted-foreground">
                            Disarankan untuk: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{assignedCount} Atlet</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* SHEET ASSIGN ATLET (HOME WORK) */}
      <Sheet open={isAssignSheetOpen} onOpenChange={setIsAssignSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-6 pt-4 h-[75vh] flex flex-col bg-card border-t border-border">
          <SheetHeader className="border-b border-border pb-4 text-left shrink-0">
            <SheetTitle className="text-lg font-bold text-foreground uppercase tracking-widest">Resepkan Home Work</SheetTitle>
            <p className="text-xs text-muted-foreground">Tugaskan latihan mandiri ke daftar anak didik.</p>
          </SheetHeader>
          <ScrollArea className="flex-1 py-4">
            <div className="space-y-3 px-1">
              {dummyAthletes.map(ath => (
                <div key={ath.id} className="flex items-center justify-between p-3 rounded-2xl border border-border bg-background">
                  <label htmlFor={`assign-${ath.id}`} className="text-sm font-semibold cursor-pointer flex-1 text-foreground">
                    {ath.name} <span className="text-[10px] text-muted-foreground font-normal block">{ath.level}</span>
                  </label>
                  <Checkbox
                    id={`assign-${ath.id}`}
                    className="h-5 w-5 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                    checked={tempAssign.includes(ath.id)}
                    onCheckedChange={(checked) => {
                      if (checked) setTempAssign([...tempAssign, ath.id])
                      else setTempAssign(tempAssign.filter(id => id !== ath.id))
                    }}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="pt-4 border-t border-border shrink-0">
            <Button onClick={handleSaveAssign} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-sm font-bold rounded-xl uppercase tracking-widest text-white shadow-md">
              <Save className="mr-2 h-4 w-4" /> Simpan & Kirim ke App Atlet ({tempAssign.length} Orang)
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
