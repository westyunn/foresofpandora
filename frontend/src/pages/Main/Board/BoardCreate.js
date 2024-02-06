import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

import style from "./BoardCreate.module.css";
import ImageButton from "../../../assets/BoardCreateImage.png";

const BoardCreate = () => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const contentInput = useRef();
  const imgInput = useRef();

  // 글
  const [board, setBoard] = useState({
    content: "",
  });

  const [img, setImg] = useState([]);
  const [preview, setPreview] = useState([]); // 이미지 리스트
  const [repImg, setRepImg] = useState(null); // 대표 이미지

  // POST : 게시글 등록
  const submit_handler = () => {
    const formData = new FormData();

    formData.append(
      "data",
      new Blob([JSON.stringify({ content: board.content })], {
        type: "application/json",
      })
    );

    img.forEach((img) => formData.append("images", img));

    for (let value of formData.values()) {
      console.log("value : ", value);
    }

    axios
      .post(`/api/articles`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("글 생성 성공 : ", res);
        alert("업로드가 완료되었습니다!");
      })
      .catch((err) => {
        console.log("글 생성 실패 : ", err);
        alert("업로드 실패");
      });
  };

  // POST : 게시글 임시 저장
  const save_handler = () => {
    const formData = new FormData();

    formData.append(
      "data",
      new Blob([JSON.stringify({ content: board.content })], {
        type: "application/json",
      })
    );

    img.forEach((img) => formData.append("images", img));

    for (let value of formData.values()) {
      console.log("value : ", value);
    }

    axios
      .post(`/api/articles/temp`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("create board : ", res.data);
        alert("임시 저장이 완료되었습니다!");
      })
      .catch((err) => {
        console.log("fail to craete board : ", err);
        alert("임시 저장 실패");
      });
  };

  // textarea 업데이트
  const change_content_handler = (e) => {
    setBoard({
      content: e.target.value,
    });
  };

  // 파일 업로드 클릭
  const fileUpload_click_handler = () => {
    imgInput.current.click();
  };

  // 파일 업로드
  const change_img_handler = async (e) => {
    const inputList = e.target.files; // 입력받은 파일

    let imgList = [...img]; // 이미지
    let previewList = [...preview]; // 이미지 프리뷰

    // -이미지 리스트에 넣기
    for (let i = 0; i < inputList.length; i++) {
      // --이미지 리사이징
      try {
        const compressedImage = await imageCompression(inputList[i], {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        });

        // 이미지 추가
        imgList.push(inputList[i]);

        // ---미리보기 url 생성 -> 미리보기 추가
        const curImgUrl = URL.createObjectURL(compressedImage);
        previewList.push(curImgUrl);
      } catch (error) {
        console.error("이미지 리사이징 실패 :", error);
      }
    }

    // -개수 제한
    if (previewList.length > 5 || imgList.length > 5) {
      alert("이미지는 5장까지 첨부 가능합니다.");
      previewList = previewList.slice(0, 5);
      imgList = imgList.slice(0, 5);
    }

    // -파일 state 업데이트
    setImg(imgList);
    setPreview(previewList);
    setRepImg(previewList[0]);
  };

  // 이미지 삭제
  const delete_img_handler = (index) => {
    if (repImg === preview[index]) {
      setRepImg(null);
    }

    // 미리보기 삭제
    const removedPreview = [...preview];
    removedPreview.splice(index, 1);

    // 이미지 삭제
    const removedImg = [...img];
    removedImg.splice(index, 1);

    setPreview(removedPreview);
    setImg(removedImg);
  };

  // 대표 이미지 선택
  // const select_repImg_handler = (index) => {
  //   setRepImg(img[index]);
  // };

  // 이미지 순서 변경
  const onDragEnd = (res) => {
    if (!res.destination) {
      return;
    }

    const { source, destination } = res;

    if (source.index !== destination.index) {
      // 프리뷰 이동
      const movedPreview = [...preview];
      const [removedPreview] = movedPreview.splice(source.index, 1);
      movedPreview.splice(destination.index, 0, removedPreview);

      // 이미지 이동
      const movedImg = [...img];
      const [removedImg] = movedImg.splice(source.index, 1);
      movedImg.splice(destination.index, 0, removedImg);

      setPreview(movedPreview);
      setImg(movedImg);
      setRepImg(movedPreview[0]);
      // MultipartFile 사용시 로직 추가 필요
    }
  };

  // ----------- 화면 -----------
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <button className={`${style.bt_save}`} onClick={save_handler}>
              임시보관
            </button>
            |
            <div>
              <Link to="/boardtemp">임시보관함</Link>
            </div>
            <button className={`${style.bt_upload}`} onClick={submit_handler}>
              업로드
            </button>
          </div>
        </div>
        {/*-배경 적용 부분 */}
        <div
          className={`${style.background_area}`}
          style={
            repImg && {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${repImg})`,
            }
          }
        >
          {/*--글 입력창 */}
          <div>
            <div className={`${style.textarea_container}`}>
              <textarea
                ref={contentInput}
                name="content"
                value={board.content}
                onChange={change_content_handler}
                placeholder="내용을 입력하세요"
                style={repImg && { color: "white" }}
                spellCheck="false"
                rows="1"
              />
            </div>
          </div>
          {/*--이미지 업로드 */}
          <div className={`${style.fileUpload}`}>
            {/*---이미지 리스트 */}
            <Droppable droppableId="imageList" direction="horizontal">
              {(provided) => (
                <div
                  className={`${style.image_list}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {preview.map((img, id) => (
                    <Draggable
                      key={id.toString()}
                      draggableId={id.toString()}
                      index={id}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`${style.image_container}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* <span onClick={() => select_repImg_handler(id)} /> */}
                          <span />
                          <button onClick={() => delete_img_handler(id)}>
                            X
                          </button>
                          <img src={img} />
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/*---업로드 버튼 */}
            <input
              type="file"
              accept="image/*"
              multiple="multiple"
              onChange={change_img_handler}
              ref={imgInput}
              style={{ display: "none" }}
            />
            <label
              className={`${style.file_upload_label}`}
              onClick={fileUpload_click_handler}
            >
              <img src={ImageButton} />
            </label>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardCreate;
