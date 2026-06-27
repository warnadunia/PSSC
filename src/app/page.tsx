"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, Waves } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState<"coach" | "athlete" | null>(null)

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
    <div className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-[#161622] font-sans">
      
      {/* Sweeping Red Curve (Niru gambar referensi) */}
      <div className="absolute top-[-25%] left-[-15%] w-[130%] h-[60%] rounded-[100%] bg-gradient-to-br from-[#ff6b6b] to-[#ff4b4b] -rotate-6 origin-top-left shadow-[0_20px_50px_rgba(255,75,75,0.2)]" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Header Area */}
        <div className="flex flex-col items-center mb-10 pt-10">
          <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg mb-4 border border-white/30">
            <Waves className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-heading font-bold text-white tracking-widest uppercase shadow-black/50 drop-shadow-md">
            PSSC
          </h1>
          <p className="text-xs text-white/90 mt-2 font-bold tracking-[0.2em] uppercase drop-shadow-md">
            Performance Statistics
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#1f1e2e] shadow-2xl shadow-black/50 rounded-3xl p-8 space-y-6">
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email / ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#ff4b4b]" />
              </div>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full bg-[#161622] text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-[#ff4b4b] border-none placeholder:text-slate-600 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#ff4b4b]" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[#161622] text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-[#ff4b4b] border-none placeholder:text-slate-600 transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleLogin("coach")}
              disabled={isLoading !== null}
              className="flex items-center justify-center gap-2 w-full bg-[#ff4b4b] hover:bg-[#e03c3c] text-white font-bold tracking-widest uppercase py-4 px-4 rounded-xl shadow-lg shadow-red-500/20 transition-all disabled:opacity-70 text-sm"
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
              className="flex items-center justify-center gap-2 w-full bg-[#2a293d] hover:bg-[#34334a] text-white font-bold tracking-widest uppercase py-4 px-4 rounded-xl shadow-lg transition-all disabled:opacity-70 text-sm"
            >
              {isLoading === "athlete" ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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