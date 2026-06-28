"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Utensils, Flame, Droplets, Leaf, CheckCircle2, Activity } from "lucide-react"

export default function NutritionPage() {
  const router = useRouter()
  
  const [meals, setMeals] = useState({
    preWorkout: false,
    postWorkout: false,
    veggies: false,
    hydration: false
  })

  const handleSave = () => {
    alert("Food log berhasil disimpan. Terus penuhi bahan bakar Anda!")
    router.back()
  }

  const toggleMeal = (key: keyof typeof meals) => {
    setMeals(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-[#fff5f5] dark:bg-background text-foreground font-sans z-0">
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-rose-100 via-[#fff5f5] to-[#fff5f5] dark:from-[#602727] dark:via-[#331c1c] dark:to-transparent -z-10 pointer-events-none"></div>

      <GlobalHeader variant="subpage" title="Nutrition Log" />

      <main className="flex-1 overflow-y-auto w-full pb-32 px-4 md:px-6 pt-6 space-y-6">
        
        <div className="mb-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-slate-900 dark:text-white">Precision <span className="text-[#ff4b4b]">Fuel</span></h1>
          <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium mt-1 leading-relaxed">Catat asupan nutrisi wajib hari ini. Pastikan mesin Anda mendapatkan bahan bakar terbaik.</p>
        </div>

        <Card className="bg-white dark:bg-card border-slate-200 dark:border-border shadow-xl/30 rounded-3xl overflow-hidden">
          <div className="bg-slate-100 dark:bg-secondary/50 p-4 border-b border-slate-200 dark:border-border flex justify-between items-center">
            <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Utensils className="h-4 w-4 text-[#ff4b4b]" /> Daily Checklist
            </h2>
            <span className="text-[10px] font-bold bg-[#ff4b4b] text-white px-2 py-0.5 rounded-full">
              {Object.values(meals).filter(Boolean).length} / 4 Selesai
            </span>
          </div>
          <CardContent className="p-0">
            
            <div 
              className={`p-5 border-b border-slate-100 dark:border-border flex gap-4 cursor-pointer transition-colors ${meals.preWorkout ? 'bg-amber-50 dark:bg-amber-500/10' : 'hover:bg-slate-50 dark:hover:bg-secondary/30'}`}
              onClick={() => toggleMeal('preWorkout')}
            >
              <Checkbox checked={meals.preWorkout} className="mt-1 h-5 w-5 rounded-full border-amber-500 data-[state=checked]:bg-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-amber-500" /> Pre-Workout Carbs
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground font-medium leading-relaxed">Konsumsi karbohidrat cepat serap (pisang, roti) 45 menit sebelum latihan.</p>
              </div>
            </div>

            <div 
              className={`p-5 border-b border-slate-100 dark:border-border flex gap-4 cursor-pointer transition-colors ${meals.postWorkout ? 'bg-blue-50 dark:bg-blue-500/10' : 'hover:bg-slate-50 dark:hover:bg-secondary/30'}`}
              onClick={() => toggleMeal('postWorkout')}
            >
              <Checkbox checked={meals.postWorkout} className="mt-1 h-5 w-5 rounded-full border-blue-500 data-[state=checked]:bg-blue-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-blue-500" /> Post-Workout Window
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground font-medium leading-relaxed">20g Protein (susu/whey) + 40g Karbohidrat maksimal 30 menit setelah selesai di kolam.</p>
              </div>
            </div>

            <div 
              className={`p-5 border-b border-slate-100 dark:border-border flex gap-4 cursor-pointer transition-colors ${meals.veggies ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'hover:bg-slate-50 dark:hover:bg-secondary/30'}`}
              onClick={() => toggleMeal('veggies')}
            >
              <Checkbox checked={meals.veggies} className="mt-1 h-5 w-5 rounded-full border-emerald-500 data-[state=checked]:bg-emerald-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Leaf className="h-4 w-4 text-emerald-500" /> 3 Colors Rule
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground font-medium leading-relaxed">Makan minimal 3 warna sayur atau buah berbeda hari ini untuk Immune Shield.</p>
              </div>
            </div>

            <div 
              className={`p-5 flex gap-4 cursor-pointer transition-colors ${meals.hydration ? 'bg-cyan-50 dark:bg-cyan-500/10' : 'hover:bg-slate-50 dark:hover:bg-secondary/30'}`}
              onClick={() => toggleMeal('hydration')}
            >
              <Checkbox checked={meals.hydration} className="mt-1 h-5 w-5 rounded-full border-cyan-500 data-[state=checked]:bg-cyan-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Droplets className="h-4 w-4 text-cyan-500" /> Base Hydration
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground font-medium leading-relaxed">Sudah meminum 2 liter air di luar sesi latihan (kebutuhan dasar).</p>
              </div>
            </div>

          </CardContent>
        </Card>

      </main>

      <div className="fixed bottom-0 w-full bg-white dark:bg-card border-t border-slate-200 dark:border-border p-4 z-50">
        <Button onClick={handleSave} className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30">
          <CheckCircle2 className="mr-2 h-4 w-4" /> Save Fuel Log
        </Button>
      </div>
    </div>
  )
}
