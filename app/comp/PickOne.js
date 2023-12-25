"use client"
import pickone from '../pages/pickone/pickone.module.scss'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import axios from "axios";


function PickOne() {
    const [info, setInfo] = useState({});
    const id = usePathname().split('/')[3];
    const router = useRouter();

    const onMatchButtonClick = () => {
        axios.put('/api/matchlist', {
            id: id,
            opntid: sessionStorage.getItem('id'),
            y_status: 'yes'
        })
        .then(() => router.push(`/pages/contact/${id}`));
    }
    
    useEffect(() => {
        axios.get(`/api/member/${id}`)
        .then(res => {
            setInfo(res.data)
        });
    }, [])

    return (
        <div className={pickone.home}>

            <div className={pickone.cardtitle}>이런 이용자 님은 어떠세요? </div>
            <div className={pickone.card} >
                <img src="../../imges/main.png" />
                <div>{info.id}</div>
                <div>서울대학교 애견미용학과 중퇴</div>
                <div>{info.adderss} 거주</div>
                <div>{info.job}</div>
                <div>모험을 즐기는 사업가 ESTP</div>
                <div>{info.self}</div>
                <button onClick={onMatchButtonClick} className={pickone.match}>매칭할래요!</button>
                <div className={pickone.warning}>매칭은 하루에 한 번만 가능하며, 취소가 불가합니다.</div>
            </div>



        </div>
    )
}

export default PickOne