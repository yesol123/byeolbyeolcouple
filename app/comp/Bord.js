"use client";

import { useEffect, useState } from "react";
import bord from "../pages/bord/bord.module.scss";
import axios from "axios";

function Bord() {
  const [data, setData] = useState([]);
  const getData = () => {
    axios.get("/api/notice").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className={bord.board}>
        <ul className={bord.ul1}>
          {data.map((obj) => (
            <li key={obj.num} className={bord.board_li}>
              <p className={bord.title}>
                <span>{obj.type}</span> {obj.title}
              </p>
              <div className={bord.board_li_div}>
                <p>{obj.text}</p>
                <p>{obj.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Bord;
