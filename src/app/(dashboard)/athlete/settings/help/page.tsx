"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, FileText } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "Bagaimana cara mengajukan ijin tidak masuk latihan?",
    answer: "Anda dapat menuju menu 'Ijin/Cuti' dari tombol cepat di beranda atau lewat Sidebar. Pilih tanggal, jenis ijin (Sakit/Keperluan Khusus), lalu tuliskan alasannya. Pelatih akan melihat pengajuan Anda secara otomatis."
  },
  {
    question: "Di mana saya bisa melihat jadwal latihan dan perlombaan?",
    answer: "Semua jadwal tersedia di halaman 'Jadwal Agenda' (Schedules). Jadwal yang ditandai dengan warna berbeda memiliki arti berbeda: hijau untuk Latihan Umum, kuning untuk Event Lomba, dan merah untuk Libur."
  },
  {
    question: "Apa arti parameter VO2 Max di Rapor saya?",
    answer: "VO2 Max adalah ukuran kapasitas maksimum tubuh Anda dalam menggunakan oksigen selama olahraga intens. Semakin tinggi angkanya, semakin baik daya tahan (endurance) kardiovaskular Anda di air."
  },
  {
    question: "Bagaimana jika data profil saya ada yang salah?",
    answer: "Anda bisa masuk ke menu 'Pengaturan' > 'Edit Profil & Info Pribadi' untuk mengubah data yang salah. Pastikan menekan tombol 'Simpan Perubahan' di bagian paling bawah formulir."
  },
  {
    question: "Apakah saya perlu membawa handphone ke tepi kolam untuk absen?",
    answer: "Tidak. Kehadiran saat latihan akan dicatat langsung oleh Asisten Pelatih melalui modul pelatih di aplikasi mereka. Anda hanya bisa melihat status kehadiran Anda setelah sesi latihan selesai."
  }
]

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-slate-50 dark:bg-[#161622] font-sans">
      <GlobalHeader variant="subpage" title="Pusat Bantuan" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* BANNER */}
          <div className="bg-gradient-to-br from-[#ff4b4b] to-rose-600 rounded-3xl p-6 text-white shadow-xl/30 relative overflow-hidden">
            <HelpCircle className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
            <h2 className="text-xl font-black mb-2 relative z-10">Halo, ada yang bisa kami bantu?</h2>
            <p className="text-xs font-medium text-white/80 relative z-10 max-w-[80%]">
              Temukan jawaban cepat untuk pertanyaan seputar penggunaan PSSC App modul Atlet.
            </p>
          </div>

          {/* FAQ SECTION */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <div className="bg-slate-100 dark:bg-[#2a293d]/50 px-5 py-3 border-b border-slate-200 dark:border-[#2a293d]">
              <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" /> Pertanyaan Umum (FAQ)
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-[#2a293d]">
              {faqs.map((faq, index) => (
                <div key={index} className="overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-white dark:bg-[#1f1e2e] hover:bg-slate-50 dark:hover:bg-[#2a293d]/50 transition-colors text-left"
                  >
                    <span className="text-sm font-bold text-slate-900 dark:text-white pr-4">{faq.question}</span>
                    <div className={`p-1 rounded-full shrink-0 transition-transform ${openIndex === index ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-slate-100 text-slate-400 dark:bg-[#2a293d] dark:text-slate-500'}`}>
                      {openIndex === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-5 pb-5 pt-1 bg-white dark:bg-[#1f1e2e]">
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed p-3 bg-slate-50 dark:bg-[#161622] rounded-xl border border-slate-100 dark:border-[#2a293d]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT ADMIN */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 border border-slate-200 dark:border-[#2a293d] shadow-xl/30 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Masih Butuh Bantuan?</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 px-4">Jika Anda mengalami kendala teknis atau memiliki pertanyaan lain, silakan hubungi tim Admin Klub.</p>
            <Button variant="outline" className="w-full max-w-[200px] h-10 border-slate-200 dark:border-[#2a293d] text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-100 dark:hover:bg-[#2a293d]">
              Hubungi Admin
            </Button>
          </section>

        </div>
      </main>
    </div>
  )
}
