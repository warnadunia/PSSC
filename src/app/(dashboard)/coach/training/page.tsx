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

const timeTrials = [
  { id: "tt-1", title: "50M Gaya Bebas", date: "Hari ini", participants: 12 },
  { id: "tt-2", title: "100M Gaya Kupu", date: "Kemarin", participants: 8 },
]

// ==========================================
// DUMMY DATA ANALYTICS
// ==========================================
const completionData = [
  { name: 'Selesai', value: 78, color: '#10b981' }, // emerald-500
  { name: 'Belum Selesai', value: 22, color: '#2a293b' }, // muted
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

  // State untuk melacak atlet mana yang ditugaskan ke program mana
  const [assignedTasks, setAssignedTasks] = useState<Record<string, string[]>>({
    "pers-1": ["ath-1", "ath-2"] // Dummy: pers-1 udah di-assign ke 2 orang
  })

  // State untuk form assign di dalam Sheet
  const [tempAssign, setTempAssign] = useState<string[]>([])
  const [activeAssignProg, setActiveAssignProg] = useState<string | null>(null)
  const [isAssignSheetOpen, setIsAssignSheetOpen] = useState(false)

  // State untuk form Buat Time Trial
  const [isTimeTrialSheetOpen, setIsTimeTrialSheetOpen] = useState(false)
  const [ttGaya, setTtGaya] = useState("Bebas")
  const [ttJarak, setTtJarak] = useState("50M")

  const handleCreateTimeTrial = () => {
    setIsTimeTrialSheetOpen(false)
    // Rute ke halaman active time trial (new)
    router.push(`/coach/training/time-trial/new?gaya=${ttGaya}&jarak=${ttJarak}`)
  }

  const toggleClass = (c: string) => {
    setSelectedClasses(prev => prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c])
  }

  const handleOpenAssign = (progId: string) => {
    setActiveAssignProg(progId)
    setTempAssign(assignedTasks[progId] || [])
    setIsAssignSheetOpen(true)
  }

  const handleSaveAssign = () => {
    if (activeAssignProg) {
      setAssignedTasks(prev => ({ ...prev, [activeAssignProg]: tempAssign }))
      setIsAssignSheetOpen(false)
    }
  }

  const filteredPrograms = programs.filter(p => selectedClasses.includes(p.class) || selectedClasses.length === 0)

  return (
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      <GlobalHeader variant="pages" title="Training Center" />

      <main className="flex-1 px-4 md:px-6 pt-4 pb-28 space-y-5 w-full">

        {/* ==========================================
            ANALYTICS CAROUSEL
            ========================================== */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Analytics Training
            </h2>
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4">

              {/* Grafik Penyelesaian Latihan */}
              <Card className="w-[280px] shadow-sm border-border bg-card shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
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
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Belum (22%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grafik Batas Promosi */}
              <Card className="w-[300px] shadow-sm border-border bg-card shrink-0">
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

              {/* Grafik Performa Kelas */}
              <Card className="w-[280px] shadow-sm border-border bg-card shrink-0">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-purple-500" />
                    Performa per Kelas
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

        <Tabs defaultValue="program" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-primary px-1 py-0 rounded-xl mb-4 gap-1">
            <TabsTrigger value="program" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-bold transition-all rounded-full text-primary-foreground">
              Program
            </TabsTrigger>
            <TabsTrigger value="time-trial" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-bold transition-all rounded-full text-primary-foreground">
              Time Trial
            </TabsTrigger>
            <TabsTrigger value="personal" className="text-[11px] py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-bold transition-all rounded-full text-primary-foreground">
              Personal
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PROGRAM (Tetap sama) */}
          <TabsContent value="program" className="space-y-4">
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-xl text-xs font-bold transition-colors w-full bg-card border border-border text-foreground h-10 px-4 shadow-sm hover:bg-muted">
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
                <Card key={prog.id} onClick={() => router.push(`/coach/training/${prog.id}?type=${prog.type}`)} className="border border-border shadow-sm cursor-pointer hover:border-primary/50 bg-card rounded-2xl">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">{prog.class} • {prog.time}</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-sm font-bold text-foreground uppercase tracking-widest">{prog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="mt-2 space-y-1.5">
                      <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                        <span>Progress Sesi</span>
                        <span className={prog.progress === 100 ? 'text-emerald-500' : 'text-primary'}>{prog.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${prog.progress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${prog.progress}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="p-8 text-center bg-card rounded-2xl border-dashed border-2 border-border">
                  <p className="text-xs font-medium text-muted-foreground">Silakan pilih kelas pada filter.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: TIME TRIAL */}
          <TabsContent value="time-trial" className="space-y-4">
            <Button
              onClick={() => setIsTimeTrialSheetOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 h-12 text-sm font-bold shadow-md rounded-xl text-primary-foreground uppercase tracking-widest"
            >
              + Buat Time Trial Baru
            </Button>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-foreground mt-2 mb-1 uppercase tracking-widest">Riwayat Time Trial</h3>
              {timeTrials.map(tt => (
                <Card key={tt.id} onClick={() => router.push(`/coach/training/time-trial/${tt.id}`)} className="border border-border shadow-sm cursor-pointer hover:border-primary/50 bg-card rounded-2xl">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-bold text-foreground uppercase tracking-widest">{tt.title}</CardTitle>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">{tt.date}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-2 bg-background p-2 rounded-xl mt-2 border border-border">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-[10px] font-semibold text-muted-foreground">
                        Total Partisipan: <span className="text-primary font-bold">{tt.participants} Atlet</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: PERSONAL */}
          <TabsContent value="personal" className="space-y-4">
            <div className="space-y-4">
              {personals.map(prog => {
                const assignedCount = assignedTasks[prog.id]?.length || 0
                return (
                  <Card key={prog.id} className="shadow-sm border border-border bg-card rounded-2xl">
                    <CardContent className="p-4">
                      {/* Klik Header = Buka SubPage */}
                      <div className="cursor-pointer group mb-3" onClick={() => router.push(`/coach/training/${prog.id}?type=${prog.type}`)}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-sm text-foreground uppercase tracking-widest group-hover:text-primary transition-colors">{prog.title}</h4>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{prog.desc}</p>
                      </div>

                      {/* Tombol Tugaskan & Status */}
                      <div className="pt-3 border-t border-border space-y-3">
                        <Button
                          onClick={() => handleOpenAssign(prog.id)}
                          variant="outline"
                          className="w-full text-xs font-bold border-border text-foreground hover:bg-muted h-9 rounded-xl"
                        >
                          <CheckSquare className="mr-2 h-4 w-4 text-primary" /> Tugaskan Atlet
                        </Button>
                        <div className="flex items-center gap-2 bg-background p-2 rounded-xl border border-border">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <p className="text-[10px] font-semibold text-muted-foreground">
                            Latihan ini ditugaskan untuk <span className="text-primary font-bold">{assignedCount} Atlet</span>.
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

      {/* SHEET ASSIGN ATLET */}
      <Sheet open={isAssignSheetOpen} onOpenChange={setIsAssignSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-6 pt-4 h-[75vh] flex flex-col bg-card border-t border-border">
          <SheetHeader className="border-b border-border pb-4 text-left shrink-0">
            <SheetTitle className="text-lg font-bold text-foreground uppercase tracking-widest">Pilih Atlet</SheetTitle>
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
                    className="h-5 w-5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
            <Button onClick={handleSaveAssign} className="w-full bg-primary hover:bg-primary/90 h-12 text-sm font-bold shadow-md rounded-xl uppercase tracking-widest text-primary-foreground">
              <Save className="mr-2 h-4 w-4" /> Simpan Tugas ({tempAssign.length} Atlet)
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* SHEET BUAT TIME TRIAL */}
      <Sheet open={isTimeTrialSheetOpen} onOpenChange={setIsTimeTrialSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-6 pt-4 h-auto flex flex-col bg-card border-t border-border">
          <SheetHeader className="border-b border-border pb-4 text-left shrink-0">
            <SheetTitle className="text-lg font-bold text-foreground uppercase tracking-widest">Buat Time Trial</SheetTitle>
            <p className="text-xs text-muted-foreground">Pilih gaya dan jarak untuk sesi time trial ini.</p>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Gaya Renang</label>
              <div className="grid grid-cols-2 gap-2">
                {["Bebas", "Dada", "Punggung", "Kupu"].map(gaya => (
                  <div
                    key={gaya}
                    onClick={() => setTtGaya(gaya)}
                    className={`p-3 text-center rounded-xl border text-sm font-bold cursor-pointer transition-colors ${ttGaya === gaya ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border text-foreground hover:bg-muted'}`}
                  >
                    {gaya}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Jarak (Meter)</label>
              <div className="grid grid-cols-4 gap-2">
                {["25M", "50M", "100M", "200M"].map(jarak => (
                  <div
                    key={jarak}
                    onClick={() => setTtJarak(jarak)}
                    className={`p-2 text-center rounded-xl border text-xs font-bold cursor-pointer transition-colors ${ttJarak === jarak ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border text-foreground hover:bg-muted'}`}
                  >
                    {jarak}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-border mt-4 shrink-0">
            <Button onClick={handleCreateTimeTrial} className="w-full bg-primary hover:bg-primary/90 h-12 text-sm font-bold shadow-md rounded-xl uppercase tracking-widest text-primary-foreground">
              <Play className="mr-2 h-4 w-4 fill-white" /> Mulai Time Trial
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}