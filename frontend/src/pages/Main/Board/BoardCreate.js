import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import style from "./BoardCreate.module.css";
import ImageButton from "../../../assets/BoardCreateImage.png";

const BoardCreate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const contentInput = useRef();
  const fileInput = useRef();

  // 글
  const [board, setBoard] = useState({
    writer: "",
    content: "",
  });

  const [file, setFile] = useState([]); // 이미지 리스트
  const [repImg, setRepImg] = useState(null); // 대표 이미지

  // 글 생성 요청
  const submit_handler = () => {
    // POST 요청
    // then
    alert("업로드가 완료되었습니다!");
  };

  // 글 임시저장 요청
  const save_handler = () => {
    alert("임시 저장이 완료되었습니다!");
  };

  // 글 내용
  const change_content_handler = (e) => {
    setBoard({
      ...board,
      content: e.target.value,
    });
  };

  // 파일 업로드 클릭
  const handleFileLabelClick = () => {
    fileInput.current.click();
  };

  // 파일 업로드
  const change_file_handler = async (e) => {
    console.log(e.target.files);

    const imageLists = e.target.files;
    let imageUrlList = [...file];

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
        console.error("Error compressing image:", error);
      }
    }

    // 개수 제한
    if (imageLists.length > 5) {
      alert("이미지는 5장까지 첨부 가능합니다.");
      imageUrlList = imageUrlList.slice(0, 5);
    }

    // 파일 state 업데이트
    setFile(imageUrlList);
    console.log(imageUrlList);
    console.log(file);
  };

  // 파일 삭제
  const delete_file_handler = (index) => {
    console.log(repImg); // test
    console.log(file[index]); // test

    // 대표 이미지라면 삭제
    if (repImg === file[index]) {
      console.log("DeleteRepImg"); // test
      setRepImg(null);
      console.log(repImg); // 여기서도 null이 안 뜨고
    }
    // 미리보기에서 삭제
    const removeList = [...file];
    removeList.splice(index, 1);

    setFile(removeList);

    console.log(repImg); // 여기서도 null이 안 뜬다
  };

  useEffect(() => {
    console.log(repImg);
  }, [repImg]);

  // 대표 이미지 선택
  const select_repImg_handler = (index) => {
    setRepImg(file[index]);
  };

  // -----------
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
          <button className={`${style.bt_save}`} onClick={save_handler}>
            임시저장
          </button>
          |
          <Link to="/boardtemp">
            <div>임시보관함</div>
          </Link>
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
        {/*--파일 업로드 */}
        <div className={`${style.fileUpload}`}>
          <div className={`${style.image_list}`}>
            {file.map((img, id) => (
              <div
                className={`${style.image_container}`}
                key={id}
                onClick={() => select_repImg_handler(id)}
              >
                <button onClick={() => delete_file_handler(id)}>X</button>
                <img src={img} />
              </div>
            ))}
          </div>
          {/*---파일 업로드 버튼 */}
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={change_file_handler}
            ref={fileInput}
            style={{ display: "none" }}
          />
          <label
            className={`${style.file_upload_label}`}
            onClick={handleFileLabelClick}
          >
            <img src={ImageButton} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
