"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Trophy, Clock, Target, UserCircle, Activity, Medal, Settings2, CheckCircle2, ChevronRight, MapPin, Check, Timer } from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from "recharts"
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

const historyKejuaraan = [
  { 
    id: 1, 
    event: "Kejurda Jateng 2026", 
    date: "25 Juni 2026", 
    totalEvents: 3,
    medals: { emas: 1, perak: 1, perunggu: 0 } 
  },
  { 
    id: 2, 
    event: "O2SN Nasional", 
    date: "10 Agustus 2025", 
    totalEvents: 2,
    medals: { emas: 0, perak: 1, perunggu: 1 } 
  },
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

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full" suppressHydrationWarning>
      
      <GlobalHeader variant="subpage" title="Detail Atlet" />

      <main className="flex-1 overflow-y-auto px-4 md:px-6 pt-5 pb-28 space-y-6 w-full">
        
        {/* ==========================================
            1. HEADER PROFIL & BIODATA LINK
            ========================================== */}
        <section className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <Avatar className="h-20 w-20 ring-4 ring-red-50 shadow-md">
            <AvatarImage src={athlete.photo} alt={athlete.name} className="object-cover" />
            <AvatarFallback className="bg-red-600 text-white font-black text-2xl">
              {athlete.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-lg text-slate-900 leading-tight truncate">{athlete.name}</h1>
            <div className="flex flex-wrap gap-1.5 mt-1.5 mb-3">
              <Badge className="bg-red-600 hover:bg-red-700">{athlete.level}</Badge>
              <Badge variant="outline" className="border-slate-300 text-slate-600">{athlete.ku}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-[10px] w-full border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => router.push(`/coach/athletes/${resolvedParams.id}/biodata`)}
            >
              <UserCircle className="mr-1.5 h-3.5 w-3.5" /> Lihat Biodata Lengkap
            </Button>
          </div>
        </section>

        {/* ==========================================
            2. RADAR CHART (OVERALL FM STYLE)
            ========================================== */}
        <Card className="shadow-sm border-none bg-white">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Target className="h-4 w-4 text-red-600" /> Atribut Kemampuan Atlet
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Ability" dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.4} />
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
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Activity className="h-4 w-4 text-red-600" /> Analisis Teknik per Gaya
            </h3>
          </div>
          <div className="bg-red-50 p-2.5 rounded-lg flex gap-2 items-start border border-red-100 mb-2">
            <Settings2 className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-800 font-medium leading-relaxed">
              *Komponen penilaian disinkronisasi dinamis dari target kurikulum Pusat.
            </p>
          </div>

          {/* Menggunakan Tabs dengan ScrollArea agar muat di layar HP */}
          <Tabs defaultValue={styleBreakdown[0].short} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap mb-3">
              <TabsList className="w-max flex bg-slate-200/50 p-1 rounded-xl">
                {styleBreakdown.map((style, idx) => (
                  <TabsTrigger 
                    key={idx} 
                    value={style.short}
                    className="text-[11px] py-1.5 px-4 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold transition-all"
                  >
                    {style.short}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>

            {styleBreakdown.map((style, idx) => (
              <TabsContent key={idx} value={style.short} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mt-0 space-y-3">
                <h4 className="font-bold text-xs text-slate-800 mb-2 border-b border-slate-50 pb-2">{style.name}</h4>
                {style.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-600">{metric.label}</span>
                      <span className={metric.value >= 90 ? 'text-red-600' : 'text-slate-800'}>{metric.value}%</span>
                    </div>
                    {/* Manual Progress Bar biar nggak kena Hydration Error */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${metric.value >= 90 ? 'bg-red-600' : 'bg-slate-400'}`}
                        style={{ width: `${metric.value}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* ==========================================
            4. TABS: SLIDER PROGRAM & KEJUARAAN
            ========================================== */}
        <section className="pt-2">
          <Tabs defaultValue="program" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-slate-200/50 p-1 rounded-xl mb-4">
              <TabsTrigger value="program" className="text-xs py-2 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold">
                Program
              </TabsTrigger>
              <TabsTrigger value="kejuaraan" className="text-xs py-2 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold">
                Kejuaraan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="program" className="space-y-4">
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
                  <Card key={session.id} className="border border-slate-200 shadow-sm bg-white overflow-hidden relative">
                    <div className={`absolute left-0 top-0 w-1.5 h-full ${isTuntas ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <CardContent className="p-0">
                      
                      {/* Header Info */}
                      <div className="p-4 pl-5">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">Latihan : {session.timeAgo}</p>
                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-3">{session.session}</h3>
                        
                        <div className="flex gap-6 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">{session.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">{session.duration}</span>
                          </div>
                        </div>

                        {/* Progress Status */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              Status: {isTuntas ? <span className="text-emerald-600">Tuntas</span> : <span className="text-red-600">Belum Tuntas</span>}
                            </span>
                            <span className={`text-[10px] font-black ${isTuntas ? 'text-emerald-600' : 'text-slate-700'}`}>
                              {completionRate}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
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
                        className="bg-slate-50 border-t border-slate-100 p-3 flex justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors group"
                      >
                        <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center">
                          Lihat Detail <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="kejuaraan" className="space-y-3">
              {historyKejuaraan.map((lomba) => (
                <Card 
                  key={lomba.id} 
                  onClick={() => router.push(`/coach/athletes/${resolvedParams.id}/kejuaraan/${lomba.id}`)}
                  className="border border-slate-100 shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <h4 className="text-xs font-bold text-slate-800">{lomba.event}</h4>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500 mb-3">{lomba.date} • {lomba.totalEvents} Nomor Lomba</p>
                    <div className="flex items-center gap-3">
                      {lomba.medals.emas > 0 && (
                        <Badge variant="outline" className="text-[9px] border-amber-200 text-amber-700 bg-amber-50 px-1.5 py-0">
                          {lomba.medals.emas} Emas
                        </Badge>
                      )}
                      {lomba.medals.perak > 0 && (
                        <Badge variant="outline" className="text-[9px] border-slate-300 text-slate-700 bg-slate-100 px-1.5 py-0">
                          {lomba.medals.perak} Perak
                        </Badge>
                      )}
                      {lomba.medals.perunggu > 0 && (
                        <Badge variant="outline" className="text-[9px] border-orange-200 text-orange-700 bg-orange-50 px-1.5 py-0">
                          {lomba.medals.perunggu} Perunggu
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>

      </main>
    </div>
  )
}