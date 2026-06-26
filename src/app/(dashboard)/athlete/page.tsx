import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AthleteDashboard() {
  const dummyHistory = [
    { id: 1, date: "24 Jun", stroke: "Bebas", distance: "50m", time: "32.40s", status: "PB 🚀" },
    { id: 2, date: "10 Jun", stroke: "Dada", distance: "50m", time: "45.10s", status: "-0.5s" },
    { id: 3, date: "01 Jun", stroke: "Bebas", distance: "50m", time: "33.10s", status: "Base" },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-md -mx-1">
        <h1 className="text-2xl font-bold tracking-tight">Halo, Budi! 👋</h1>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none">Intermediate</Badge>
        </div>
      </div>

      <Tabs defaultValue="workout" className="w-full mt-2">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-slate-100">
          <TabsTrigger value="workout" className="text-xs">Latihan Mandiri 🔴</TabsTrigger>
          <TabsTrigger value="raport" className="text-xs">Raport Waktu</TabsTrigger>
        </TabsList>

        <TabsContent value="workout">
          <div className="space-y-3">
            <Card className="border-orange-200 bg-orange-50/50 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold text-orange-800">Kekuatan Tarikan</CardTitle>
                    <CardDescription className="text-xs mt-1">Oleh: Coach Andi | 20 Menit</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-[13px] text-slate-700 space-y-1.5 bg-white p-3 rounded-lg border border-orange-100 mb-3">
                  <p>• Karet Pulling 3 x 15 rep</p>
                  <p>• Push up lutut 3 x 10 rep</p>
                  <p>• Plank 3 x 30 detik</p>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 h-10 shadow-sm text-sm">
                  ✓ Selesai Latihan Ini
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200 opacity-60">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm text-slate-700 line-through">Core & Keseimbangan</CardTitle>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">Selesai ✓</Badge>
                </div>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="raport">
          <div className="space-y-3">
            <h2 className="font-semibold text-sm text-slate-700">Riwayat Time Trial</h2>
            {dummyHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
                <div>
                  <p className="font-bold text-sm text-slate-800">{item.distance} {item.stroke}</p>
                  <p className="text-[11px] text-slate-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{item.time}</p>
                  <p className={`text-[10px] font-semibold ${item.status.includes('PB') || item.status.includes('-') ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
