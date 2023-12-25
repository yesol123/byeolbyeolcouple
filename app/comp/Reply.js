"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import community from "../pages/community/community.module.scss";

function Reply({ commentNum, selectedNum }) {
  const [reList, setReList] = useState([]);
  const [data, setData] = useState([]);
  const storedId = sessionStorage.getItem("id");

  const insertcontens = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const contents = formData.get("contents");
    axios
      .post("/api/reply", {
        community_num: commentNum,
        user_id: storedId,
        contents,
      })
      .then((res) => {
        // setReList(res.data); // 이 부분을 제거하고,
        // 새로 추가된 댓글을 기존 리스트에 추가
        setData((prevData) => [
          ...prevData,
          {
            community_num: commentNum,
            user_id: storedId,
            contents,
          },
        ]);
      });
  };

  const getData = () => {
    axios.get("/api/reply").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ul>
        {data
          .filter((comment) => comment.community_num == selectedNum)
          .map(
            (
              comment,
              index // index를 두 번째 인자로 받아야 합니다.
            ) => (
              <li key={index}>
                <p><span className={community.reply_user_id} >{comment.user_id}</span></p>
                <p className={community.reply_contents} >{comment.contents}</p>
              </li>
            )
          )}
      </ul>
      <form
        onSubmit={(e) => {
          insertcontens(e);
        }}
      >
        <p>
          <textarea placeholder="댓글을 적어주세요" name="contents"></textarea>
        </p>
        <button className={community.contents_button} type="onSubmit">
          완료
        </button>
      </form>
    </>
  );
}

export default Reply;
