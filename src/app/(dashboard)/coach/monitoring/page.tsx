"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronDown, CheckCircle2, XCircle, AlertTriangle, Users, Award, ShieldAlert, BookOpen } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ==========================================
// DUMMY DATA MONITORING KELAYAKAN NAIK KELAS
// ==========================================
interface AthleteProgress {
  id: string
  name: string
  photo: string
  attendance: number       // % kehadiran
  timeTrialMet: boolean    // Apakah catatan waktu target terlampaui
  techScore: number        // Nilai teknik rata-rata
  status: "layak" | "belum" | "review"
  reason?: string          // Catatan jika belum layak
  recommendationId?: string // ID rekomendasi promosi jika layak
}

interface ClassGroup {
  level: string
  description: string
  athletes: AthleteProgress[]
}

const classGroupsData: ClassGroup[] = [
  {
    level: "Elite",
    description: "Kelas pembinaan tingkat nasional dan kejuaraan utama.",
    athletes: [
      { id: "ath-1", name: "Bima Arya", photo: "https://i.pravatar.cc/150?u=bimaarya", attendance: 95, timeTrialMet: true, techScore: 92, status: "layak", recommendationId: "1" },
      { id: "ath-2", name: "Rara Kirana", photo: "https://i.pravatar.cc/150?u=rarakirana", attendance: 88, timeTrialMet: true, techScore: 85, status: "layak", recommendationId: "2" },
    ]
  },
  {
    level: "LTHS",
    description: "Latihan transisi khusus persiapan kejuaraan daerah.",
    athletes: [
      { id: "ath-3", name: "Sakti Mahesa", photo: "https://i.pravatar.cc/150?u=saktimahesa", attendance: 92, timeTrialMet: true, techScore: 88, status: "layak", recommendationId: "1" },
    ]
  },
  {
    level: "Basic 2",
    description: "Pengembangan stroke mechanics, kekuatan, dan ketahanan paru.",
    athletes: [
      { id: "ath-4", name: "Dinda Aulia", photo: "https://i.pravatar.cc/150?u=dindaaulia", attendance: 75, timeTrialMet: false, techScore: 72, status: "belum", reason: "Kehadiran di bawah 80% & Waktu belum lolos limit target." },
      { id: "ath-7", name: "Nadia Putri", photo: "https://i.pravatar.cc/150?u=nadiaputri", attendance: 85, timeTrialMet: false, techScore: 78, status: "review", reason: "Catatan waktu kurang 0.2 detik lagi untuk promosi." },
    ]
  },
  {
    level: "Basic 1",
    description: "Pengenalan koordinasi 4 gaya dasar dan perbaikan teknik tarikan.",
    athletes: [
      { id: "ath-5", name: "Kevin Sanjaya", photo: "https://i.pravatar.cc/150?u=kevinsanjaya", attendance: 95, timeTrialMet: true, techScore: 80, status: "review", reason: "Teknis & waktu lolos, namun kepatuhan Home Treatment masih rendah.", recommendationId: "2" },
    ]
  }
]

