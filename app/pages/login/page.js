"use client";
import React, { useState,useEffect } from 'react'
import Login from '../../comp/Login'
function page() {
    const [isLogin, setIsLogin] = useState(false)
 
    useEffect(() => {
        if(typeof window !== 'undefined'){
            if(window.sessionStorage.getItem('id') === null){
            // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
            console.log('isLogin ?? :: ', isLogin)
            } else {
            // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
            // 로그인 상태 변경
            setIsLogin(true)
            console.log('isLogin ?? :: ', isLogin)
            }
        }
    })
    return (
        <Login/>
    )
}

export default page