"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, User as UserIcon, GraduationCap, Users, Camera, Image as ImageIcon } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"

export default function ProfileEditPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPhotoOptions, setShowPhotoOptions] = useState(false)

  // Default values based on the read-only page
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+62 812-3456-7890",
    dob: "2010-08-12",
    gender: "Laki-laki",
    bloodType: "O",
    height: "165",
    weight: "55",
    address: "Jl. Kaliurang KM 5, Sleman, DI Yogyakarta",
    
    school: "SMPN 1 Sleman",
    grade: "Kelas 9",
    
    parentName: "Budi Santoso",
    parentPhone: "+62 811-1234-5678",
    parentRelation: "Ayah"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Profil berhasil diperbarui!")
      router.back()
    }, 1000)
  }

  // Reusable input component for styling
  const InputField = ({ label, type = "text", name, placeholder, required = false, as = "input", options = [] }: any) => {
    const commonClass = "w-full bg-transparent text-slate-900 dark:text-white rounded-xl p-3.5 border border-slate-200 dark:border-[#2a293d] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600"
    
    return (
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">
          {label} {required && <span className="text-[#ff4b4b]">*</span>}
        </label>
        
        {as === "input" && (
          <input 
            type={type} 
            name={name} 
            value={(formData as any)[name]} 
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={commonClass}
          />
        )}

        {as === "select" && (
          <select 
            name={name} 
            value={(formData as any)[name]} 
            onChange={handleChange}
            required={required}
            className={`${commonClass} appearance-none`}
          >
            <option value="" disabled>Pilih {label}</option>
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )}

        {as === "textarea" && (
          <textarea 
            name={name} 
            value={(formData as any)[name]} 
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={`${commonClass} min-h-[80px] resize-none`}
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-transparent font-sans">
      <GlobalHeader variant="subpage" title="Edit Profil" />

      <main className="flex-1 overflow-y-auto w-full pb-32">
        <form onSubmit={handleSubmit} className="p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* FOTO PROFIL */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-6 border border-slate-200 dark:border-[#2a293d] shadow-xl/30 flex flex-col items-center relative">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-[#2a293d] border-[3px] border-slate-200 dark:border-slate-600 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=62" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button 
                type="button"
                onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                className="absolute bottom-0 right-0 p-2 bg-[#ff4b4b] text-white rounded-full border-[3px] border-white dark:border-[#1f1e2e] shadow-lg hover:bg-red-600 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            {showPhotoOptions && (
              <div className="absolute top-32 z-10 bg-white dark:bg-[#2a293d] rounded-xl shadow-2xl border border-slate-200 dark:border-[#161622] p-2 flex flex-col gap-1 min-w-[160px] animate-in fade-in zoom-in duration-200">
                <button type="button" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f1e2e] rounded-lg transition-colors text-left" onClick={() => { alert('Membuka Kamera...'); setShowPhotoOptions(false) }}>
                  <Camera className="h-4 w-4 text-blue-500" /> Ambil Foto
                </button>
                <button type="button" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f1e2e] rounded-lg transition-colors text-left" onClick={() => { alert('Membuka Galeri...'); setShowPhotoOptions(false) }}>
                  <ImageIcon className="h-4 w-4 text-emerald-500" /> Unggah dari Galeri
                </button>
              </div>
            )}
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Ketuk ikon kamera untuk mengubah</p>
          </section>

          {/* BAGIAN 1: PROFIL DASAR */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-5 flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-blue-500" /> Profil Dasar
            </h2>
            
            <div className="space-y-4">
              <InputField label="Nama Lengkap" name="name" required />
              
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Tanggal Lahir" name="dob" type="date" required />
                <InputField label="Jenis Kelamin" name="gender" as="select" options={["Laki-laki", "Perempuan"]} required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <InputField label="Gol. Darah" name="bloodType" as="select" options={["A", "B", "AB", "O", "Belum Tahu"]} />
                <InputField label="Tinggi (cm)" name="height" type="number" placeholder="160" />
                <InputField label="Berat (kg)" name="weight" type="number" placeholder="50" />
              </div>
            </div>
          </section>

          {/* BAGIAN 2: DATA KESISWAAN */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-5 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-amber-500" /> Data Kesiswaan
            </h2>
            
            <div className="space-y-4">
              <InputField label="Asal Sekolah" name="school" placeholder="Contoh: SMPN 1 Sleman" required />
              <InputField label="Kelas" name="grade" as="select" options={["SD Kelas 1", "SD Kelas 2", "SD Kelas 3", "SD Kelas 4", "SD Kelas 5", "SD Kelas 6", "SMP Kelas 7", "SMP Kelas 8", "SMP Kelas 9", "SMA Kelas 10", "SMA Kelas 11", "SMA Kelas 12", "Perguruan Tinggi", "Lulus/Umum"]} required />
            </div>
          </section>

          {/* BAGIAN 3: INFO KONTAK & KELUARGA */}
          <section className="bg-white dark:bg-[#1f1e2e] rounded-3xl p-5 border border-slate-200 dark:border-[#2a293d] shadow-xl/30">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide mb-5 flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-500" /> Kontak & Keluarga
            </h2>
            
            <div className="space-y-4">
              <InputField label="Nomor HP / WhatsApp Aktif" name="phone" type="tel" required />
              <InputField label="Alamat Domisili Lengkap" name="address" as="textarea" required />
              
              <div className="border-t border-slate-100 dark:border-[#2a293d] pt-4 mt-2 space-y-4">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Kontak Darurat (Wali)</p>
                <InputField label="Nama Wali" name="parentName" required />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Hubungan" name="parentRelation" as="select" options={["Ayah", "Ibu", "Kakak", "Kakek/Nenek", "Lainnya"]} required />
                  <InputField label="No. HP Wali" name="parentPhone" type="tel" required />
                </div>
              </div>
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-xl/30 transition-all mt-4"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </Button>

        </form>
      </main>
    </div>
  )
}
