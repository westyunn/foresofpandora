import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";

import "./BoardCreate.css";

const BoardCreate = () => {
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

  // 글 작성 요청
  const submit_handler = () => {
    // POST 요청
    // then
    alert("업로드가 완료되었습니다!");
  };

  // 글 내용
  const change_content_handler = (e) => {
    setBoard({
      ...board,
      content: e.target.value,
    });
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
    console.log(index);
    const removeList = [...file];
    removeList.splice(index, 1);
    setFile(removeList);
  };

  // 대표 이미지 선택
  const select_repImg_handler = (index) => {
    setRepImg(file[index]);
  };

  // -----------
  return (
    <div className="BoardCreate">
      {/* 상단 버튼 */}
      <div className="header">
        <div>취소</div>
        <div className="header-right">
          <button className="bt-save">임시저장</button>|<div>3</div>
          <button className="bt-upload" onClick={submit_handler}>
            업로드
          </button>
        </div>
      </div>
      {/* 배경 적용 부분 */}
      <div style={{ backgroundImage: `url(${repImg})` }}>
        {/* 글 입력창 */}
        <div>
          <textarea
            ref={contentInput}
            name="content"
            value={board.content}
            onChange={change_content_handler}
          />
        </div>
        {/* 파일 업로드 */}
        <div className="fileUpload">
          <div className="image-list">
            {file.map((img, id) => (
              <div
                className="image-container"
                key={id}
                onClick={() => select_repImg_handler(id)}
              >
                <button onClick={() => delete_file_handler(id)}>X</button>
                <img src={img} />
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple="multiple"
            onChange={change_file_handler}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
