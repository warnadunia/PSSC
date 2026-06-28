"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, User, Phone, MapPin, Droplet, CalendarDays, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dummy data for biodata
const getBiodata = (id: string) => {
  return {
    id: id,
    name: "Bima Arya 'The Torpedo' Wibowo",
    dob: "12 Agustus 2008",
    age: "17 Tahun",
    height: "178 cm",
    weight: "68 kg",
    bloodType: "O+",
    club: "PSSC Yogyakarta",
    coach: "John Doe",
    joinDate: "Januari 2023",
    specialty: "Sprint Freestyle",
    level: "Elite (Nasional)",
    phone: "+62 812 3456 7890",
    address: "Jl. Kaliurang KM 9, Sleman, DI Yogyakarta",
    emergencyContact: {
      name: "Bpk. Wibowo (Ayah)",
      phone: "+62 811 2233 4455"
    },
    photo: "https://i.pravatar.cc/150?u=bimaarya"
  }
}

export default function BiodataPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  
  const biodata = getBiodata(resolvedParams.id)

  return (
    <div className="flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center bg-card border-b border-border sticky top-0 z-50 shrink-0 shadow-lg/30">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 mr-3 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold text-foreground uppercase tracking-widest flex-1">Biodata Lengkap</h1>
      </div>

      <main className="flex-1 overflow-y-auto w-full p-4 pb-12">
        
        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-6 border border-border mb-4 flex flex-col items-center text-center relative overflow-hidden shadow-lg/30">
          <div className="absolute top-0 left-0 w-full h-24 bg-primary/20"></div>
          
          <Avatar className="h-24 w-24 ring-4 ring-card mb-4 relative z-10 shadow-lg/30">
            <AvatarImage src={biodata.photo} alt={biodata.name} className="object-cover" />
            <AvatarFallback className="bg-primary text-primary-foreground font-black text-3xl">
              {biodata.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-black text-foreground uppercase tracking-widest mb-1">{biodata.name}</h2>
          <p className="text-sm font-semibold text-primary mb-3">{biodata.level}</p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-muted/50 text-muted-foreground border border-border text-xs font-bold rounded-full">
              {biodata.specialty}
            </span>
            <span className="px-3 py-1 bg-muted/50 text-muted-foreground border border-border text-xs font-bold rounded-full">
              {biodata.club}
            </span>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-card p-3 rounded-2xl border border-border flex flex-col items-center justify-center text-center shadow-lg/30">
            <Activity className="h-5 w-5 text-blue-500 mb-1" />
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Tinggi</p>
            <p className="text-sm font-black text-foreground">{biodata.height}</p>
          </div>
          <div className="bg-card p-3 rounded-2xl border border-border flex flex-col items-center justify-center text-center shadow-lg/30">
            <Activity className="h-5 w-5 text-emerald-500 mb-1" />
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Berat</p>
            <p className="text-sm font-black text-foreground">{biodata.weight}</p>
          </div>
          <div className="bg-card p-3 rounded-2xl border border-border flex flex-col items-center justify-center text-center shadow-lg/30">
            <Droplet className="h-5 w-5 text-red-500 mb-1 fill-red-500/20" />
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Gol. Darah</p>
            <p className="text-sm font-black text-foreground">{biodata.bloodType}</p>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="bg-card rounded-3xl p-5 border border-border space-y-4 shadow-lg/30">
          
          <div>
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground/50" /> Informasi Personal
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-xs text-muted-foreground font-medium">Tempat, Tgl Lahir</span>
                <span className="text-xs font-bold text-foreground text-right">{biodata.dob}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-xs text-muted-foreground font-medium">Usia</span>
                <span className="text-xs font-bold text-foreground text-right">{biodata.age}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-xs text-muted-foreground font-medium">Alamat</span>
                <span className="text-xs font-bold text-foreground text-right w-1/2 line-clamp-2">{biodata.address}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground font-medium">No. Telepon</span>
                <a href={`https://wa.me/${biodata.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:underline text-right">{biodata.phone}</a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground/50" /> Kepelatihan
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-xs text-muted-foreground font-medium">Pelatih Utama</span>
                <span className="text-xs font-bold text-foreground text-right">{biodata.coach}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground font-medium">Tanggal Bergabung</span>
                <span className="text-xs font-bold text-foreground text-right">{biodata.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground/50" /> Kontak Darurat
            </h3>
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
              <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">{biodata.emergencyContact.name}</p>
              <a href={`https://wa.me/${biodata.emergencyContact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary/80 hover:underline">{biodata.emergencyContact.phone}</a>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
