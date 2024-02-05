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

  const [img, setImg] = useState([]); // 이미지 리스트
  const [repImg, setRepImg] = useState(null); // 대표 이미지

  // 글 생성 요청
  const submit_handler = () => {
    // POST : 게시글 등록

    // 전달할 파일 확인
    console.log(board.content);
    console.log(repImg);
    console.log(img);

    // axios
    //   .post(
    //     `api/articles`,
    //     {
    //       content: board.content,
    //     },
    //     {
    //       headers: {
    //         authorization: `Bearer ${token}`,
    //         refreshtoken: refreshToken,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("create board : ", res.data);
    //     alert("업로드가 완료되었습니다!");
    //   })
    //   .catch((err) => {
    //     console.log("fail to craete board : ", err);
    //     alert("업로드 실패");
    //   });
  };

  // 글 임시저장 요청
  const save_handler = () => {
    // POST : 게시글 임시 저장
    console.log(board.content);
    axios
      .post(
        `api/articles/temp`,
        {
          content: board.content,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            refreshtoken: refreshToken,
          },
        }
      )
      .then((res) => {
        console.log("create board : ", res.data);
        alert("임시 저장이 완료되었습니다!");
      })
      .catch((err) => {
        console.log("fail to craete board : ", err);
        alert("임시 저장 실패");
      });
  };

  // 글 내용
  const change_content_handler = (e) => {
    setBoard({
      content: e.target.value,
    });
  };

  // 파일 업로드 클릭
  const fileUpload_click_handler = () => {
    console.log("fileUpload_click_handler");
    imgInput.current.click();
  };

  // 파일 업로드
  const change_img_handler = async (e) => {
    console.log("업로드 될 파일 : ", e.target.files);

    const imageLists = e.target.files;
    let imageUrlList = [...img];

    // 이미지 리사이징
    for (let i = 0; i < imageLists.length; i++) {
      try {
        const compressedImage = await imageCompression(imageLists[i], {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
        });

        // 미리보기 url 생성
        const curImgUrl = URL.createObjectURL(compressedImage);
        imageUrlList.push(curImgUrl);
      } catch (error) {
        console.error("이미지 리사이징 실패 :", error);
      }
    }

    // 개수 제한
    if (imageLists.length > 5) {
      alert("이미지는 5장까지 첨부 가능합니다.");
      imageUrlList = imageUrlList.slice(0, 5);
    }

    // 파일 state 업데이트
    setImg(imageUrlList);
    console.log("리사이징된 이미지 리스트 : ", imageUrlList);
    console.log("현재 img 상태 : ", img);
  };

  // 파일 삭제
  const delete_img_handler = (index) => {
    console.log("삭제할 대표 이미지 : ", img[index]); // test

    // 대표 이미지라면 삭제
    if (repImg === img[index]) {
      setRepImg(null);
    }
    // 미리보기에서 삭제
    const removeList = [...img];
    removeList.splice(index, 1);

    setImg(removeList);
  };

  useEffect(() => {
    console.log("현재 대표 이미지 : ", repImg);
  }, [repImg]);

  // 대표 이미지 선택
  const select_repImg_handler = (index) => {
    setRepImg(img[index]);
  };

  // 이미지 드래그 앤 드랍
  const onDragEnd = (res) => {
    console.log("onDragEnd");
    if (!res.destination) {
      return;
    }

    console.log("destination : ", res.destination);

    const movedImg = Array.from(img);
    const [removed] = movedImg.splice(res.source.index, 1);
    movedImg.splice(res.destination.index, 0, removed);

    setImg(movedImg);
    setRepImg(movedImg[0]);
  };

  // -----------
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
            <Droppable droppableId="imageList">
              {(provided) => (
                <div
                  className={`${style.image_list}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {img.map((img, id) => (
                    // <Droppable key={id} droppableId={id.toString()} index={id}>
                    <Draggable key={id} draggableId={id.toString()} index={id}>
                      {(provided) => (
                        <div
                          className={`${style.image_container}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span onClick={() => select_repImg_handler(id)} />
                          <button onClick={() => delete_img_handler(id)}>
                            X
                          </button>
                          <img src={img} />
                        </div>
                      )}
                    </Draggable>
                    // </Droppable>
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
