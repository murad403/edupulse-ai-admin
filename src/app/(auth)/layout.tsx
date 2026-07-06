import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-[#F8FAFC] flex-col'>
      <div className="flex flex-col items-center justify-center gap-2 mb-6 text-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-main text-white shadow-sm shadow-orange-500/10">
          <svg
            className="size-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12,3.5 19.5,7.8 19.5,16.2 12,20.5 4.5,16.2 4.5,7.8" fill="none" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-title text-base leading-tight md:text-2xl">
            Teachers<span className="text-main">ai</span>pet
          </span>
          <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest leading-none mt-0.5">Admin Suite</span>
        </div>
      </div>
      <main className='max-w-3xl w-full mx-auto p-4 sm:p-0'>
        {children}
      </main>
    </div>
  )
}

export default layout