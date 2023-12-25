"use client";
import React, { useContext } from "react";
import fixSt from "../page.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { MyContext } from "../Context";

function Footer() {
  const pathname = usePathname();
  const { sessionId, setSessionId } = useContext(MyContext);

  const pathName = pathname.split("/").pop();
  const fnav = useRouter();
  function classChange(key) {
    let cName;
    switch (key) {
      case "matchlist":
        cName = fixSt.column_matchlist;
        break;
      case "myfortune":
        cName = fixSt.column_myfortune;
        break;
      case "picklist":
        cName = fixSt.column_picklist;
        break;
      case "bord":
        cName = fixSt.column_community;
        break;
    }
    if (pathName === key) {
      return cName;
    }
    return fixSt.column;
  }

  const logout = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("id");
    window.sessionStorage.removeItem("gender");
    const checkId = window.sessionStorage.getItem("id");
    setSessionId(checkId);
    fnav.push("../../pages/login");
  };

  console.log(sessionId);

  return (
    <>
      <footer className={fixSt.foot}>
        {sessionId ? (
          <div>
            <img src="../imges/line.png" className={fixSt.f_line2} />
            <div className={fixSt.f_link}>
              <div
                className={`${classChange("myfortune")}`}
                onClick={() => {
                  fnav.push("/pages/myfortune");
                }}
              >
                {/* <img src="../imges/ball.png"/> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="32"
                  viewBox="0 0 34 32"
                  fill="none"
                  className={fixSt.f_svg1}
                >
                  <path
                    d="M9.53413 22.6851C7.79956 21.2561 6.56943 19.3632 6.00791 17.2592C5.44639 15.1552 5.58019 12.94 6.39145 10.9094C7.2027 8.8788 8.65283 7.12929 10.5483 5.89435C12.4438 4.65942 14.6945 3.9978 17 3.9978C19.3055 3.9978 21.5561 4.65942 23.4516 5.89435C25.3471 7.12929 26.7972 8.8788 27.6085 10.9094C28.4197 12.94 28.5535 15.1552 27.992 17.2592C27.4305 19.3632 26.2004 21.2561 24.4658 22.6851"
                    stroke="#656565"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.08337 25.3272C7.08337 26.0342 7.38188 26.7123 7.91324 27.2123C8.44459 27.7123 9.16526 27.9932 9.91671 27.9932H24.0834C24.8348 27.9932 25.5555 27.7123 26.0868 27.2123C26.6182 26.7123 26.9167 26.0342 26.9167 25.3272C26.9167 24.6201 26.6182 23.942 26.0868 23.442C25.5555 22.942 24.8348 22.6611 24.0834 22.6611H9.91671C9.16526 22.6611 8.44459 22.942 7.91324 23.442C7.38188 23.942 7.08337 24.6201 7.08337 25.3272Z"
                    fill="#656565"
                    stroke="#656565"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5834 9.3313C14.4562 9.3313 13.3752 9.75262 12.5782 10.5026C11.7811 11.2526 11.3334 12.2697 11.3334 13.3303"
                    stroke="#656565"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button className={fixSt.f_a}>내 운세</button>
              </div>
              <div
                className={`${classChange("matchlist")}`}
                onClick={() => {
                  fnav.push("/pages/matchlist");
                }}
              >
                {/* <img src="../imges/match.png"className={fixSt.img}/> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="28"
                  viewBox="0 0 33 28"
                  fill="none"
                  className={fixSt.f_svg2}
                >
                  <path
                    d="M2.67568 9.65519C2.67568 4.64546 6.0753 0 10.7305 0C13.9611 0 16.3582 2.08425 17.8378 5.04096C19.3174 2.08442 21.7145 0 24.9451 0C29.6009 0 33 4.64625 33 9.65519C33 20.3777 17.8378 28 17.8378 28C17.8378 28 7.62452 23.1763 3.96276 15.2639H13.0081L14.4458 12.7565L16.1251 18.5231L20.0578 13.5625H24.973V11.8125H19.1854L16.8749 14.7269L14.9866 8.24355L11.9649 13.5139H3.28202C3.47108 14.1127 3.7001 14.6962 3.96276 15.2639L0 15.2638V13.5138L3.28202 13.5139C2.89546 12.2896 2.67568 11.0015 2.67568 9.65519Z"
                    fill="#656565"
                  />
                </svg>
                <button className={fixSt.f_a}>내 운명</button>
              </div>
              <div
                className={`${classChange("picklist")} `}
                onClick={() => {
                  fnav.push("/pages/picklist");
                }}
              >
                {/* <img src="../imges/pick.png"/> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="28"
                  viewBox="0 0 40 28"
                  fill="none"
                  className={fixSt.f_svg2}
                >
                  <path
                    d="M6 11.9261C8.20625 11.9261 10 10.1434 10 7.95072C10 5.75806 8.20625 3.97536 6 3.97536C3.79375 3.97536 2 5.75806 2 7.95072C2 10.1434 3.79375 11.9261 6 11.9261ZM34 11.9261C36.2062 11.9261 38 10.1434 38 7.95072C38 5.75806 36.2062 3.97536 34 3.97536C31.7938 3.97536 30 5.75806 30 7.95072C30 10.1434 31.7938 11.9261 34 11.9261ZM36 13.9138H32C30.9 13.9138 29.9062 14.3548 29.1812 15.0691C31.7 16.4418 33.4875 18.9202 33.875 21.8645H38C39.1063 21.8645 40 20.9762 40 19.8768V17.8891C40 15.6965 38.2062 13.9138 36 13.9138ZM20 13.9138C23.8687 13.9138 27 10.8018 27 6.95688C27 3.11196 23.8687 0 20 0C16.1313 0 13 3.11196 13 6.95688C13 10.8018 16.1313 13.9138 20 13.9138ZM24.8 15.9014H24.2812C22.9813 16.5226 21.5375 16.8953 20 16.8953C18.4625 16.8953 17.025 16.5226 15.7188 15.9014H15.2C11.225 15.9014 8 19.1066 8 23.0571V24.846C8 26.492 9.34375 27.8275 11 27.8275H29C30.6562 27.8275 32 26.492 32 24.846V23.0571C32 19.1066 28.775 15.9014 24.8 15.9014ZM10.8188 15.0691C10.0938 14.3548 9.1 13.9138 8 13.9138H4C1.79375 13.9138 0 15.6965 0 17.8891V19.8768C0 20.9762 0.89375 21.8645 2 21.8645H6.11875C6.5125 18.9202 8.3 16.4418 10.8188 15.0691Z"
                    fill="#656565"
                  />
                </svg>
                <button className={fixSt.f_a}>찜 목록</button>
              </div>
              <div
                className={`${classChange("bord")}`}
                onClick={() => {
                  fnav.push("/pages/bord");
                }}
              >
                {/* <img src="../imges/community.png"/> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  className={fixSt.f_svg1}
                >
                  <path
                    className={fixSt.path}
                    d="M21.9348 15.1374L18.6396 3.32664C18.2813 2.04251 16.6412 1.56942 15.6055 2.45145L13.5286 4.22016C11.2174 6.1884 8.46077 7.61284 5.47704 8.38065C2.97948 9.02336 1.4993 11.496 2.16852 13.8946C2.83774 16.2932 5.40691 17.7238 7.90448 17.0811C10.8882 16.3132 14.0171 16.2231 17.0434 16.8179L19.7629 17.3523C21.119 17.6189 22.2931 16.4215 21.9348 15.1374Z"
                    stroke="#656565"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className={fixSt.path}
                    d="M7.72302 7.771L13.9476 26.0465"
                    stroke="#656565"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button className={fixSt.f_a}>게시판</button>
              </div>
              <div className={fixSt.column} onClick={logout}>
                {/* <img src="../imges/logout.png"/> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="27"
                  viewBox="0 0 29 27"
                  fill="none"
                  className={fixSt.f_svg2}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.984619 2.93552C0.984619 1.34663 2.35055 0.0466309 4.02001 0.0466309H16.1616V2.93552H4.02001V23.1577H16.1616V26.0466C8.06721 26.0466 4.02001 26.0466 4.02001 26.0466C2.35055 26.0466 0.984619 24.7466 0.984619 23.1577C0.984619 9.61407 0.984619 2.93552 0.984619 2.93552ZM22.4992 11.6022L18.651 7.93975L20.7973 5.897L28.3096 13.0466L20.7973 20.1963L18.651 18.1535L22.4992 14.4911H12.5039V11.6022H22.4992Z"
                    fill="#656565"
                  />
                </svg>
                <button className={fixSt.out}>로그아웃</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src="../imges/line.png" className={fixSt.f_line} />
          </div>
        )}
      </footer>
    </>
  );
}

export default Footer;
