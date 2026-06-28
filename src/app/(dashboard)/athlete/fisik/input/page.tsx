"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Ruler, Scale, Footprints, Save, CheckCircle2, Activity } from "lucide-react"

export default function FisikInputPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    wingspan: "",
    footSize: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    alert("Data fisik berhasil disimpan! AI Engine sedang melakukan sinkronisasi dengan profil hidrodinamika.")
    router.back()
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0">
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-rose-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#602727] dark:via-[#331c1c] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Input Data Fisik" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Update <span className="text-[#ff4b4b]">Biometrik</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Formulir pembaruan data fisik atlet (disarankan update setiap 1-2 bulan).</p>
        </div>

        <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl/30 rounded-3xl overflow-hidden">
          <div className="bg-slate-100 dark:bg-secondary/50 p-4 border-b border-slate-200 dark:border-border">
            <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#ff4b4b]" /> Metrik Pertumbuhan
            </h2>
          </div>
          <CardContent className="p-5 space-y-5">
            
            {/* Tinggi Badan */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Ruler className="h-3.5 w-3.5 text-blue-500" /> Tinggi Badan
              </label>
              <div className="relative">
                <Input 
                  type="number"
                  name="height"
                  placeholder="Contoh: 168"
                  value={formData.height}
                  onChange={handleChange}
                  className="pl-4 pr-12 h-14 bg-slate-50 dark:bg-[#161622] border-slate-200 dark:border-border text-lg font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">CM</span>
              </div>
            </div>

            {/* Berat Badan */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Scale className="h-3.5 w-3.5 text-amber-500" /> Berat Badan
              </label>
              <div className="relative">
                <Input 
                  type="number"
                  name="weight"
                  placeholder="Contoh: 62"
                  value={formData.weight}
                  onChange={handleChange}
                  className="pl-4 pr-12 h-14 bg-slate-50 dark:bg-[#161622] border-slate-200 dark:border-border text-lg font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">KG</span>
              </div>
            </div>

            {/* Wingspan */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-emerald-500" /> Rentang Lengan (Wingspan)
              </label>
              <div className="relative">
                <Input 
                  type="number"
                  name="wingspan"
                  placeholder="Contoh: 175"
                  value={formData.wingspan}
                  onChange={handleChange}
                  className="pl-4 pr-12 h-14 bg-slate-50 dark:bg-[#161622] border-slate-200 dark:border-border text-lg font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">CM</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Ukur panjang dari ujung jari tengah kiri hingga kanan saat merentangkan tangan lurus.</p>
            </div>

            {/* Ukuran Kaki */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Footprints className="h-3.5 w-3.5 text-cyan-500" /> Ukuran Kaki (Sepatu/Fins)
              </label>
              <div className="relative">
                <Input 
                  type="number"
                  name="footSize"
                  placeholder="Contoh: 42"
                  value={formData.footSize}
                  onChange={handleChange}
                  className="pl-4 pr-12 h-14 bg-slate-50 dark:bg-[#161622] border-slate-200 dark:border-border text-lg font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">EU</span>
              </div>
            </div>

          </CardContent>
        </Card>

      </main>

      <div className="fixed bottom-0 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button onClick={handleSave} className="w-full h-14 bg-[#ff4b4b] hover:bg-red-600 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30">
          <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Data Fisik
        </Button>
      </div>
    </div>
  )
}
