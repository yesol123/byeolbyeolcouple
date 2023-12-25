"use client"
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import fixSt from '../page.module.scss'
function Header() {

  return (
    <header className={fixSt.head}>
        <img src='../imges/line.png' className={fixSt.h_line}/>
        
    </header>   
  )
}

export default Header