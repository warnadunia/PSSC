"use client"

import { useParams, useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Trophy, Clock, Target, UserCircle, Activity, Medal, Settings2 } from "lucide-react"
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

const historyLomba = [
  { id: 1, event: "Kejurda Jateng 2026", style: "50m Freestyle", best: "22.85s", latest: "22.90s", medal: "Emas" },
  { id: 2, event: "O2SN Nasional", style: "100m Freestyle", best: "50.42s", latest: "50.42s", medal: "Perak" },
]

const historyLatihan = [
  { id: 1, session: "Sesi V02 Max Sore", style: "50m Freestyle", target: "23.50s", record: "23.10s", date: "26 Jun 2026" },
  { id: 2, session: "Sprint Endurance", style: "100m Freestyle", target: "52.00s", record: "51.85s", date: "24 Jun 2026" },
]

export default function AthleteDetailPage() {
  const router = useRouter()
  const params = useParams()

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
              onClick={() => alert("Navigasi ke halaman Biodata Lengkap Atlet")}
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
            4. TABS: SLIDER RIWAYAT LATIHAN & LOMBA
            ========================================== */}
        <section className="pt-2">
          <Tabs defaultValue="latihan" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-slate-200/50 p-1 rounded-xl mb-4">
              <TabsTrigger value="latihan" className="text-xs py-2 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold">
                Riwayat Latihan
              </TabsTrigger>
              <TabsTrigger value="lomba" className="text-xs py-2 data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-bold">
                Hasil Lomba
              </TabsTrigger>
            </TabsList>

            <TabsContent value="latihan" className="space-y-3">
              {historyLatihan.map((log) => {
                const isGoalMet = parseFloat(log.record) <= parseFloat(log.target)
                return (
                  <Card key={log.id} className="border-none shadow-sm bg-white overflow-hidden relative">
                    <div className={`absolute left-0 top-0 w-1 h-full ${isGoalMet ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <CardContent className="p-3 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-slate-400">{log.date}</span>
                        <Badge variant="outline" className="text-[9px] h-4 py-0 bg-slate-50">{log.style}</Badge>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 mb-2">{log.session}</h4>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase font-semibold">Target Time</p>
                          <p className="text-xs font-mono font-bold text-slate-700">{log.target}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase font-semibold">Time Record</p>
                          <p className={`text-xs font-mono font-bold ${isGoalMet ? 'text-emerald-600' : 'text-red-600'}`}>
                            {log.record}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="lomba" className="space-y-3">
              {historyLomba.map((lomba) => (
                <Card key={lomba.id} className="border-none shadow-sm bg-white">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <Medal className={`h-4 w-4 ${lomba.medal === 'Emas' ? 'text-amber-500' : 'text-slate-400'}`} />
                        <h4 className="text-xs font-bold text-slate-800">{lomba.event}</h4>
                      </div>
                      <Badge variant="outline" className="text-[9px] border-amber-200 text-amber-700 bg-amber-50">{lomba.medal}</Badge>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500 mb-2">{lomba.style}</p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Best Time</span>
                        <span className="text-xs font-mono font-bold text-slate-800">{lomba.best}</span>
                      </div>
                      <div className="h-6 w-px bg-slate-200"></div>
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] text-slate-400 uppercase font-bold">Latest Time</span>
                        <span className="text-xs font-mono font-bold text-red-600">{lomba.latest}</span>
                      </div>
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