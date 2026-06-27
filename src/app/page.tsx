"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User, Waves, ArrowRight } from "lucide-react"

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
    <div className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-slate-900 font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519315901367-f34fa16b63ee?q=80&w=1920&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900/90 via-slate-900/90 to-black/95 backdrop-blur-sm" />

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />

      {/* Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10 transition-all">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="h-16 w-16 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-5">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight text-center">PSSC</h1>
            <p className="text-sm text-slate-300 mt-2 font-medium text-center">
              Performance & Swim Statistics Center
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email / ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleLogin("coach")}
                disabled={isLoading !== null}
                className="group relative flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-70 overflow-hidden"
              >
                {isLoading === "coach" ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Coach 
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </>
                )}
              </button>
              
              <button 
                onClick={() => handleLogin("athlete")}
                disabled={isLoading !== null}
                className="group relative flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-70 overflow-hidden"
              >
                {isLoading === "athlete" ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Athlete 
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Versi 1.0.0 • &copy; 2026 PSSC
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
