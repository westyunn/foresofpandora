import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import style from "./BoardCreate.module.css";
import ImageButton from "../../../assets/BoardCreateImage.png";
import {
  updateMyTemp,
  postMyTemp,
  postTempToMyArticle,
} from "../BoardTemp/api";
import { putMyArticle } from "./api";

const BoardCreate = () => {
  const navigator = useNavigate();
  const { state } = useLocation();

  const contentInput = useRef();

  // 글
  const [board, setBoard] = useState(state.item.content);
  const imgUrls = [
    "https://images.unsplash.com/photo-1592769606534-fe78d27bf450?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  // const imgUrls = state.item.imageList;
  const id = state.item.id;
  console.log(state.item.id);

  //임시저장 수정(임시저장에서 글 가져와서 다시 임시저장 하기)
  const updateTemp = async (id) => {
    try {
      const data = await updateMyTemp(id, board);
      // console.log(item);
      console.log("click", data);
      alert("임시 저장이 완료되었습니다!");
      navigator("/boardtemp");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };
  //임시저장 등록(수정글 가져와서 임시저장글로 등록)
  const postTemp = async (board) => {
    try {
      const data = await postMyTemp(board);
      // console.log(item);
      console.log("click", data);
      alert("임시저장이 완료되었습니다!");
      navigator("/boardtemp");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };
  //게시글 수정
  const putArticle = async (id) => {
    try {
      console.log(board);
      const data = await putMyArticle(id, board);
      // console.log(item);
      console.log("click", data);
      alert("게시글 수정이 완료되었습니다!");
      navigator("/");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };
  //임시저장 글 게시글로 등록
  const postTempToArticle = async (id) => {
    try {
      const data = await postTempToMyArticle(id, board);
      // console.log(item);
      console.log("click", data);
      alert("업로드가 완료되었습니다!");
      navigator("/");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };

  const handleTextareaChange = (event) => {
    setBoard(event.target.value);
    // console.log(board);
  };

  return (
    <div className={`${style.BoardCreate}`}>
      {/*-상단 버튼 */}
      <div className={`${style.header}`}>
        <button
          className={`${style.bt_back}`}
          onClick={() => {
            if (window.confirm("글 작성을 취소하시겠습니까?")) {
              navigator(-1);
            }
          }}
        >
          취소
        </button>
        <div className={`${style.header_right}`}>
          {state.temp && (
            <button
              className={`${style.bt_save}`}
              onClick={() => {
                updateTemp(id);
              }}
            >
              임시저장 |
            </button>
          )}

          {state.temp && (
            <Link to="/boardtemp">
              <div>임시보관함</div>
            </Link>
          )}
          {state.temp && (
            <button
              className={`${style.bt_upload}`}
              onClick={() => {
                postTempToArticle(id);
              }}
            >
              업로드
            </button>
          )}
          {!state.temp && (
            <button
              className={`${style.bt_upload}`}
              onClick={() => {
                putArticle(id);
              }}
            >
              수정
            </button>
          )}
        </div>
      </div>
      {/*-배경 적용 부분 */}
      <div
        className={`${style.background_area}`}
        style={
          imgUrls && {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${imgUrls[0]})`,
          }
        }
      >
        {/*--글 입력창 */}
        <div>
          <div className={`${style.textarea_container}`}>
            <textarea
              ref={contentInput}
              name="content"
              value={board}
              onChange={handleTextareaChange}
              // placeholder="내용을 입력하세요"
              style={imgUrls && { color: "white" }}
              spellCheck="false"
              rows="1"
            ></textarea>
          </div>
        </div>
        <div className={`${style.image_list}`}>
          {imgUrls.map((img) => (
            <div className={`${style.image_container}`}>
              <span />

              <img src={img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
