"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Camera, MapPin, Send, Crosshair, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

function AttendanceContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "in" // 'in' or 'out'

  const [hasSelfie, setHasSelfie] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push(`/athlete/mypage/attendance/success?type=${type}`)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-card border-b border-border sticky top-0 z-50 shrink-0 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-muted text-foreground">
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </Button>
        <h1 className="text-lg font-bold text-foreground tracking-widest uppercase flex-1">
          {type === 'in' ? 'Check In Kehadiran' : 'Check Out Kehadiran'}
        </h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-32">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">Silakan lengkapi data absensi Anda untuk sesi hari ini.</p>
        </div>

        {/* Selfie Module */}
        <div className="bg-card rounded-3xl p-5 shadow-sm border border-border mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground uppercase tracking-widest flex items-center">
              <Camera className="h-4 w-4 mr-2 text-primary" /> Foto Selfie
            </h3>
            {hasSelfie && <CheckCircle2 className="h-5 w-5 text-primary" />}
          </div>
          
          {!hasSelfie ? (
            <div 
              onClick={() => setHasSelfie(true)}
              className="w-full aspect-[3/4] bg-muted/50 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition-colors"
            >
              <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-3">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground uppercase tracking-widest">Ambil Foto</p>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">Pastikan wajah terlihat jelas</p>
            </div>
          ) : (
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative border border-border">
              <img 
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=800&auto=format&fit=crop" 
                alt="Selfie" 
                className="w-full h-full object-cover"
              />
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setHasSelfie(false)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur text-xs font-bold rounded-full uppercase tracking-widest text-foreground hover:bg-background"
              >
                Ulangi Foto
              </Button>
            </div>
          )}
        </div>

        {/* GPS Location Module */}
        <div className="bg-card rounded-3xl p-5 shadow-sm border border-border mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground uppercase tracking-widest flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" /> Lokasi GPS
            </h3>
            {hasLocation && <CheckCircle2 className="h-5 w-5 text-primary" />}
          </div>
          
          {!hasLocation ? (
            <Button 
              onClick={() => setHasLocation(true)}
              variant="outline" 
              className="w-full h-16 rounded-xl border-dashed border-2 border-border flex items-center justify-center gap-2 hover:bg-muted bg-transparent text-foreground"
            >
              <Crosshair className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold text-foreground uppercase tracking-widest">Kunci Lokasi Sekarang</span>
            </Button>
          ) : (
            <div className="w-full rounded-2xl overflow-hidden border border-border bg-background relative">
              <div className="h-32 w-full bg-primary/10 relative overflow-hidden flex items-center justify-center">
                {/* Mock Map Image */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                  alt="Map View" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="h-3 w-3 bg-primary rounded-full shadow-[0_0_0_2px_#1f1e2e]"></div>
                </div>
              </div>
              <div className="p-3 bg-card">
                <p className="text-[11px] font-bold text-foreground truncate uppercase tracking-widest">Kolam Renang Depok Sport Center</p>
                <p className="text-[9px] text-muted-foreground truncate mt-0.5">Jl. Seturan Raya, Caturtunggal, Depok, Sleman</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-primary/20 text-primary text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">Akurasi: Tinggi (3m)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-20 bg-card border-t border-border z-50">
        <Button 
          onClick={handleSubmit}
          disabled={!hasSelfie || !hasLocation || isSubmitting}
          className={`w-full h-14 rounded-2xl font-bold text-lg transition-all uppercase tracking-widest ${
            (!hasSelfie || !hasLocation) 
              ? 'bg-muted text-muted-foreground' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 shadow-lg'
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

export default function AttendancePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-background text-muted-foreground font-medium uppercase tracking-widest">Memuat...</div>}>
      <AttendanceContent />
    </Suspense>
  )
}
