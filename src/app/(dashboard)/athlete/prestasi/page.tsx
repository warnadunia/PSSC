import { Trophy, Plus, Medal, Activity, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrestasiPage() {
  const programRecords = [
    { id: 1, date: "24 Jun 2026", stroke: "Gaya Bebas", distance: "50m", time: "32.40s", status: "Personal Best 🚀" },
    { id: 2, date: "10 Jun 2026", stroke: "Gaya Dada", distance: "50m", time: "45.10s", status: "Stabil" },
    { id: 3, date: "01 Jun 2026", stroke: "Gaya Kupu-kupu", distance: "100m", time: "01:23.10", status: "Base Time" },
  ]

  const championshipRecords = [
    { id: 1, event: "O2SN Tingkat Provinsi", date: "15 Mei 2026", stroke: "Gaya Bebas", distance: "50m", time: "31.90s", rank: "Juara 2" },
    { id: 2, event: "Kejuaraan Renang Antar Perkumpulan (KRAP)", date: "02 Mar 2026", stroke: "Gaya Punggung", distance: "100m", time: "01:15.20", rank: "Juara 1" },
  ]

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
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 shadow-sm font-bold shadow-indigo-200">
              <Plus className="h-5 w-5 mr-2" />
              Input Manual Kejuaraan
            </Button>

            {championshipRecords.map((record) => (
              <div key={record.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400"></div>
                
                <div className="flex justify-between items-start mb-3 pl-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight pr-2">{record.event}</h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{record.date}</p>
                  </div>
                  <div className="bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-100 shrink-0">
                    <span className="text-[10px] font-black text-yellow-700 uppercase">{record.rank}</span>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between pl-4">
                  <div className="flex items-center gap-2">
                    <Medal className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-700">{record.distance} {record.stroke}</span>
                  </div>
                  <span className="font-bold text-indigo-600">{record.time}</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}
