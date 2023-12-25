"use client";
import React, { useEffect, useState } from "react";
import community from "../pages/community/community.module.scss";
import axios from "axios";
import Reply from "./Reply";

function Community() {
  const [likeData, setLikeData] = useState([]);
  const [data, setData] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]); // 여러 카테고리를 저장하는 배열
  const [pageSize, setPageSize] = useState(5); // 페이지당 표시할 게시물 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [isLiked, setIsLiked] = useState(false); // 이미지가 좋아요 상태인지 여부를 나타내는 상태
  const [openreply, setOpenreply] = useState(false);
  const [boardNum, setBoardNum] = useState();
  const [openReplies, setOpenReplies] = useState([]);

  // 초기 상태로 모든 댓글 표시를 닫음
  const initialReplyState = Array(data.length).fill(false);

  const checkNum = (num) => {
    setBoardNum(num);
    return num;
  };

  useEffect(() => {
    setOpenReplies(initialReplyState);
  }, [data, currentPage]);
  const toggleReply = (num) => {
    // 특정 num의 댓글 상태를 토글
    const postIndex = data.findIndex((post) => post.num === num);
    if (postIndex !== -1) {
      const pageOffset = (currentPage - 1) * pageSize;
      const updatedReplies = [...openReplies];
      const adjustedIndex = postIndex - pageOffset;
      updatedReplies[adjustedIndex] =
        !updatedReplies[adjustedIndex]; /* 댓글 이슈 해결  */
      setOpenReplies(updatedReplies);
    }
  };

  const getData = () => {
    axios.get("/api/community").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = (category) => {
    const isCategoryActive = activeCategories.includes(category);
    if (isCategoryActive) {
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
    setCurrentPage(1); // 카테고리가 변경될 때 페이지를 1로 재설정
  };

  const filteredData = data.filter((obj) => {
    return (
      activeCategories.length === 0 || activeCategories.includes(obj.category)
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const toggleLike = (num) => {
    const post = data.find((p) => p.num === num);
    if (post) {
      const isLiked = !post.isLiked;
      const updatedPost = {
        ...post,
        isLiked,
        peoplelike: isLiked ? post.peoplelike + 1 : post.peoplelike - 1,
      };
      setData((prevData) =>
        prevData.map((p) => (p.num === num ? updatedPost : p))
      );
      axios.put(`/api/community?num=${num}&type=likeCheck`, {
        num,
        peoplelike: updatedPost.peoplelike,
      });
    }
  };
  return (
    <>
      <section className={community.community}>
        <section className={community.select}>
          <ul>
            {["#화", "#수", "#목", "#금", "#토", "#자유"].map((item) => (
              <li key={item}>
                <button
                  className={`${community.select_item} ${
                    activeCategories.includes(item) ? community.active : ""
                  }`}
                  onClick={() => handleButtonClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <ul className={community.ul2}>
          {currentData.map((obj, index) => {
            // 만약 선택한 카테고리가 없거나, 현재 아이템의 카테고리가 선택한 카테고리 중 하나와 일치하면 렌더링
            if (
              !activeCategories.length ||
              activeCategories.includes(obj.category)
            ) {
              return (
                <li key={obj.num}>
                  <div className={community.p_flex}>
                    <span>
                      <b>{obj.category}</b>
                    </span>
                    <p>{obj.title}</p>
                  </div>
                  <p>{obj.contents}</p>
                  <img src={obj.img} className={community.boardImg} />
                  <div className={community.div_flex}>
                    <p>{obj.date}</p>
                    <button
                      onClick={() => {
                        toggleReply(obj.num);
                        checkNum(obj.num);
                      }}
                    >
                      {openReplies[index] ? (
                        <img src="../../../imges/x.png" />
                      ) : (
                        <img src="../../../imges/reply.png" />
                      )}
                    </button>
                    <span>
                      <button
                        onClick={() => toggleLike(obj.num)}
                        className={obj.isLiked ? community.active : ""}
                      >
                        <img
                          className={community.displayyes}
                          src="../../../imges/icon_heart_black.png "
                        />
                        <img
                          className={community.displaynone}
                          src="../../../imges/icon_heart.png "
                        />
                      </button>
                      {obj.peoplelike}
                    </span>
                  </div>
                  <div
                    className={`${community.reply_div} ${
                      openReplies[index] ? community.active : ""
                    }`}
                  >
                    <Reply commentNum={obj.num} selectedNum={boardNum} />
                  </div>
                </li>
              );
            }
            return null; // 일치하지 않으면 아이템을 숨김
          })}
        </ul>

        {filteredData.length > pageSize && ( // 게시물 수가 한 페이지 크기보다 클 때만 페이지네이션 표시
          <div className={community.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <img src="../../../imges/icon_arrow_back.png" alt="이전 페이지" />
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? community.active : ""}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * pageSize >= filteredData.length}
            >
              <img
                src="../../../imges/icon_arrow_forward.png"
                alt="다음 페이지"
              />
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Community;
