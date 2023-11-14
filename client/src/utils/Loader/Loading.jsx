import React from 'react'
import 'animate.css';
export default function Loading() {
  return (
    <div class="loader  w-screen bg-transparent absolute z-50 flex animate__animated animate__fadeIn">
      <div class="spinner-border  mx-auto mt-1 text-stone-100" role="status"   >
        <span class="visually-hidden">Loading...</span>
      </div>

    </div>
  )
}
