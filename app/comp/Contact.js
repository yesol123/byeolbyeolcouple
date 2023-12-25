"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import contact from '../pages/contact/contact.module.scss'


function Contact() {
    const id = usePathname().split('/')[3];
    const [kakao, setKakao] = useState("");
    useEffect(() => {
        axios.get(`/api/matchlist/matched?id=${id}&opntid=${sessionStorage.getItem('id')}`)
        .then(res => setKakao(res.data.kakao));
    }, []);

    return (
        <div className={contact.home}>

            <div className={contact.cardtitle}>
                매칭을 축하드립니다!<br/>
                공개된 연락처는 24시간 이후 삭제돼요.<br/>
                좋은 소식 기대할게요 (｡•̀ᴗ-)✧ </div>
            <div className={contact.card}>
                <div className={contact.row}>
                    <img src="../../imges/main.png" />
                    <img className={contact.heart} src="../../imges/image 12.png" />
                    <img src="../../imges/main.png" />
                </div>
                <div className={contact.warning}>상대의 연락처</div>
                <button className={contact.matchs}>{kakao}</button>
            </div>



        </div>
    )
}

export default Contact