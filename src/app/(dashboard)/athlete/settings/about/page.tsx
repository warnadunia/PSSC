"use client"

import { Globe, Smartphone, Heart } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-transparent font-sans">
      <GlobalHeader variant="subpage" title="Tentang Aplikasi" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        <div className="p-4 md:p-6 lg:p-8 space-y-6 flex flex-col items-center">
          
          {/* APP LOGO & VERSION */}
          <div className="flex flex-col items-center mt-8 mb-4">
            <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6">
              <img src="/assets/images/logo-parisakti.png" alt="PSSC Logo" className="w-full h-full object-contain" />
            </div>
            
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
              PSSC App
            </h1>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Versi 1.0.0 (Beta)
            </p>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Modul Atlet
            </div>
          </div>

          {/* DESCRIPTION CARD */}
          <section className="w-full bg-white dark:bg-[#1f1e2e] rounded-3xl p-6 border border-slate-200 dark:border-[#2a293d] shadow-lg/30 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              PSSC App adalah sistem manajemen olahraga terpadu yang dirancang khusus untuk <strong className="text-slate-900 dark:text-white">Progo Swimming Club Yogyakarta</strong>. 
              Aplikasi ini memfasilitasi komunikasi antara pelatih, pengurus, atlet, dan wali untuk menciptakan ekosistem pembinaan renang yang profesional, terstruktur, dan berbasis data.
            </p>
          </section>

          {/* SYSTEM INFO */}
          <section className="w-full bg-white dark:bg-[#1f1e2e] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#2a293d] shadow-lg/30">
            <div className="divide-y divide-slate-100 dark:divide-[#2a293d]">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Smartphone className="h-4 w-4 mr-3 text-blue-500" />
                  <span className="text-sm font-medium">Sistem Operasi</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Web App (PWA)</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center text-slate-600 dark:text-slate-300">
                  <Globe className="h-4 w-4 mr-3 text-emerald-500" />
                  <span className="text-sm font-medium">Lisensi & Kebijakan</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">Lihat Detail</span>
              </div>
            </div>
          </section>

          {/* DEVELOPER CREDIT */}
          <div className="pt-8 pb-4 text-center">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-center">
              Didesain & Dikembangkan Oleh
            </p>
            <div className="flex items-center justify-center space-x-2 text-slate-700 dark:text-slate-300">
              <span className="text-sm font-black tracking-tight">Warna Dunia</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 flex items-center justify-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500 fill-red-500" /> in Yogyakarta
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
