"use client"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, TrendingUp, CalendarDays, ChevronDown } from "lucide-react"

const historyData = [
  { month: 'Jan', height: 165, weight: 60, wingspan: 172 },
  { month: 'Feb', height: 166, weight: 60.5, wingspan: 173 },
  { month: 'Mar', height: 166, weight: 61, wingspan: 173 },
  { month: 'Apr', height: 167, weight: 61.5, wingspan: 174 },
  { month: 'May', height: 168, weight: 62, wingspan: 175 },
]

export default function FisikDetailPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0">
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-indigo-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#1e1b4b] dark:via-[#09090b] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Riwayat Pertumbuhan" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Growth <span className="text-indigo-600 dark:text-indigo-400">History</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Rekam jejak pertumbuhan dan komposisi fisik selama 6 bulan terakhir.</p>
        </div>

        {/* CHART SECTION */}
        <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-lg/30 overflow-hidden rounded-3xl">
          <div className="bg-slate-100 dark:bg-secondary/50 p-4 border-b border-slate-200 dark:border-border flex justify-between items-center">
            <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-500" /> Kurva Pertumbuhan
            </h2>
            <div className="flex items-center text-[10px] font-bold text-slate-500">
              6 Bulan Terakhir <ChevronDown className="ml-1 h-3 w-3" />
            </div>
          </div>
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500"></span> Tinggi Badan</div>
              <div className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ff4b4b]"></span> Rentang Lengan</div>
            </div>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} domain={['dataMin - 5', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Line type="monotone" dataKey="height" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Tinggi (cm)" />
                  <Line type="monotone" dataKey="wingspan" stroke="#ff4b4b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Rentang (cm)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/30 text-[10px] text-indigo-800 dark:text-indigo-300 font-medium leading-relaxed">
              Rentang lengan tumbuh lebih cepat daripada tinggi badan dalam 3 bulan terakhir. Indikasi sangat baik untuk potensi *sprint*.
            </div>
          </CardContent>
        </Card>

        {/* LOG HISTORY LIST */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#ff4b4b]" /> Data Log Historis
            </h2>
          </div>
          
          <div className="space-y-3">
            {[...historyData].reverse().map((data, index) => (
              <div key={index} className="bg-white dark:bg-card border border-slate-200 dark:border-border p-4 rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 dark:bg-[#161622] text-slate-500 h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-widest">
                    {data.month}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">T: {data.height}cm • B: {data.weight}kg</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Wingspan: {data.wingspan}cm</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-emerald-200 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20">
                    Verified
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
