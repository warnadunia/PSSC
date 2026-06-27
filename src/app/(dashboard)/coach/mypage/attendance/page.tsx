"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Camera, MapPin, Send, Crosshair, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AttendancePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "in" // 'in' or 'out'

  const [hasSelfie, setHasSelfie] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push(`/coach/mypage/attendance/success?type=${type}`)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 w-full" suppressHydrationWarning>
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 shrink-0 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100">
          <ChevronLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight flex-1">
          {type === 'in' ? 'Check In Kehadiran' : 'Check Out Kehadiran'}
        </h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-32">
        <div className="mb-6">
          <p className="text-sm text-slate-500 mb-1">Silakan lengkapi data absensi Anda untuk sesi hari ini.</p>
        </div>

        {/* Selfie Module */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Camera className="h-4 w-4 mr-2 text-blue-500" /> Foto Selfie
            </h3>
            {hasSelfie && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          </div>
          
          {!hasSelfie ? (
            <div 
              onClick={() => setHasSelfie(true)}
              className="w-full aspect-[3/4] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
            >
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <Camera className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-600">Ambil Foto</p>
              <p className="text-[10px] text-slate-400 mt-1">Pastikan wajah terlihat jelas</p>
            </div>
          ) : (
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=800&auto=format&fit=crop" 
                alt="Selfie" 
                className="w-full h-full object-cover"
              />
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setHasSelfie(false)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-xs font-bold rounded-full"
              >
                Ulangi Foto
              </Button>
            </div>
          )}
        </div>

        {/* GPS Location Module */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-rose-500" /> Lokasi GPS
            </h3>
            {hasLocation && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          </div>
          
          {!hasLocation ? (
            <Button 
              onClick={() => setHasLocation(true)}
              variant="outline" 
              className="w-full h-16 rounded-xl border-dashed border-2 border-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Crosshair className="h-5 w-5 text-slate-500" />
              <span className="font-semibold text-slate-600">Kunci Lokasi Sekarang</span>
            </Button>
          ) : (
            <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative">
              <div className="h-32 w-full bg-blue-100 relative overflow-hidden flex items-center justify-center">
                {/* Mock Map Image */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                  alt="Map View" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="h-3 w-3 bg-blue-600 rounded-full shadow-[0_0_0_2px_white]"></div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <p className="text-[11px] font-bold text-slate-800 truncate">Kolam Renang Depok Sport Center</p>
                <p className="text-[9px] text-slate-500 truncate mt-0.5">Jl. Seturan Raya, Caturtunggal, Depok, Sleman</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-emerald-100 text-emerald-700 text-[8px] font-bold px-2 py-0.5 rounded-sm">Akurasi: Tinggi (3m)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-50">
        <Button 
          onClick={handleSubmit}
          disabled={!hasSelfie || !hasLocation || isSubmitting}
          className={`w-full h-14 rounded-2xl font-bold text-lg transition-all ${
            (!hasSelfie || !hasLocation) 
              ? 'bg-slate-200 text-slate-400' 
              : type === 'in' 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 shadow-lg' 
                : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25 shadow-lg'
          }`}
        >
          {isSubmitting ? (
            "Memproses..."
          ) : (
            <><Send className="h-5 w-5 mr-2" /> KIRIM DATA</>
          )}
        </Button>
      </div>
    </div>
  )
}
