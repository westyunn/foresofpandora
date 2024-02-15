import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import style from "./BoardCreate.module.css";

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

  const imgUrls = state.item.imageList;
  const id = state.item.id;

  //임시저장 수정(임시저장에서 글 가져와서 다시 임시저장 하기)
  const updateTemp = async (id) => {
    try {
      if (board.length < 1) {
        alert("내용을 입력해주세요.");
        return;
      }

      if (board.length > 500) {
        alert("글자수 제한을 초과했습니다.");
        return;
      }
      const data = await updateMyTemp(id, board);
      console.log("임시저장 완료", data);
      alert("임시 저장이 완료되었습니다!");
      navigator("/boardtemp");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };

  //게시글 수정
  const putArticle = async (id) => {
    try {
      if (board.length < 1) {
        alert("내용을 입력해주세요.");
        return;
      }

      if (board.length > 500) {
        alert("글자수 제한을 초과했습니다.");
        return;
      }
      const data = await putMyArticle(id, board);
      console.log("게시글 수정 완료", data);
      alert("게시글 수정이 완료되었습니다!");
      navigator("/");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };
  //임시저장 글 게시글로 등록
  const postTempToArticle = async (id) => {
    try {
      if (board.length < 1) {
        alert("내용을 입력해주세요.");
        return;
      }

      if (board.length > 500) {
        alert("글자수 제한을 초과했습니다.");
        return;
      }
      const data = await postTempToMyArticle(id, board);
      console.log("임시저장글 업로드 완료", data);
      alert("업로드가 완료되었습니다!");
      navigator("/");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };

  const handleTextareaChange = (event) => {
    setBoard(event.target.value);
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
            <div>
              <button
                className={`${style.bt_save}`}
                onClick={() => {
                  updateTemp(id);
                }}
              >
                저장
              </button>
              |
              <button className={`${style.bt_temp}`}>
                <Link to="/boardtemp">보관함</Link>
              </button>
              <button
                className={`${style.bt_upload}`}
                onClick={() => {
                  postTempToArticle(id);
                }}
              >
                업로드
              </button>
            </div>
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
              maxLength="500"
            ></textarea>
          </div>
          <div className={`${style.content_count}`}>{board.length} / 500</div>
        </div>
        {imgUrls.length > 1 && (
          <div className={`${style.fileUpload}`}>
            <div className={`${style.image_list}`}>
              {imgUrls.map((img, index) => (
                <div key={index} className={`${style.image_container}`}>
                  <span />

                  <img src={img} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardCreate;
