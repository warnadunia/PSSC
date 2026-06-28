"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, FileText, Send, AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"

export default function PermissionPage() {
  const router = useRouter()
  const [type, setType] = useState<"ijin" | "sakit" | "khusus" | null>(null)
  const [reason, setReason] = useState("")
  const [date, setDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!type || !reason || !date) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Pengajuan ijin berhasil dikirim!")
      router.back()
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-slate-50 dark:bg-[#161622] font-sans">
      <GlobalHeader variant="subpage" title="Pengajuan Ijin" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* STATISTIK KEHADIRAN */}
          <section>
            <h2 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-2 mb-3">
              Statistik Ketidakhadiran
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#1f1e2e] p-4 rounded-2xl border border-slate-200 dark:border-[#2a293d] shadow-xl/30 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <Clock className="w-24 h-24 text-amber-500" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Ijin</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">3</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">kali</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1f1e2e] p-4 rounded-2xl border border-slate-200 dark:border-[#2a293d] shadow-xl/30 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <XCircle className="w-24 h-24 text-[#ff4b4b]" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-red-50 dark:bg-[#ff4b4b]/10 rounded-lg">
                    <XCircle className="h-4 w-4 text-[#ff4b4b]" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Bolos</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-[#ff4b4b] leading-none">1</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">kali</span>
                </div>
              </div>
            </div>
          </section>

          {/* FORM PENGAJUAN */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 md:p-6 border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#ff4b4b]" />
              Formulir Ijin
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* TIPE IJIN */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                  Kategori Ijin
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "ijin", label: "Ijin", icon: Clock },
                    { id: "sakit", label: "Sakit", icon: CheckCircle2 },
                    { id: "khusus", label: "Khusus", icon: AlertTriangle },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setType(item.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 shadow-xl ${
                        type === item.id 
                          ? 'border-[#ff4b4b] bg-red-50 dark:bg-[#ff4b4b]/10 text-[#ff4b4b]' 
                          : 'border-slate-200 dark:border-[#2a293d] bg-slate-50 dark:bg-[#161622] text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-[#2a293d]/50'
                      }`}
                    >
                      <item.icon className="h-6 w-6 mb-2" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TANGGAL */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                  Tanggal Latihan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#161622] text-slate-900 dark:text-white rounded-xl py-4 pl-12 pr-4 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-[#ff4b4b]/50 focus:border-[#ff4b4b] transition-all font-medium"
                  />
                </div>
              </div>

              {/* ALASAN */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
                  Alasan (Wajib)
                </label>
                <textarea
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Jelaskan alasan ketidakhadiran Anda secara singkat..."
                  className="w-full min-h-[120px] bg-slate-50 dark:bg-[#161622] text-slate-900 dark:text-white rounded-xl p-4 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-[#ff4b4b]/50 focus:border-[#ff4b4b] placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all font-medium resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={!type || !reason || !date || isSubmitting}
                className="w-full h-14 bg-[#ff4b4b] hover:bg-red-700 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30 transition-all"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pengajuan
                  </>
                )}
              </Button>

            </form>
          </section>

        </div>
      </main>
    </div>
  )
}
