"use client"

import { GlobalHeader } from "@/components/GlobalHeader"

export default function DailyPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full relative bg-transparent font-sans">
      <GlobalHeader variant="pages" title="Daily Activity" />
      <main className="flex-1 overflow-y-auto w-full pb-32 p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Daily Activity</h2>
          <p className="text-sm">Fitur ini sedang dalam pengembangan.</p>
        </div>
      </main>
    </div>
  )
}
