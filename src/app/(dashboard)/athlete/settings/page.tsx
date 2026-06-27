"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  User, Bell, Shield, Smartphone, HelpCircle, LogOut, ChevronRight, Moon, 
  Fingerprint
} from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"

export default function AthleteSettingsPage() {
  const router = useRouter()
  const [pushNotif, setPushNotif] = useState(true)
  const [emailNotif, setEmailNotif] = useState(false)
  const [biometricLogin, setBiometricLogin] = useState(true)

  const settingsGroups: any[] = [
    {
      title: "Akun & Profil",
      items: [
        { icon: User, label: "Edit Profil & Info Pribadi", href: "#", color: "text-blue-400" },
        { icon: Shield, label: "Keamanan & Kata Sandi", href: "#", color: "text-emerald-400" },
      ]
    },
    {
      title: "Preferensi Aplikasi",
      items: [
        { icon: Bell, label: "Notifikasi Push", isToggle: true, state: pushNotif, setter: setPushNotif, color: "text-amber-400" },
        { icon: Bell, label: "Notifikasi Email", isToggle: true, state: emailNotif, setter: setEmailNotif, color: "text-amber-400" },
        { icon: Fingerprint, label: "Login Biometrik / Face ID", isToggle: true, state: biometricLogin, setter: setBiometricLogin, color: "text-purple-400" },
        { icon: Moon, label: "Tema Gelap (Default)", isToggle: false, color: "text-slate-500 dark:text-slate-400", href: "#" },
      ]
    },
    {
      title: "Bantuan & Lainnya",
      items: [
        { icon: HelpCircle, label: "Pusat Bantuan & FAQ", href: "#", color: "text-[#ff4b4b]" },
        { icon: Smartphone, label: "Tentang PSSC App", href: "#", color: "text-slate-500 dark:text-slate-400" },
      ]
    }
  ]

  const handleLogout = () => {
    // Add logout logic later
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative">
      <GlobalHeader variant="pages" title="Pengaturan" />
      
      <main className="flex-1 w-full pb-32">
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
          
          {/* USER CARD COMPACT */}
          <div className="bg-white dark:bg-[#1f1e2e] p-4 rounded-2xl border border-slate-200 dark:border-[#2a293d] flex items-center gap-4 shadow-xl/30">
            <div className="w-14 h-14 bg-slate-100 dark:bg-[#2a293d] rounded-full flex items-center justify-center shrink-0 border-2 border-[#ff4b4b]">
              <User className="h-6 w-6 text-slate-600 dark:text-slate-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-slate-900 dark:text-white font-bold text-lg leading-tight uppercase tracking-wide">Bima Arya</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Atlet • KU-2</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-[#2a293d] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-[#2a293d] hover:text-slate-900 dark:text-white">
              Edit
            </Button>
          </div>

          {/* SETTINGS GROUPS */}
          <div className="space-y-6">
            {settingsGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <h3 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-2">
                  {group.title}
                </h3>
                <div className="bg-white dark:bg-[#1f1e2e] rounded-2xl border border-slate-200 dark:border-[#2a293d] overflow-hidden shadow-xl/30">
                  {group.items.map((item: any, iIdx: number) => {
                    const Icon = item.icon
                    const isLast = iIdx === group.items.length - 1
                    return (
                      <div 
                        key={iIdx} 
                        onClick={() => item.href ? router.push(item.href) : null}
                        className={`
                          flex items-center justify-between p-4 bg-white dark:bg-[#1f1e2e] transition-colors
                          ${!isLast ? 'border-b border-slate-200 dark:border-[#2a293d]' : ''}
                          ${item.href ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-[#2a293d]' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-slate-50 dark:bg-[#161622] ${item.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">{item.label}</span>
                        </div>
                        
                        {item.isToggle ? (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              item.setter(!item.state);
                            }}
                            className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${item.state ? 'bg-[#ff4b4b]' : 'bg-slate-300 dark:bg-[#2a293d]'}`}
                          >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${item.state ? 'translate-x-5' : 'translate-x-0'}`} />
                          </div>
                        ) : (
                          <ChevronRight className="h-4 w-4 text-slate-500" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* LOGOUT BUTTON */}
          <div className="pt-4">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full h-14 bg-transparent border-[#ff4b4b]/30 text-[#ff4b4b] hover:bg-[#ff4b4b]/10 hover:text-[#ff4b4b] font-bold tracking-widest uppercase rounded-2xl"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Keluar Akun
            </Button>
            <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">
              PSSC App v1.0.0
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
