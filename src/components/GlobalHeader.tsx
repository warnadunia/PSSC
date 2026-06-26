"use client"

import { useRouter } from "next/navigation"
import { Menu, MessageSquare, Bell, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface GlobalHeaderProps {
  variant: "pages" | "subpage" | "slideup"
  title: string
  onClose?: () => void 
}

export function GlobalHeader({ variant, title, onClose }: GlobalHeaderProps) {
  const router = useRouter()

  if (variant === "subpage") {
    return (
      <header className="sticky top-0 z-40 w-full flex h-14 items-center gap-3 bg-white px-4 shadow-sm border-b">
        <Button variant="ghost" size="icon" className="-ml-2 shrink-0" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="font-bold text-slate-800 text-lg tracking-tight truncate">{title}</h1>
      </header>
    )
  }

  // Varian utama dengan branding Parisakti Red
  return (
    <header className="sticky top-0 z-40 w-full flex h-14 items-center justify-between bg-white px-4 shadow-sm border-b">
      <div className="flex items-center gap-3 overflow-hidden">
        <Sheet>
  {/* Hapus asChild, biarkan SheetTrigger merender button-nya sendiri */}
  <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100 -ml-2 shrink-0 text-red-600 transition-colors">
    <Menu className="h-5 w-5" />
  </SheetTrigger>
  
  <SheetContent side="left" className="w-[280px] bg-white">
            <SheetHeader className="text-left border-b pb-4 mb-4">
              <SheetTitle className="text-red-600 font-bold text-lg">Menu Utama</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <h1 className="font-bold text-red-600 text-lg tracking-tight truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="text-slate-500">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-500 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </Button>
      </div>
    </header>
  )
}