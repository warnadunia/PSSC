"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Key, Mail, CheckCircle2, ArrowRight, Save, Lock } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"

export default function SecurityPage() {
  const router = useRouter()
  
  // State for Change Password
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false)

  // State for OTP Simulation
  const [otpStep, setOtpStep] = useState<"idle" | "sent" | "verified">("idle")
  const [email, setEmail] = useState("johndoe@email.com")
  const [otpCode, setOtpCode] = useState("")
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false)

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Kata sandi baru dan konfirmasi tidak cocok!")
      return
    }
    setIsSubmittingPassword(true)
    setTimeout(() => {
      setIsSubmittingPassword(false)
      alert("Kata sandi berhasil diubah!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  const handleSendOtp = () => {
    if (!email) return
    setIsSubmittingOtp(true)
    setTimeout(() => {
      setIsSubmittingOtp(false)
      setOtpStep("sent")
    }, 1000)
  }

  const handleVerifyOtp = () => {
    if (otpCode.length < 4) return
    setIsSubmittingOtp(true)
    setTimeout(() => {
      setIsSubmittingOtp(false)
      if (otpCode === "1234") { // Mock validation
        setOtpStep("verified")
        alert("Verifikasi berhasil! Silahkan buat kata sandi baru.")
      } else {
        alert("Kode OTP salah! (Gunakan 1234 untuk testing)")
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-transparent font-sans">
      <GlobalHeader variant="subpage" title="Keamanan & Kata Sandi" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* UBAH KATA SANDI REGULER */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-5 flex items-center gap-2">
              <Key className="h-4 w-4 text-emerald-500" /> Ubah Kata Sandi
            </h2>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Kata Sandi Saat Ini</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Masukkan kata sandi lama"
                  className="w-full bg-transparent text-slate-900 dark:text-white rounded-xl p-3.5 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Kata Sandi Baru</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Minimal 8 karakter"
                  className="w-full bg-transparent text-slate-900 dark:text-white rounded-xl p-3.5 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Konfirmasi Sandi Baru</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Ulangi kata sandi baru"
                  className="w-full bg-transparent text-slate-900 dark:text-white rounded-xl p-3.5 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmittingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg mt-2 transition-all"
              >
                {isSubmittingPassword ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Update Sandi
                  </>
                )}
              </Button>
            </form>
          </section>

          {/* LUPA KATA SANDI (OTP VERIFICATION) */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-1 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#ff4b4b]" /> Lupa Kata Sandi?
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-5 pl-6">Pulihkan akun menggunakan verifikasi email (OTP).</p>

            {otpStep === "idle" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Email Pemulihan</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email terdaftar"
                      className="w-full bg-transparent text-slate-900 dark:text-white rounded-xl p-3.5 pl-10 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-[#ff4b4b]/50 focus:border-[#ff4b4b] transition-all font-medium text-sm"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleSendOtp}
                  disabled={isSubmittingOtp || !email}
                  className="w-full h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-all"
                >
                  {isSubmittingOtp ? (
                    <div className="h-4 w-4 border-2 border-slate-500/30 border-t-current rounded-full animate-spin" />
                  ) : (
                    <>
                      Kirim Kode OTP <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {otpStep === "sent" && (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-3 mb-4">
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Kode 4 digit telah dikirim ke <span className="font-bold">{email}</span>. Berlaku selama 5 menit.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                    <span>Masukkan Kode OTP</span>
                    <span className="text-blue-500 cursor-pointer hover:underline">Kirim Ulang</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 1234"
                      className="w-full bg-transparent text-slate-900 dark:text-white rounded-xl p-3.5 pl-10 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-[#ff4b4b]/50 focus:border-[#ff4b4b] transition-all font-bold text-lg tracking-[0.5em]"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleVerifyOtp}
                  disabled={isSubmittingOtp || otpCode.length < 4}
                  className="w-full h-12 bg-[#ff4b4b] hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-all"
                >
                  {isSubmittingOtp ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Verifikasi Kode <CheckCircle2 className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => { setOtpStep("idle"); setOtpCode(""); }}
                  variant="ghost"
                  className="w-full h-10 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Batalkan
                </Button>
              </div>
            )}

            {otpStep === "verified" && (
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 mb-1">Verifikasi Berhasil</h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80 mb-4">Silakan atur kata sandi baru Anda melalui tautan yang kami kirimkan, atau gunakan form ubah sandi di atas jika sesi masih aktif.</p>
                <Button onClick={() => setOtpStep("idle")} variant="outline" className="h-8 text-[10px] uppercase tracking-widest font-bold">Tutup</Button>
              </div>
            )}

          </section>
        </div>
      </main>
    </div>
  )
}
