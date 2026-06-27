"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trophy, Plus, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrestasiPage() {
  const router = useRouter()
  const programRecords = [
    { id: 1, date: "24 Jun 2026", stroke: "Gaya Bebas", distance: "50m", time: "32.40s", status: "Personal Best 🚀" },
    { id: 2, date: "10 Jun 2026", stroke: "Gaya Dada", distance: "50m", time: "45.10s", status: "Stabil" },
    { id: 3, date: "01 Jun 2026", stroke: "Gaya Kupu-kupu", distance: "100m", time: "01:23.10", status: "Base Time" },
  ]

  const [selectedYear, setSelectedYear] = useState("2026")
  const [selectedStroke, setSelectedStroke] = useState("Bebas")

  const chartData = [
    { month: 'Jan', lastYear: 35.1, thisYear: 32.4 },
    { month: 'Feb', lastYear: 34.8, thisYear: 31.9 },
    { month: 'Mar', lastYear: 34.5, thisYear: 31.5 },
    { month: 'Apr', lastYear: 34.2, thisYear: 30.8 },
    { month: 'Mei', lastYear: 34.0, thisYear: 30.2 },
    { month: 'Jun', lastYear: 33.5, thisYear: 29.8 },
    { month: 'Jul', lastYear: 33.2, thisYear: null },
    { month: 'Agt', lastYear: 33.0, thisYear: null },
    { month: 'Sep', lastYear: 32.9, thisYear: null },
    { month: 'Okt', lastYear: 32.6, thisYear: null },
    { month: 'Nov', lastYear: 32.5, thisYear: null },
    { month: 'Des', lastYear: 32.2, thisYear: null },
  ]

  const allChampionshipResults = [
    { id: 1, event: "KRAPSSI 2026", date: "15 Jun 2026", stroke: "Bebas", distance: "25 M", time: "00:12:34" },
    { id: 2, event: "O2SN Provinsi 2026", date: "10 Mei 2026", stroke: "Bebas", distance: "50 M", time: "00:30:12" },
    { id: 3, event: "Kejurda Jabar 2026", date: "02 Mar 2026", stroke: "Dada", distance: "50 M", time: "00:45:20" },
    { id: 4, event: "Indonesia Open 2026", date: "12 Feb 2026", stroke: "Punggung", distance: "100 M", time: "01:15:30" },
    { id: 5, event: "KRAPSSI 2025", date: "15 Jun 2025", stroke: "Bebas", distance: "50 M", time: "00:33:10" },
    { id: 6, event: "KRAPSSI 2026", date: "16 Jun 2026", stroke: "Kupu", distance: "50 M", time: "00:35:10" },
    { id: 7, event: "Kejurcab Bandung", date: "01 Jan 2026", stroke: "Bebas", distance: "100 M", time: "01:05:40" },
    { id: 8, event: "Festival Aquatik 2026", date: "20 Jul 2026", stroke: "Bebas", distance: "200 M", time: "02:20:15" },
    { id: 9, event: "PORSENI 2026", date: "14 Agt 2026", stroke: "Dada", distance: "100 M", time: "01:30:45" },
    { id: 10, event: "PORSENI 2025", date: "14 Agt 2025", stroke: "Dada", distance: "100 M", time: "01:35:00" },
    { id: 11, event: "Kejuaraan Antar Klub", date: "10 Sep 2026", stroke: "Punggung", distance: "50 M", time: "00:32:10" },
    { id: 12, event: "Kejuaraan Antar Klub", date: "10 Sep 2025", stroke: "Punggung", distance: "50 M", time: "00:34:25" },
    { id: 13, event: "Invitasi Renang Nasional", date: "05 Nov 2026", stroke: "Kupu", distance: "100 M", time: "01:10:05" },
    { id: 14, event: "O2SN Nasional 2026", date: "20 Des 2026", stroke: "Bebas", distance: "50 M", time: "00:29:50" },
    { id: 15, event: "O2SN Nasional 2025", date: "20 Des 2025", stroke: "Bebas", distance: "50 M", time: "00:31:00" },
  ]

  const filteredResults = allChampionshipResults.filter(
    (r) => r.stroke === selectedStroke && r.date.includes(selectedYear)
  )

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 w-full pb-20">
      
      {/* Header */}
      <div className="bg-blue-600 px-6 pt-10 pb-6 rounded-b-3xl shadow-sm mb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-300 fill-yellow-300" /> Prestasi & Rekor
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          Pantau terus perkembangan rekor waktumu!
        </p>
      </div>

      <div className="px-4">
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 bg-slate-200/50 p-1 rounded-xl">
            <TabsTrigger value="program" className="rounded-lg text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              Program Latihan
            </TabsTrigger>
            <TabsTrigger value="kejuaraan" className="rounded-lg text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              Kejuaraan
            </TabsTrigger>
          </TabsList>

          {/* TAB: PROGRAM LATIHAN */}
          <TabsContent value="program" className="space-y-4 outline-none">
            {programRecords.map((record) => (
              <div key={record.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{record.distance} {record.stroke}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{record.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{record.time}</p>
                  <p className={`text-[10px] font-bold ${record.status.includes('Best') ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {record.status}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* TAB: KEJUARAAN */}
          <TabsContent value="kejuaraan" className="space-y-4 outline-none">
            
            {/* Input Manual Button */}
            <Button onClick={() => router.push('/athlete/prestasi/input')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 shadow-sm font-bold shadow-indigo-200">
              <Plus className="h-5 w-5 mr-2" />
              Input Manual Kejuaraan
            </Button>

            {/* Filters */}
            <div className="flex gap-2 mb-2">
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg text-xs p-2 text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
              
              <select 
                value={selectedStroke} 
                onChange={(e) => setSelectedStroke(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-lg text-xs p-2 text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
              >
                <option value="Bebas">Gaya Bebas</option>
                <option value="Dada">Gaya Dada</option>
                <option value="Punggung">Gaya Punggung</option>
                <option value="Kupu">Gaya Kupu-kupu</option>
              </select>
            </div>

            {/* Chart */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 mb-4">Tren Waktu (Detik) - {selectedStroke}</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    <Line type="monotone" name="Tahun Berjalan" dataKey="thisYear" stroke="#4f46e5" strokeWidth={3} dot={{ r: 3, fill: "#4f46e5", strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" name="Tahun Lalu" dataKey="lastYear" stroke="#cbd5e1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabel Hasil Perlombaan */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800">Semua Hasil Perlombaan</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white border-b border-slate-100">
                    <tr>
                      <th className="px-3 py-2.5 font-bold text-slate-600">Nomor Kejuaraan</th>
                      <th className="px-3 py-2.5 font-bold text-slate-600 text-center">Time Record</th>
                      <th className="px-3 py-2.5 font-bold text-slate-600">Nama Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((record) => (
                        <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                          <td className="px-3 py-3 font-semibold text-slate-800">{record.distance} {record.stroke}</td>
                          <td className="px-3 py-3 text-center">
                            <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                              {record.time}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-600">{record.event}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-3 py-6 text-center text-slate-400 font-medium">
                          Tidak ada data untuk filter ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}
