import React from 'react'

function LoadingPage() {
  return (
    <div className='w-full h-screen flex items-center justify-center flex-col gap-3'>
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-sky-600"></div>
      <h1 className='text-lg font-bold'>Loading...</h1>
    </div>
  )
}

export default LoadingPage