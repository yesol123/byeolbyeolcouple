"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import joinSt from "../pages/join/join.module.scss";
import { useRouter } from "next/navigation";

function Join() {
  const nav = useRouter();

  function genderPick(e) {
    const target = e.target;
    if (target.id === "male" && target.checked) {
      document.getElementById("female").checked = false;
    } else if (target.id === "female" && target.checked) {
      document.getElementById("male").checked = false;
    }
  }

  const insertJoin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);

    const maleChecked = e.target.elements.male.checked;
    const femaleChecked = e.target.elements.female.checked;
    const privacyAgree = e.target.elements.privacy.checked;

    let allFilled = true;

    if (!maleChecked && !femaleChecked) allFilled = false;
    if (!privacyAgree) allFilled = false;

    for (let key in value) {
      if (!value[key]) {
        allFilled = false;
        break;
      }
    }

    if (!allFilled) {
      alert("모든 항목을 채워주세요");
      return;
    }

    axios.post("/api/member", value);
    axios.post("/api/fortune", { id: value.id });
    axios.post("/api/matchlist", { id: value.id, date: value });
    nav.push("./login");
  };

  const elId = useRef();
  const [msg, setMsg] = useState("");
  const [use, setUse] = useState();
  const [msgSt, setMsgSt] = useState({});

  const idCheck = async (e) => {
    e.preventDefault();
    await axios.get(`/api/idcheck?id=${elId.current.value}`).then((res) => {
      setUse(res.data);
      if (res.data == "중복") {
        setMsg("다시확인해주세요");
        setMsgSt({ color: "red" });
      } else {
        setMsg("사용가능합니다.");
        setMsgSt({ color: "green" });
      }
    });
  };
  return (
    <div className={joinSt.j_home}>
      <h3>
        별별연인에 오신 것을 환영 합니다!
        <br />
        아래에 프로필을 작성해 주세요.
      </h3>
      <div className={joinSt.idcheck}>
        <p>{msg}</p>
        <button className={joinSt.check} onClick={idCheck}>
          중복체크
        </button>
      </div>
      <form className={joinSt.info} onSubmit={insertJoin}>
        <input
          ref={elId}
          type="text"
          name="id"
          placeholder="아이디"
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="password"
          placeholder="비밀번호"
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="name"
          placeholder="이름"
          autoComplete="off"
        ></input>
        <div className={joinSt.label}>
          <label htmlFor="male">남자</label>
          <input
            className={joinSt.check}
            type="checkbox"
            id="male"
            name="gender"
            value="남자"
            onChange={genderPick}
          />
          <label htmlFor="female">여자</label>
          <input
            className={joinSt.check}
            type="checkbox"
            id="female"
            name="gender"
            value="여자"
            onChange={genderPick}
          />
        </div>
        <input
          type="text"
          name="adderss"
          placeholder="지역 (시, 구까지 적어주세요)"
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="date"
          placeholder="생년월일 (0000-00-00)"
          autoComplete="off"
        ></input>
        <select className={joinSt.time} name="time">
          <option>자시(子時) - 23시 ~ 01시</option>
          <option>축시 (丑時) - 01시 ~ 03시</option>
          <option>인시 (寅時) - 03시 ~ 05시</option>
          <option>묘시 (卯時) - 05시 ~ 07시</option>
          <option>진시 (辰時) - 07시 ~ 09시</option>
          <option>사시 (巳時) - 09시 ~ 11시</option>
          <option>오시 (午時) - 11시 ~ 13시</option>
          <option>미시 (未時) - 13시 ~ 15시</option>
          <option>신시 (申時) - 15시 ~ 17시</option>
          <option>유시 (酉時) - 17시 ~ 19시</option>
          <option>술시 (戌時) - 19시 ~ 21시</option>
          <option>해시 (亥時) - 21시 ~ 23시</option>
          <option>태어난 시 모름</option>
        </select>
        <select className={joinSt.time} name="calendartype">
          <option>양력</option>
          <option>음력</option>
          <option>음력(윤달)</option>
        </select>
        <input
          type="text"
          name="job"
          placeholder="직업"
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="self"
          placeholder="본인을 한 줄 소개해 주세요"
          autoComplete="off"
        ></input>
        <input
          type="text"
          name="kakao"
          placeholder="카카오 계정"
          autoComplete="off"
        ></input>
        <div className={joinSt.privacy}>
          <p className={joinSt.p_text}>
            회원가입 개인정보 수집 및 이용 동의 <br />
            1. 수집하는 개인정보
            <br />
            (1) 회사는 최초 회원 가입시 원활한 고객상담, 서비스 제공을 위해
            아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
            <br />
            필수항목 : 아이디,비밀번호,이름,성별,주소,태어난
            시,직업,본인소개,카카오계정정보 등<br />
            (2) 서비스 이용 과정이나 사업처리 과정에서 아래와 <br />
            같은 정보들이 추가로 수집될 수 있습니다.
            <br />
            거래정보 : 개인의 경우 생년월일(정기결제에 한함),
            신용카드정보(신용카드번호, 유효기간, 비밀번호 앞 두 자리),
            세금계산서 발행을 위한 회계 담당자 정보(이름, 연락처, 이메일주소) 등
            <br />
            서비스 이용 정보 : 서명 요청자 및 참여자 정보 (이름, 이메일 주소,
            전화번호), 전화번호, IP 주소, 쿠키, 방문 일시, 서비스 이용 기록,
            불량 이용 기록, 브라우저 정보, 운영체제 정보(OS), 사용 기기 정보,
            MAC 주소, 방문 일시 등<br />
            <br />
            2. 개인정보의 수집 및 이용목적
            <br />
            (1) 회원관리
            <br />
            회원제 서비스 제공 및 개선, 개인식별, 이용약관 위반 회원에 대한
            이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스
            부정이용 행위 제재, 가입의사 확인,가입 및 가입횟수 제한, 만14세 미만
            아동의 개인정보 수집 시 법정 대리인 동의여부 확인, 추후 법정 대리인
            본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항
            전달, 회원탈퇴 의사의 확인 등<br />
            (2) 신규 서비스 개발 및 마케팅·광고에의 활용
            <br />
            신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스
            제공 및 광고 게재, 서비스의 유효성 확인, 자사 및 제휴 이벤트 정보 및
            참여기회 제공, 광고성 정보 제공, 접속빈도 파악, 회원의 서비스이용에
            대한 통계분석 등<br />
            (3) 서비스 제공에 관한 계약 이행 및 유료서비스 제공에 따른 요금정산
            전자서명 서비스 제공, 콘텐츠 제공, 특정 맞춤 서비스 제공, 유료서비스
            이용에 대한 과금, 구매 및 요금 결제, 본인인증, 물품배송 또는 청구서
            등 발송, 요금 추심 등<br />
            (4) 법적 증거로 활용
            <br />
            법적 분쟁시 증거자료 제출
            <br />
            <br />
            3. 개인정보의 보유 및 이용기간
            <br />
            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이
            달성되면 지체 없이 파기합니다. 단, 상법, 전자상거래 등에서의
            소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가
            있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원 정보를
            보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만
            이용하며 보존기간은 아래와 같습니다.
            <br />
            (1) 계약 또는 청약철회 등에 관한 기록
            <br />
            보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
            <br />
            보존 기간 : 5년
            <br />
            (2) 대금결제 및 재화 등의 공급에 관한 기록
            <br />
            보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
            <br />
            보존 기간 : 5년
            <br />
            (3) 소비자의 불만 또는 분쟁처리에 관한 기록
            <br />
            보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
            <br />
            보존 기간 : 3년
            <br />
            (4) 웹사이트 방문기록
            <br />
            보존 이유 : 통신비밀보호법
            <br />
            보존 기간 : 3개월
            <br />
          </p>
        </div>
        <div className={joinSt.agree}>
          <p className={joinSt.txt}>동의여부</p>
          <input type="checkbox" name="privacy" />
        </div>
        <button className={joinSt.f_join} type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Join;