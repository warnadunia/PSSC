"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, XCircle, ArrowLeft, Sparkles, TrendingUp, Calendar, Trophy, Send, Award, Ban } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from "recharts"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ==========================================
// DUMMY DATA REKOMENDASI PROMOSI DETAIL
// ==========================================
interface PromotionDetail {
  id: string
  name: string
  photo: string
  age: number
  gender: "L" | "P"
  ku: string
  specialty: string
  currentLevel: string
  targetLevel: string
  score: number
  requirements: {
    label: string
    current: string
    target: string
    isMet: boolean
  }[]
  chartData: { month: string; time: number; target: number }[]
}

const promotionDetails: Record<string, PromotionDetail> = {
  "1": {
    id: "ath-3",
    name: "Sakti Mahesa",
    photo: "https://i.pravatar.cc/150?u=saktimahesa",
    age: 13,
    gender: "L",
    ku: "KU 3",
    specialty: "Individual Medley (IM)",
    currentLevel: "LTHS",
    targetLevel: "Basic 1",
    score: 92,
    requirements: [
      { label: "Tingkat Kehadiran Latihan", current: "92%", target: "≥ 80%", isMet: true },
      { label: "Catatan Waktu (50M Dada)", current: "44.23s", target: "≤ 46.00s", isMet: true },
      { label: "Skor Teknik Tarikan Lengan", current: "85%", target: "≥ 80%", isMet: true },
      { label: "Kepatuhan Home Treatment", current: "88%", target: "≥ 75%", isMet: true },
    ],
    chartData: [
      { month: 'Jan', time: 47.8, target: 46.0 },
      { month: 'Feb', time: 46.9, target: 46.0 },
      { month: 'Mar', time: 46.1, target: 46.0 },
      { month: 'Apr', time: 45.4, target: 46.0 },
      { month: 'Mei', time: 44.8, target: 46.0 },
      { month: 'Jun', time: 44.2, target: 46.0 },
    ]
  },
  "2": {
    id: "ath-5",
    name: "Kevin Sanjaya",
    photo: "https://i.pravatar.cc/150?u=kevinsanjaya",
    age: 9,
    gender: "L",
    ku: "KU 5",
    specialty: "Freestyle",
    currentLevel: "Basic 1",
    targetLevel: "Basic 2",
    score: 88,
    requirements: [
      { label: "Tingkat Kehadiran Latihan", current: "95%", target: "≥ 80%", isMet: true },
      { label: "Catatan Waktu (50M Bebas)", current: "39.50s", target: "≤ 41.00s", isMet: true },
      { label: "Skor Teknik Kaki (Kick)", current: "80%", target: "≥ 80%", isMet: true },
      { label: "Kepatuhan Home Treatment", current: "72%", target: "≥ 75%", isMet: false }, // Belum memenuhi
    ],
    chartData: [
      { month: 'Jan', time: 43.1, target: 41.0 },
      { month: 'Feb', time: 42.5, target: 41.0 },
      { month: 'Mar', time: 41.8, target: 41.0 },
      { month: 'Apr', time: 40.9, target: 41.0 },
      { month: 'Mei', time: 40.1, target: 41.0 },
      { month: 'Jun', time: 39.5, target: 41.0 },
    ]
  }
}

function PromosiDetailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id") || "1"
  
  const detail = promotionDetails[id] || promotionDetails["1"]
  const [coachNote, setCoachNote] = useState("")

  const handleApprove = () => {
    alert(`Selamat! ${detail.name} berhasil dipromosikan ke Kelas ${detail.targetLevel}.`);
    router.push("/coach/athletes")
  }

  const handleHold = () => {
    alert(`Promosi untuk ${detail.name} ditunda dengan catatan: "${coachNote || 'Perlu pembinaan lebih lanjut'}"`);
    router.push("/coach/athletes")
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full pb-28 relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-amber-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#3a2f1b] dark:via-[#09090b] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Evaluasi Kenaikan Kelas" />

      <main className="flex-1 w-full px-4 md:px-6 pt-5 space-y-5">
        
        {/* Back Link */}
        <button 
          onClick={() => router.push("/coach/athletes")} 
          className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Atlet
        </button>

        {/* ==========================================
            1. HEADER PROFIL EVALUASI
            ========================================== */}
        <section className="flex items-center gap-4 bg-white dark:bg-card p-4 rounded-3xl border border-slate-200 dark:border-border shadow-sm">
          <Avatar className="h-16 w-16 ring-4 ring-amber-500/20 shadow-md">
            <AvatarImage src={detail.photo} alt={detail.name} />
            <AvatarFallback className="bg-amber-500 text-white font-black text-xl">
              {detail.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-black text-lg text-slate-900 dark:text-white uppercase leading-tight tracking-wider truncate">{detail.name}</h1>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{detail.ku} • {detail.specialty}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-slate-200 text-slate-800 dark:bg-secondary dark:text-muted-foreground border-none text-[9px] uppercase tracking-wider">{detail.currentLevel}</Badge>
              <span className="text-muted-foreground font-bold text-xs">➡️</span>
              <Badge className="bg-amber-500 text-white border-none text-[9px] uppercase tracking-wider font-bold shadow-sm">{detail.targetLevel}</Badge>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kesesuaian</p>
            <p className="text-3xl font-black text-amber-500">{detail.score}%</p>
          </div>
        </section>

        {/* ==========================================
            2. CHECKLIST SYARAT PROMOSI
            ========================================== */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" /> Kriteria Kelulusan Promosi
          </h2>
          
          <div className="grid gap-3">
            {detail.requirements.map((req, index) => (
              <Card key={index} className="border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-2xl overflow-hidden relative">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {req.isMet ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-white leading-normal">{req.label}</h3>
                      <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Target: {req.target}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${req.isMet ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                      {req.current}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ==========================================
            3. GRAFIK KEMAJUAN WAKTU TIME TRIAL
            ========================================== */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-500" /> Tren Waktu Uji Coba (Time Trial)
          </h2>
          <Card className="border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-3xl p-4">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detail.chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} domain={['auto', 'auto']} />
                  <RechartsTooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Line type="monotone" name="Record Waktu" dataKey="time" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 3, fill: "#ff4b4b", strokeWidth: 0 }} />
                  <Line type="monotone" name="Target Kenaikan" dataKey="target" stroke="#a1a1aa" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* ==========================================
            4. CATATAN & FEEDBACK PELATIH
            ========================================== */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
            Catatan Evaluasi Coach
          </h2>
          <textarea 
            placeholder="Tuliskan evaluasi teknik, sikap mental, atau saran perbaikan latihan rumah untuk atlet ini..."
            value={coachNote}
            onChange={(e) => setCoachNote(e.target.value)}
            className="flex min-h-[85px] w-full rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card px-4 py-3 text-xs ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4b4b] disabled:cursor-not-allowed disabled:opacity-50 text-slate-800 dark:text-white"
          />
        </section>

      </main>

      {/* ==========================================
          FIXED BOTTOM PANEL FOR ACTIONS
          ========================================== */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <Button 
            onClick={handleHold} 
            variant="outline" 
            className="h-12 text-xs font-bold uppercase tracking-widest border-slate-200 text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-secondary rounded-xl"
          >
            <Ban className="h-4 w-4 mr-2" /> Tunda Promosi
          </Button>
          <Button 
            onClick={handleApprove} 
            className="h-12 text-xs font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/20"
          >
            <Award className="h-4 w-4 mr-2" /> Promosikan
          </Button>
        </div>
      </div>

    </div>
  )
}

export default function PromosiDetailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-[#fff5f5] dark:bg-background text-slate-500 dark:text-slate-400 font-medium">Memuat Evaluasi Promosi...</div>}>
      <PromosiDetailContent />
    </Suspense>
  )
}
