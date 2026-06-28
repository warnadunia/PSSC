"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Stethoscope, HeartPulse, Apple, BedDouble, Dumbbell, Activity, Save, AlertCircle } from "lucide-react"

const treatmentOptions = [
  {
    category: "Nutrisi & Suplemen",
    icon: <Apple className="h-4 w-4 text-emerald-500" />,
    items: [
      { id: "nut-1", label: "Tingkatkan asupan Protein (Dada Ayam/Telur)", points: "+15 Poin Recovery" },
      { id: "nut-2", label: "Konsumsi Suplemen Zat Besi (Sesuai resep)", points: "+10 Poin Recovery" },
      { id: "nut-3", label: "Rehidrasi Elektrolit Penuh pasca latihan", points: "+5 Poin Recovery" }
    ]
  },
  {
    category: "Istirahat & Recovery Khusus",
    icon: <BedDouble className="h-4 w-4 text-blue-500" />,
    items: [
      { id: "rec-1", label: "Tidur Wajib Minimal 9 Jam", points: "+20 Poin Recovery" },
      { id: "rec-2", label: "Ice Bath (10 Menit)", points: "+15 Poin Recovery" },
      { id: "rec-3", label: "Sesi Fisioterapi (Cek otot bahu)", points: "+25 Poin Recovery" }
    ]
  },
  {
    category: "Latihan Ringan Darat (Dryland)",
    icon: <Dumbbell className="h-4 w-4 text-amber-500" />,
    items: [
      { id: "dry-1", label: "Stretching Statis Pagi (15 Menit)", points: "+10 Poin Recovery" },
      { id: "dry-2", label: "Foam Rolling (Fokus Kaki)", points: "+10 Poin Recovery" },
      { id: "dry-3", label: "Yoga / Mobility Ringan", points: "+15 Poin Recovery" }
    ]
  }
]

export default function HomeTreatmentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const handleToggle = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSave = () => {
    // Simulasi save
    router.push(`/coach/athletes/${resolvedParams.id}`)
  }

  return (
    <div className="flex flex-col min-h-full w-full relative" suppressHydrationWarning>
      
      <GlobalHeader variant="subpage" title="Beri Home Treatment" />

      <main className="flex-1 px-4 md:px-6 pt-5 pb-28 space-y-6 w-full">
        
        {/* INFO BOX */}
        <div className="bg-[#ff4b4b]/10 p-3 rounded-2xl border border-[#ff4b4b]/20 shadow-lg/30 flex gap-3">
          <AlertCircle className="h-5 w-5 text-[#ff4b4b] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-[12px] text-[#ff4b4b] uppercase tracking-widest mb-1">Intervensi Stagnasi</h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Pilih menu <span className="font-bold">Home Treatment</span> di bawah ini untuk membantu pemulihan atlet. Instruksi ini akan otomatis muncul di aplikasi atlet.
            </p>
          </div>
        </div>

        {/* LIST MENU TREATMENT */}
        <section className="space-y-4">
          {treatmentOptions.map((cat, idx) => (
            <Card key={idx} className="border-border bg-card shadow-lg/30 overflow-hidden">
              <CardHeader className="bg-muted/30 p-3 border-b border-border">
                <CardTitle className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                  {cat.icon} {cat.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col divide-y divide-border">
                  {cat.items.map(item => {
                    const isSelected = selectedItems.includes(item.id)
                    return (
                      <div 
                        key={item.id}
                        onClick={() => handleToggle(item.id)}
                        className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/30'}`}
                      >
                        <div className="flex-1 pr-4">
                          <p className={`text-[11px] font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {item.label}
                          </p>
                          <p className="text-[9px] font-semibold text-emerald-500 mt-1 uppercase tracking-widest">
                            {item.points}
                          </p>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary border-primary' : 'bg-card border-border'}`}>
                          {isSelected && <Activity className="h-3.5 w-3.5 text-primary-foreground" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* CATATAN PELATIH */}
        <section className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Catatan Tambahan (Opsional)</label>
          <textarea 
            className="w-full h-24 bg-card border border-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-lg/30 resize-none"
            placeholder="Ketik catatan untuk atlet di sini..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>

        {/* BUTTON SAVE */}
        <div className="pt-4">
          <Button 
            className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 shadow-lg/30 font-bold uppercase tracking-widest text-xs"
            onClick={handleSave}
            disabled={selectedItems.length === 0}
          >
            <Save className="mr-2 h-4 w-4" /> 
            {selectedItems.length > 0 ? `Tugaskan (${selectedItems.length} Item)` : 'Pilih Menu Treatment'}
          </Button>
        </div>

      </main>
    </div>
  )
}
