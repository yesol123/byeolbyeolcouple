"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import matchlist from '../pages/matchlist/matchlisr.module.scss'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';
import Image from 'next/image';
import genderMaleImage1 from '../../public/imges/gender_male1.png';
import genderMaleImage2 from '../../public/imges/gender_male2.png';
import genderMaleImage3 from '../../public/imges/gender_male3.png';	

import genderFemaleImage1 from '../../public/imges/gender_female1.png';
import genderFemaleImage2 from '../../public/imges/gender_female2.png';
import genderFemaleImage3 from '../../public/imges/gender_female3.png';

function getRandomGenderImage(e) {
			
	const maleImages = [genderMaleImage1,genderMaleImage2,genderMaleImage3];
	const femaleImages = [genderFemaleImage1,genderFemaleImage2,genderFemaleImage3];
	
	const images = (e === '남자') ? maleImages : femaleImages;
	const random = Math.floor(Math.random() * images.length);
	return images[random];
}


function Matchlist() {
	const [Mdata, setMData] = useState([]);
	const [Fdata, setFData] = useState([]);
	const [matching, setMatching] = useState([]);


	const currentUserID = typeof window !== 'undefined' ? sessionStorage.getItem('id') : null;
	const currentUserGender = typeof window !== 'undefined' ? sessionStorage.getItem('gender') : null;
	const filteredMdata = Mdata.filter((mobj) => mobj.id !== currentUserID);

	const getMData = () => {
		axios.get('/api/member')
			.then(res => {
				setMData(res.data);
			})
	}

	const getFData = () => {
		axios.get('/api/fortune')
			.then(res => {
				const data = res.data;
				console.log(data)
				setFData(data);
			})
	}
	

	const genderFilteredMdata = filteredMdata.filter((mobj) => {
		if (currentUserGender === '남자') {
			// 현재 사용자가 남자인 경우 여자 회원만 필터링
			return mobj.gender === '여자';
		} else if (currentUserGender === '여자') {
			// 현재 사용자가 여자인 경우 남자 회원만 필터링
			return mobj.gender === '남자';
		} else {
			// 사용자 성별 정보가 없거나 다른 경우, 모든 회원 표시
			return false;
		}
	});


	const birth = (dateStr) => {
		const year = dateStr.slice(0, 4);
		const month = dateStr.slice(4, 6);
		const day = dateStr.slice(6, 8);
		return `${year}.${month}.${day}`;
	}

	const saveData = (id, data) => {
		// 'like_' 접두어를 사용하여 ID 별로 데이터를 저장
		const key = `like_${id}`;
		localStorage.setItem(key, JSON.stringify(data));
	  };

	const getloclData = (id) => {
		const key = `like_${id}`;
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	  };


	const post = (e, mobj) => {
		e.preventDefault();
		const now = new Date();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const hours = now.getHours();
		const minutes = now.getMinutes();

		const fData = {
			id: currentUserID,
			opntid: mobj.id,
			m_status: 'yes',
			y_status: 'no',
			date: `${month}.${day}.${hours}.${minutes}`,
		};
		/*찜저장 */
		
		saveData(currentUserID,fData)
		setLikeMember((preLikedMember) => [...preLikedMember, fData]);
		const likeKey = `like_${currentUserID}_${mobj.id}`;
		axios.post('/api/matchlist', fData)
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(likeKey, JSON.stringify(fData))
		}
	}
	const isLiked = (member) => likeMember.some((item) => item.opntid === member.id);
	const [likeMember, setLikeMember] = useState([]);
	useEffect(() => {
		if (!Fdata.length) fetchData();
		matchingData();
		const likeItems = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key.startsWith('like_')) {
				const id = key.replace('like_', '');
				const likeData = getloclData(currentUserID);
			if (likeData) {
			likeItems.push(likeData);
			}
		}
	}
		setLikeMember(likeItems)
	}, [Fdata,currentUserID]);

	const fetchData = async () => {
		await getMData();
		await getFData();
	}

	const matchNum = (str) => {
		try {
			const reg = /\d/g
			const findNum = str.match(reg);
			return findNum
		} catch {
			return null;
		}
	}

	const matchingData = () => {
		axios.get(`/api/fortune?id=${currentUserID}&type=fortuneCheck`)
			.then(res => {
				const myData = matchNum(res.data[0].yourelement);
				let matchCount = 0;
				let matchArry = [];

				Fdata.forEach((obj) => {
					let findMatch = matchNum(obj.myelement);
					try {
						for (let k = 0; k < myData.length; k++) {

							if (myData[k] == findMatch[k]) {
								matchCount++;
							}
							if (matchCount >= 2) {
								let genderCheck = genderFilteredMdata.filter(g => g.id == obj.id);
								if (genderCheck.length) matchArry.push(obj.id);
								break;
							}
						}
					} catch { }
					matchCount = 0;
				})

				setMatching(matchArry);

			})
	}
	console.log(matching);
	useEffect(() => {
		(!Fdata.length) ? fetchData() : matchingData();
	}, [Fdata]);

	const getMatchingMembers = () => {

		const matchedMembers = matching.map((id) => {
			const member = genderFilteredMdata.find((mobj) => mobj.id === id);
			const matchingFdata = Fdata.find((fobj) => fobj.id === id);

			return { member, matchingFdata };
		});

		return matchedMembers;
	};
	const btnRef = useRef();
	const [actItem, setActItem] = useState(null);

	const classAct = (mbtnRef) => {
		if (actItem) {
			actItem.classList.add(matchlist.on)
		}
		mbtnRef.current.classList.add(matchlist.on)
		setActItem(mbtnRef.current);
	}
	useEffect(()=>{
		setActItem()
	},[classAct])
	if (!matching.length) return <div className={matchlist.loading}><img src='../imges/loading.gif' /></div>;

	const matchedMembers = getMatchingMembers();

	console.log(matchedMembers);


	


	return (
		<>
			<div className={matchlist.matchlist}>
				<h2>
					회원님과 잘 맞는 상대를 추천할게요!
				</h2>
				<Swiper
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={'auto'}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 200,
						modifier: 1.5,
						slideShadows: true,
					}}
					modules={[EffectCoverflow]}
					className={matchlist.swiper}
				>
					{

						matchedMembers.map(({ member, matchingFdata }) => (

							<SwiperSlide key={member.id} className={matchlist.swiper_slide}>
								<div className={matchlist.slide_content}>
									<figure>
									{member.gender === '남자' ? (
										<Image src={getRandomGenderImage('남자')} />
									) : (
										<Image src={getRandomGenderImage('여자')} />
									)}
									</figure>
									<h2>{member.name}</h2>
									<p>
										{member.gender} <span>( {birth(member.date || "N/A")} )</span>
									</p>
									<p>{member.adderss} 거주</p>
									<p>{member.job}</p>
									<p>{member.self}</p>

									{matchingFdata && (
										<p className={matchlist.match_fortune}>{matchingFdata.myelement}</p>
									)}

								</div>


								<div className={matchlist.match_button}>
									<button ref={btnRef} className={`${matchlist.postbtn} ${actItem === btnRef.current ? matchlist.on : ''}`} onClick={(e) => { post(e, member); classAct(btnRef); }}>
										{isLiked(member) ? "이미 찜했어요!!!!!!!!!!!!" : "찜할래요"}
									</button>
									<button ref={btnRef} className={`${matchlist.actbtn} ${actItem === btnRef.current ? matchlist.on : ''}`}>이미 찜했어요!!!!!!!!!!!!</button>
										
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</>
	);
}

export default Matchlist