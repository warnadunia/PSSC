"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, ArrowLeft, AlertTriangle, Users, 
  TrendingUp, TrendingDown, Target, HeartPulse, BatteryCharging,
  Info
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function DiagnosisPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("elite")

  // Dummy Data for Class Levels
  const diagnosisData = {
    elite: {
      className: "Elite Squad",
      completionRate: 88,
      avgHeartRate: "165 bpm",
      totalAthletes: 12,
      criticalAlerts: [
        { name: "Sakti Mahesa", issue: "Nyeri Bahu Kanan", action: "Kurangi volume gaya dada/bebas" },
        { name: "Bima Arya", issue: "Kelelahan Ekstrem", action: "Skip set utama 30 menit terakhir" },
        { name: "Rara Kirana", issue: "Kelelahan Ekstrem", action: "Penurunan speed drastis di set ke-4" }
      ],
      performance: {
        aerobic: 92,
        anaerobic: 75,
        technique: 85
      }
    },
    development: {
      className: "Development Class",
      completionRate: 95,
      avgHeartRate: "145 bpm",
      totalAthletes: 18,
      criticalAlerts: [
        { name: "Aditya Pratama", issue: "Kram Kaki Kiri", action: "Butuh evaluasi nutrisi pra-latihan" }
      ],
      performance: {
        aerobic: 80,
        anaerobic: 60,
        technique: 90
      }
    },
    beginner: {
      className: "Beginner Class",
      completionRate: 100,
      avgHeartRate: "120 bpm",
      totalAthletes: 25,
      criticalAlerts: [],
      performance: {
        aerobic: 65,
        anaerobic: 40,
        technique: 75
      }
    }
  }

  const currentData = diagnosisData[activeTab as keyof typeof diagnosisData]

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 dark:bg-background text-foreground relative z-0">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 w-full h-[40vh] bg-gradient-to-b from-slate-200/50 dark:from-[#2a293d] to-transparent"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <GlobalHeader variant="subpage" title="Diagnosis Latihan" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-2 text-[#ff4b4b] mb-2 cursor-pointer w-max" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Kembali</span>
          </div>
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">
            Laporan <span className="text-emerald-500">Diagnosis</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">
            Evaluasi kesehatan, ketahanan, dan kedisiplinan per kelas berdasarkan data sesi terakhir.
          </p>
        </div>

        {/* Tabs Selection */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full bg-slate-200/50 dark:bg-[#161622] border border-slate-200 dark:border-[#2a293d] rounded-xl h-12 p-1 mb-6">
            <TabsTrigger 
              value="elite" 
              className="rounded-lg text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-emerald-500 data-[state=active]:shadow-lg"
            >
              Elite
            </TabsTrigger>
            <TabsTrigger 
              value="development" 
              className="rounded-lg text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-blue-500 data-[state=active]:shadow-lg"
            >
              Develop
            </TabsTrigger>
            <TabsTrigger 
              value="beginner" 
              className="rounded-lg text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-[#1f1e2e] data-[state=active]:text-amber-500 data-[state=active]:shadow-lg"
            >
              Beginner
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 mt-0">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                      <Target className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tingkat Tuntas</p>
                  <p className="text-2xl font-black font-heading text-slate-900 dark:text-white">{currentData.completionRate}%</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-[#ff4b4b]/10 p-2 rounded-xl text-[#ff4b4b]">
                      <HeartPulse className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Heart Rate</p>
                  <p className="text-2xl font-black font-heading text-slate-900 dark:text-white">{currentData.avgHeartRate}</p>
                </CardContent>
              </Card>
            </div>

            {/* Critical Alerts */}
            <Card className="bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-amber-500/10 p-3 border-b border-amber-500/20 flex justify-between items-center">
                <h2 className="text-[11px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Anomali & Peringatan
                </h2>
                <Badge variant="outline" className="text-[9px] border-amber-500 text-amber-600 dark:text-amber-500 bg-amber-500/10 uppercase font-bold">
                  {currentData.criticalAlerts.length} Kasus
                </Badge>
              </div>
              <CardContent className="p-0">
                {currentData.criticalAlerts.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-[#2a293d]">
                    {currentData.criticalAlerts.map((alert, idx) => (
                      <div key={idx} className="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#161622] transition-colors">
                        <div className="mt-0.5">
                          <Activity className="h-4 w-4 text-[#ff4b4b]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{alert.name}</p>
                          <p className="text-[10px] font-bold text-[#ff4b4b] uppercase tracking-widest mb-1.5">{alert.issue}</p>
                          <div className="bg-slate-100 dark:bg-black/20 p-2 rounded-lg border border-slate-200 dark:border-[#2a293d]">
                            <p className="text-[10px] font-bold text-slate-500">Tindakan Khusus:</p>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{alert.action}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <div className="bg-emerald-500/10 p-3 rounded-full mb-3">
                      <TrendingUp className="h-6 w-6 text-emerald-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Semua Aman!</p>
                    <p className="text-[11px] text-slate-500 mt-1">Tidak ada anomali kesehatan atau peringatan untuk kelas ini.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Radar Breakdown (Mockup via Progress bars) */}
            <Card className="bg-white dark:bg-[#1f1e2e] border-slate-200 dark:border-[#2a293d] shadow-lg rounded-2xl">
              <div className="p-4 border-b border-slate-100 dark:border-[#2a293d]">
                <h2 className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  <BatteryCharging className="h-4 w-4 text-blue-500" /> Rata-rata Kapasitas Kelas
                </h2>
              </div>
              <CardContent className="p-5 space-y-5">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <span>Aerobic (Endurance)</span>
                    <span className="text-slate-900 dark:text-white">{currentData.performance.aerobic}%</span>
                  </div>
                  <Progress value={currentData.performance.aerobic} className="h-1.5 bg-blue-100 dark:bg-blue-950" indicatorColor="bg-blue-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <span>Anaerobic (Sprint)</span>
                    <span className="text-slate-900 dark:text-white">{currentData.performance.anaerobic}%</span>
                  </div>
                  <Progress value={currentData.performance.anaerobic} className="h-1.5 bg-[#ff4b4b]/20 dark:bg-[#ff4b4b]/10" indicatorColor="bg-[#ff4b4b]" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <span>Technique Control</span>
                    <span className="text-slate-900 dark:text-white">{currentData.performance.technique}%</span>
                  </div>
                  <Progress value={currentData.performance.technique} className="h-1.5 bg-emerald-100 dark:bg-emerald-950" indicatorColor="bg-emerald-500" />
                </div>

              </CardContent>
            </Card>

          </TabsContent>
        </Tabs>

      </main>

    </div>
  )
}
