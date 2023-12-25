"use client"

import bord from './bord.module.scss'
import Bord from '../../comp/Bord'
import Community from '../../comp/Community'
import Link from 'next/link'
import { useState } from 'react'


function page() {
    const [activeComponent, setActiveComponent] = useState('board'); // 'board' 또는 'community'
    const handleButtonClicked = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div className={bord.board_main}>
                <section className={bord.board_section}>
                    <img src='../../imges/main_angel_cut.png' />
                    <ul className={bord.board_main_buttons}>
                        <li><button className={bord.navibutton +` ${activeComponent === 'board' ? bord.active : ''}`} onClick={() => handleButtonClicked('board')}>공지사항</button></li>
                        <li><button className={bord.navibutton +` ${activeComponent === 'community' ? bord.active : ''}`} onClick={() => handleButtonClicked('community')}>자유게시판</button></li>
                    </ul>
                </section>

                {activeComponent === 'board' ? <Bord /> : null}
                {activeComponent === 'community' ? <Community /> : null}

                <section className={bord.write_button}>
                    <Link href='./write'><img src="../../imges/icon_write.png" /></Link>
                </section>
            </div>


        </>
    )
}

export default page