"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState<"coach" | "athlete" | null>(null)
  
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = (role: "coach" | "athlete") => {
    setIsLoading(role)
    // Simulate API delay
    setTimeout(() => {
      if (role === "coach") {
        router.push("/coach/mypage")
      } else {
        router.push("/athlete/mypage")
      }
    }, 800)
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#161622] font-sans">
    
      {/* Theme Toggle Button */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="absolute top-6 right-6 z-50 h-10 w-10 bg-white/80 dark:bg-[#1f1e2e]/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-[#2a293d] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-xl/30"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      )}

      {/* Global Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-rose-100 via-rose-50 dark:from-[#602727] dark:via-[#331c1c] to-transparent pointer-events-none z-0" />

      {/* Watermark Logo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none -top-100">
        <img
          src="/assets/images/logo-parisakti.png"
          alt="Watermark"
          className="w-[200%] max-w-[1000px] object-contain opacity-10"
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">

        {/* Header Area */}
        <div className="flex flex-col items-center mb-10 pt-5">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 border-2 border-slate-200 dark:border-[#1f1e2e] z-10 shadow-xl/30">
            <img src="/assets/images/logo-parisakti.png" alt="PSSC Logo" className="h-full w-full object-contain drop-shadow-md" />
          </div>
          <h1 className="text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-widest uppercase -black/50 drop-shadow-md">
            PSSC
          </h1>
          <p className="text-xs text-slate-900 dark:text-white/90 mt-2 font-bold tracking-[0.2em] uppercase drop-shadow-md">
            Performance Statistics
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white dark:bg-[#1f1e2e] -black/50 rounded-3xl p-8 space-y-6 shadow-xl/30">

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Email / ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#ff4b4b]" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-slate-50 dark:bg-[#161622] text-slate-900 dark:text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-[#ff4b4b] border-none placeholder:text-slate-600 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#ff4b4b]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-[#161622] text-slate-900 dark:text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-[#ff4b4b] border-none placeholder:text-slate-600 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <button
              onClick={() => handleLogin("coach")}
              disabled={isLoading !== null}
              className="flex items-center justify-center gap-2 w-full bg-[#ff4b4b] hover:bg-[#e03c3c] text-white font-bold tracking-widest uppercase py-4 px-4 rounded-xl -red-500/20 transition-all disabled:opacity-70 text-sm shadow-xl/30"
            >
              {isLoading === "coach" ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Coach"
              )}
            </button>

            <button
              onClick={() => handleLogin("athlete")}
              disabled={isLoading !== null}
              className="flex items-center justify-center gap-2 w-full bg-slate-200 dark:bg-[#2a293d] hover:bg-slate-300 dark:hover:bg-[#34334a] text-slate-900 dark:text-white font-bold tracking-widest uppercase py-4 px-4 rounded-xl transition-all disabled:opacity-70 text-sm shadow-xl/30"
            >
              {isLoading === "athlete" ? (
                <div className="h-5 w-5 border-2 border-slate-400 dark:border-white/30 border-t-slate-900 dark:border-t-white rounded-full animate-spin" />
              ) : (
                "Athlete"
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            VERSION 1.0.0 • PSSC
          </p>
        </div>
      </div>
    </div>
  )
}