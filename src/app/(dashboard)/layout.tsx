import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Biarkan kosong tanpa styling max-w-md supaya layout baru di /coach bisa fluid w-full
  return (
    <div className="w-full h-[100dvh]">
      {children}
    </div>
  )
}