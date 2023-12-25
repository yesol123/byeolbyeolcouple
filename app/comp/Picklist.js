"use client";
import React, { useEffect, useState } from "react";
import PicklistStyle from "../pages/picklist/picklist.module.scss";
import Link from "next/link";
import axios from "axios";

function Picklist() {
  const [pickList, setPickList] = useState([]);
  const [pickMsg, setPickMsg] = useState([]);
  const id =
    typeof window !== "undefined" ? window.sessionStorage.getItem("id") : null;

  useEffect(() => {
    // myPick이 true : 내가 찜한 애
    // myPick이 false : 나를 찜한 애
    axios.get(`/api/matchlist?myPick=false&id=${id}`).then((res) => {
      setPickList(res.data);
    });
    axios.get(`/api/member?id=${id}`).then((res) => {
      setPickMsg(res.data);
    });
  }, []);
  const pickId = pickMsg.filter((member) => member.id === id);

  let nameFromPickId = ""; // 초기화

  if (pickId.length > 0) {
    nameFromPickId = pickId[0].name;
  }

  return (
    <>
      <div className={PicklistStyle.home}>
        <div className={PicklistStyle.cardtitle}>
          {nameFromPickId}님을 기다리는 사람들입니다.{" "}
        </div>
        <div className={PicklistStyle.cardalign}>
          {pickList.map((pick, idx) => (
            <Link
              href={`/pages/picklist/${pick.id}`}
              className={PicklistStyle.card}
            >
              <img src="../imges/main.png" />
              <div>{pick.id}</div>
              <div>{pick.job}</div>
            </Link>
          ))}
        </div>
        <div className={PicklistStyle.loading}>
          <img src="../imges/loading.gif" />
        </div>
      </div>
    </>
  );
}

export default Picklist;
