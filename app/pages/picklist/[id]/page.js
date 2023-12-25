"use client"
import React, { useEffect } from 'react'
import PickOne from '@/app/comp/PickOne'
import { usePathname, useSearchParams } from 'next/navigation';
function page() {
  
  return (
    <PickOne/>
  )
}

export default page