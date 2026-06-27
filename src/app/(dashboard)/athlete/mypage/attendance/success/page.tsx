"use client"

import { Suspense } from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

function AttendanceSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = searchParams.get("type") || "in"

  // Simple motivational quotes
  const quotes = [
    "Kesuksesan berawal dari kedisiplinan hari ini.",
    "Beri yang terbaik untuk para atlet kita. Semangat!",
    "Langkah kecil setiap hari menghasilkan pencapaian besar.",
    "Jadilah inspirasi bagi mereka yang Anda latih hari ini."
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="flex flex-col h-[100dvh] w-full items-center justify-center p-6 text-center">
      
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full"></div>
        <CheckCircle className="h-32 w-32 text-emerald-500 relative z-10 mx-auto" />
      </div>

      <h1 className="text-2xl font-black text-foreground mb-2 tracking-widest uppercase">
        {type === 'in' ? 'Check-in Berhasil!' : 'Check-out Berhasil!'}
      </h1>
      
      <p className="text-sm font-medium text-muted-foreground mb-8">
        Data absensi Anda telah tersimpan di sistem.
      </p>

      <div className="bg-card border border-border p-6 rounded-3xl w-full max-w-sm mb-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
        <p className="italic text-foreground font-medium text-sm leading-relaxed tracking-wide">
          "{randomQuote}"
        </p>
      </div>

      <Button 
        onClick={() => router.push('/athlete/mypage')}
        className="w-full max-w-sm h-14 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 shadow-lg uppercase tracking-widest"
      >
        <Home className="h-5 w-5 mr-2" />
        Kembali ke MyPage
      </Button>

    </div>
  )
}

export default function AttendanceSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[100dvh] bg-background text-muted-foreground font-medium uppercase tracking-widest">Memuat...</div>}>
      <AttendanceSuccessContent />
    </Suspense>
  )
}