export default function MonitoringProgressPage() {
  const router = useRouter()
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({
    "Elite": true,
    "LTHS": true,
    "Basic 2": true,
    "Basic 1": true
  })

  const toggleExpand = (level: string) => {
    setExpandedClasses(prev => ({ ...prev, [level]: !prev[level] }))
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full pb-28 relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0" suppressHydrationWarning>
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-blue-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#1b223a] dark:via-[#09090b] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="pages" title="Monitoring Progres Kenaikan" />

      <main className="flex-1 w-full px-4 md:px-6 pt-5 space-y-5">
        
        {/* Header Deskripsi */}
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Squad <span className="text-blue-600 dark:text-blue-400">Promotion Monitor</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Papan kendali evaluasi kelayakan kenaikan kelas berdasarkan kehadiran, catatan waktu, dan teknik latihan.</p>
        </div>

        {/* ==========================================
            SQUAD GROUPS BY LEVEL
            ========================================== */}
        <section className="space-y-4">
          {classGroupsData.map((group) => {
            const isExpanded = expandedClasses[group.level]
            const eligibleCount = group.athletes.filter(a => a.status === "layak").length
            const totalCount = group.athletes.length

            return (
              <Card key={group.level} className="border-slate-200 dark:border-border bg-white dark:bg-card shadow-sm rounded-3xl overflow-hidden transition-all">
                
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleExpand(group.level)}
                  className="p-4 bg-slate-50 dark:bg-secondary/40 flex justify-between items-center cursor-pointer select-none border-b border-slate-200 dark:border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-2 rounded-xl">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Kelas {group.level}</h2>
                      <p className="text-[10px] text-muted-foreground hidden sm:block font-medium mt-0.5">{group.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[9px] uppercase tracking-wider">
                      {eligibleCount} / {totalCount} Layak
                    </Badge>
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                  </div>
                </div>

                {/* Accordion Content (Athletes List) */}
                {isExpanded && (
                  <div className="p-4 divide-y divide-slate-100 dark:divide-border/50">
                    {group.athletes.map((ath) => (
                      <div key={ath.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        
                        {/* Nama & Info Atlet */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-secondary border border-border flex items-center justify-center font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300">
                            {ath.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{ath.name}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                              <span className={ath.attendance >= 80 ? "text-emerald-500" : "text-red-500"}>Hadir: {ath.attendance}%</span>
                              <span>•</span>
                              <span className={ath.timeTrialMet ? "text-emerald-500" : "text-red-500"}>Time: {ath.timeTrialMet ? "Passed" : "Below Target"}</span>
                              <span>•</span>
                              <span>Teknik: {ath.techScore}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Kelayakan & Aksi */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          
                          {/* Badge Status */}
                          {ath.status === "layak" && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[9px] uppercase tracking-widest flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Layak Naik
                            </Badge>
                          )}
                          {ath.status === "review" && (
                            <Badge 
                              title={ath.reason}
                              className="bg-amber-500/10 text-amber-600 dark:text-amber-500 border-none font-bold text-[9px] uppercase tracking-widest flex items-center gap-1 cursor-help"
                            >
                              <AlertTriangle className="h-3.5 w-3.5" /> Butuh Review
                            </Badge>
                          )}
                          {ath.status === "belum" && (
                            <Badge 
                              title={ath.reason}
                              className="bg-red-500/10 text-red-600 dark:text-red-400 border-none font-bold text-[9px] uppercase tracking-widest flex items-center gap-1 cursor-help"
                            >
                              <XCircle className="h-3.5 w-3.5" /> Belum Layak
                            </Badge>
                          )}

                          {/* Tombol Detail/Review */}
                          {ath.status === "layak" && ath.recommendationId && (
                            <Button 
                              onClick={() => router.push(`/coach/monitoring/promosi?id=${ath.recommendationId}`)}
                              className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg px-3 shadow-md"
                            >
                              <Award className="h-3.5 w-3.5 mr-1" /> Promosi
                            </Button>
                          )}
                          {ath.status === "review" && ath.recommendationId && (
                            <Button 
                              onClick={() => router.push(`/coach/monitoring/promosi?id=${ath.recommendationId}`)}
                              variant="outline"
                              className="h-8 border-amber-500/30 hover:bg-amber-50 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-lg px-3"
                            >
                              <BookOpen className="h-3.5 w-3.5 mr-1" /> Review
                            </Button>
                          )}
                          {ath.status === "belum" && (
                            <Button 
                              disabled
                              className="h-8 bg-slate-100 dark:bg-secondary text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg px-3"
                            >
                              <ShieldAlert className="h-3.5 w-3.5 mr-1" /> Detail
                            </Button>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </Card>
            )
          })}
        </section>

      </main>
    </div>
  )
}
