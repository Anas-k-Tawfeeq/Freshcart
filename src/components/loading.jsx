import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4ade80"
        radius="9"
        ariaLabel="loading products"
      />
    </div>
  )
}
