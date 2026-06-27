"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Calendar, User, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AnnouncementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  
  // Mock data based on id
  const getAnnouncementInfo = (id: string) => {
    if (id === '1') {
      return {
        title: "Kejurda Jateng 2026",
        date: "25 Juni 2026",
        sender: "Pengurus Pusat PSSC",
        tag: "Event Mendatang",
        tagColor: "bg-red-100 text-red-700",
        content: `Halo para Pelatih (Coach),
        
Terkait dengan agenda tahunan PSSC, Kejuaraan Daerah (Kejurda) renang Jawa Tengah 2026 akan diselenggarakan pada akhir bulan depan.

Kami meminta seluruh head coach dan asisten pelatih untuk segera mempersiapkan atlet lapis 1 (Elite) guna mengikuti babak kualifikasi gaya bebas dan gaya ganti.

Pendaftaran internal atlet akan ditutup pada 10 Juli 2026. Mohon segera melakukan input time trial (TT) atlet potensial Anda melalui sistem.

Terima kasih atas kerja kerasnya.`
      }
    } else {
      return {
        title: "Program V02 Max Baru",
        date: "26 Juni 2026",
        sender: "Pusat Pelatihan & Kurikulum",
        tag: "Update Kurikulum",
        tagColor: "bg-blue-100 text-blue-700",
        content: `Halo rekan-rekan Pelatih,

Pusat Pelatihan dan Kurikulum telah merilis bank latihan hypoxic (V02 Max) terbaru untuk kuartal ini. Program ini difokuskan untuk meningkatkan endurance dan kapasitas paru-paru atlet senior.

Silahkan cek menu "Beri Latihan" > "Bank Latihan Pusat" untuk melihat rincian setnya. Kami merekomendasikan program ini untuk di-assign segera ke atlet tingkat Elite cabang masing-masing.

Tetap semangat dalam mencetak juara!`
      }
    }
  }

  const announcement = getAnnouncementInfo(resolvedParams.id)

  return (
    <div className="flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-white dark:bg-[#1f1e2e] border-b border-slate-200 dark:border-[#2a293d] sticky top-0 z-50 shrink-0 shadow-xl/30">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-slate-100 dark:hover:bg-[#2a293d]">
          <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex-1">Detail Pengumuman</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-12">
        <div className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-6 border border-slate-200 dark:border-[#2a293d] mb-6 shadow-xl/30">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${announcement.tagColor}`}>
              {announcement.tag}
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            {announcement.title}
          </h2>

          <div className="flex flex-col gap-2 mb-6 pb-6 border-b border-slate-200 dark:border-[#2a293d]">
            <div className="flex items-center text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">{announcement.date}</span>
            </div>
            <div className="flex items-center text-slate-500 dark:text-slate-400">
              <User className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Oleh: <span className="text-slate-900 dark:text-white font-semibold">{announcement.sender}</span></span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {announcement.content}
          </div>
        </div>
      </main>
    </div>
  )
}
