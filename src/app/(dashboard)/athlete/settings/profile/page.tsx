"use client"

import { useRouter } from "next/navigation"
import { Camera, Mail, Phone, MapPin, GraduationCap, Users, Droplets, Edit, User as UserIcon } from "lucide-react"
import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"

export default function ProfileReadPage() {
  const router = useRouter()

  const profileData = {
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+62 812-3456-7890",
    dob: "12 Agustus 2010",
    gender: "Laki-laki",
    bloodType: "O",
    height: "165 cm",
    weight: "55 kg",
    address: "Jl. Kaliurang KM 5, Sleman, DI Yogyakarta",
    
    school: "SMPN 1 Sleman",
    grade: "Kelas 9",
    
    parentName: "Budi Santoso",
    parentPhone: "+62 811-1234-5678",
    parentRelation: "Ayah"
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-transparent font-sans">
      <GlobalHeader variant="subpage" title="Profil & Info Pribadi" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* PHOTO SECTION */}
          <section className="flex flex-col items-center justify-center bg-white dark:bg-[#1f1e2e] p-6 rounded-3xl border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-[#2a293d] border-[3px] border-slate-200 dark:border-slate-600 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=62" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#ff4b4b] text-white rounded-full border-[3px] border-white dark:border-[#1f1e2e] shadow-lg hover:bg-red-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">{profileData.name}</h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Atlet • {profileData.email}</p>
          </section>

          {/* BASIC INFO */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <div className="bg-slate-100 dark:bg-[#2a293d]/50 px-5 py-3 border-b border-slate-200 dark:border-[#2a293d]">
              <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-blue-500" /> Data Diri
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Tanggal Lahir</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.dob}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Jenis Kelamin</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.gender}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-[#2a293d] pt-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Gol. Darah</p>
                  <div className="flex items-center text-sm font-semibold text-slate-900 dark:text-white">
                    <Droplets className="h-3.5 w-3.5 text-[#ff4b4b] mr-1.5" />
                    {profileData.bloodType}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Tinggi</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.height}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Berat</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.weight}</p>
                </div>
              </div>
            </div>
          </section>

          {/* SCHOOL INFO */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <div className="bg-slate-100 dark:bg-[#2a293d]/50 px-5 py-3 border-b border-slate-200 dark:border-[#2a293d]">
              <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-amber-500" /> Data Kesiswaan
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Asal Sekolah</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.school}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Kelas</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.grade}</p>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT INFO */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <div className="bg-slate-100 dark:bg-[#2a293d]/50 px-5 py-3 border-b border-slate-200 dark:border-[#2a293d]">
              <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" /> Kontak & Domisili
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 flex items-center"><Phone className="h-3 w-3 mr-1" /> Nomor HP (Aktif WA)</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.phone}</p>
              </div>
              <div className="border-t border-slate-100 dark:border-[#2a293d] pt-4">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 flex items-center"><MapPin className="h-3 w-3 mr-1" /> Alamat Domisili</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.address}</p>
              </div>
            </div>
          </section>

          {/* PARENT INFO */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl overflow-hidden border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <div className="bg-slate-100 dark:bg-[#2a293d]/50 px-5 py-3 border-b border-slate-200 dark:border-[#2a293d]">
              <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" /> Data Wali Darurat
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Nama Wali</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.parentName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Hubungan</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.parentRelation}</p>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-[#2a293d] pt-4">
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Nomor HP Wali</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{profileData.parentPhone}</p>
              </div>
            </div>
          </section>

          {/* ACTION BUTTON */}
          <Button 
            onClick={() => router.push('/athlete/settings/profile/edit')}
            className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30 transition-all mt-4"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Data Profil
          </Button>

        </div>
      </main>
    </div>
  )
}
