"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Timer, Edit3, Play, Square, X } from "lucide-react"

import { GlobalHeader } from "@/components/GlobalHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const availableEvents = [
  "50 M Gaya Bebas", "100 M Gaya Bebas", "200 M Gaya Bebas", "400 M Gaya Bebas",
  "50 M Gaya Punggung", "100 M Gaya Punggung", "200 M Gaya Punggung",
  "50 M Gaya Dada", "100 M Gaya Dada", "200 M Gaya Dada",
  "50 M Gaya Kupu-kupu", "100 M Gaya Kupu-kupu", "200 M Gaya Kupu-kupu",
  "200 M Gaya Ganti Perorangan", "400 M Gaya Ganti Perorangan"
]

export default function InputKejuaraanPage() {
  const router = useRouter()
  
  // Data Master
  const [events, setEvents] = useState<any[]>([])

  const addEventRow = () => {
    setEvents([...events, { id: Date.now(), name: "", timeRecord: "", ranking: "" }])
  }

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeEditItem, setActiveEditItem] = useState<any>(null)
  const [tempTime, setTempTime] = useState("")
  const [tempRank, setTempRank] = useState("")

  // Stopwatch Modal State
  const [isStopwatchModalOpen, setIsStopwatchModalOpen] = useState(false)
  const [activeTimerItem, setActiveTimerItem] = useState<any>(null)
  
  const [timeMs, setTimeMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle Edit Modal
  const openEditModal = (item: any) => {
    setActiveEditItem(item)
    setTempTime(item.timeRecord)
    setTempRank(item.ranking)
    setIsEditModalOpen(true)
  }

  const saveEdit = () => {
    if (activeEditItem) {
      setEvents(events.map(ev => ev.id === activeEditItem.id ? { ...ev, timeRecord: tempTime, ranking: tempRank } : ev))
    }
    setIsEditModalOpen(false)
  }

  // Handle Stopwatch Modal
  const openStopwatchModal = (item: any) => {
    setActiveTimerItem(item)
    setTimeMs(0)
    setIsRunning(false)
    setIsStopwatchModalOpen(true)
  }

  const toggleStopwatch = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsRunning(false)
    } else {
      setIsRunning(true)
      const startTime = Date.now() - timeMs
      timerRef.current = setInterval(() => setTimeMs(Date.now() - startTime), 10)
    }
  }

  const saveStopwatch = () => {
    if (activeTimerItem) {
      setEvents(events.map(ev => ev.id === activeTimerItem.id ? { ...ev, timeRecord: formatTime(timeMs) } : ev))
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setIsStopwatchModalOpen(false)
  }

  const closeStopwatch = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsStopwatchModalOpen(false)
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000).toString().padStart(2, "0")
    const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0")
    const millis = Math.floor((ms % 1000) / 10).toString().padStart(2, "0")
    return `${mins}:${secs}.${millis}`
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 w-full relative">
      
      {/* Header Khusus agar bisa Back */}
      <header className="bg-indigo-600 text-white px-4 h-16 flex items-center shrink-0 shadow-sm sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-indigo-500 hover:text-white mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-lg tracking-tight">Input Data Kejuaraan</h1>
      </header>

      <main className="flex-1 overflow-y-auto w-full pb-40">
        <div className="p-4 space-y-6">
          
          {/* Form Informasi Event */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Informasi Umum</h2>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Nama Event</label>
              <Input placeholder="Contoh: KRAPSI 2026" className="bg-slate-50 border-slate-200" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Tingkat Kejuaraan</label>
              <select defaultValue="" className="w-full bg-slate-50 border border-slate-200 rounded-md text-sm p-2">
                <option value="" disabled>Pilih Tingkat</option>
                <option value="Klub">Antar Perkumpulan / Klub</option>
                <option value="Kabupaten">Tingkat Kota / Kabupaten</option>
                <option value="Provinsi">Tingkat Provinsi</option>
                <option value="Nasional">Tingkat Nasional</option>
                <option value="Internasional">Tingkat Internasional</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Tanggal Event</label>
                <Input type="date" className="bg-slate-50 border-slate-200 text-xs" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">Kelompok Usia (KU)</label>
                <select defaultValue="KU-2" className="w-full bg-slate-50 border border-slate-200 rounded-md text-xs p-2">
                  <option value="" disabled>Pilih KU</option>
                  <option value="KU-4">KU 4 (10-11 Tahun)</option>
                  <option value="KU-3">KU 3 (12-13 Tahun)</option>
                  <option value="KU-2">KU 2 (14-15 Tahun)</option>
                  <option value="KU-1">KU 1 (16-18 Tahun)</option>
                  <option value="Senior">Senior (19+ Tahun)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabel Nomor Kejuaraan */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-indigo-900">Tabel Nomor Kejuaraan</h2>
                <p className="text-[10px] text-indigo-700 mt-0.5">Daftar nomor lomba standar Aquatic Indonesia.</p>
              </div>
              <Button onClick={addEventRow} size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700 text-[10px] font-bold">
                + Tambah Nomor
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[40%]">Nomor Kejuaraan</th>
                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center w-[25%]">Time Record</th>
                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center w-[15%]">Rangking</th>
                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center w-[20%]">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3">
                        <select 
                          className="w-full bg-transparent border border-slate-200 rounded-md text-xs font-semibold text-slate-800 p-1.5 focus:ring-0"
                          value={ev.name}
                          onChange={(e) => setEvents(events.map(item => item.id === ev.id ? {...item, name: e.target.value} : item))}
                        >
                          <option value="" disabled>Pilih Nomor</option>
                          {availableEvents.map(evt => (
                             <option key={evt} value={evt}>{evt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 text-center">
                        {ev.timeRecord ? (
                          <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                            {ev.timeRecord}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium italic">- Kosong -</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {ev.ranking ? (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 w-6 h-6 inline-flex items-center justify-center rounded-full">
                            {ev.ranking}
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          {/* Stopwatch Button */}
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => openStopwatchModal(ev)}
                            className="h-7 w-7 rounded-full text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            title="Start Stopwatch"
                          >
                            <Timer className="h-3.5 w-3.5" />
                          </Button>
                          {/* Edit Button */}
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => openEditModal(ev)}
                            className="h-7 w-7 rounded-full text-slate-600 border-slate-200 hover:bg-slate-100"
                            title="Input Manual / Edit"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Save Button */}
      <div className="fixed bottom-16 w-full bg-white border-t p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button onClick={() => {
            alert('Data Kejuaraan berhasil disimpan!');
            router.back();
        }} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold text-sm shadow-md rounded-xl">
          <Save className="mr-2 h-4 w-4" /> Simpan Semua Data
        </Button>
      </div>

      {/* ===================================== */}
      {/* MODAL EDIT MANUAL */}
      {/* ===================================== */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-[340px] rounded-2xl p-0 overflow-hidden bg-white">
          <DialogHeader className="p-4 bg-slate-50 border-b">
            <DialogTitle className="text-sm font-bold text-slate-800">
              Input Manual & Edit
            </DialogTitle>
            <p className="text-xs text-slate-500 mt-1">{activeEditItem?.name}</p>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Time Record</label>
              <Input 
                value={tempTime} 
                onChange={(e) => setTempTime(e.target.value)} 
                placeholder="Contoh: 01:22.45" 
                className="font-mono text-sm bg-slate-50"
              />
              <p className="text-[10px] text-slate-400">Format yang disarankan: MM:SS.ms (01:22.45)</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block">Rangking Lomba</label>
              <Input 
                type="number"
                value={tempRank} 
                onChange={(e) => setTempRank(e.target.value)} 
                placeholder="Contoh: 17" 
                className="bg-slate-50"
              />
            </div>
            <Button onClick={saveEdit} className="w-full bg-indigo-600 hover:bg-indigo-700 h-10 mt-2 font-bold">
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===================================== */}
      {/* MODAL STOPWATCH LIVE */}
      {/* ===================================== */}
      <Dialog open={isStopwatchModalOpen} onOpenChange={(open) => !open && closeStopwatch()}>
        <DialogContent className="max-w-[340px] rounded-3xl p-0 overflow-hidden bg-slate-900 border-none">
          <div className="p-4 flex justify-between items-center border-b border-slate-800">
            <div>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Live Event Timer</p>
              <p className="text-sm font-bold text-white mt-0.5">{activeTimerItem?.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={closeStopwatch} className="h-8 w-8 text-slate-400 hover:text-white rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 text-center">
            <div className="text-6xl font-mono font-black text-white tracking-tighter mb-8 shadow-sm">
              {formatTime(timeMs)}
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={toggleStopwatch} 
                className={`flex-1 h-12 rounded-xl font-bold shadow-lg ${isRunning ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
              >
                {isRunning ? <><Square className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Start</>}
              </Button>
              <Button 
                onClick={saveStopwatch} 
                disabled={timeMs === 0 || isRunning}
                className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" /> Pakai Waktu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
