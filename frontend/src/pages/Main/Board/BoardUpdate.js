// import { useRef, useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import imageCompression from "browser-image-compression";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// import style from "./BoardCreate.module.css";
// import ImageButton from "../../../assets/BoardCreateImage.png";

// const BoardCreate = (item) => {
//   const navigator = useNavigate();
//   const dispatch = useDispatch();

//   const contentInput = useRef();
//   const fileInput = useRef();

//   // 글
//   const [board, setBoard] = useState({
//     content: item.content,
//   });
//   const repImg = item.imgUrls[0];

//   // 글 생성 요청
//   const submit_handler = () => {
//     // POST 요청
//     // then
//     alert("업로드가 완료되었습니다!");
//   };

//   // 글 임시저장 요청
//   const save_handler = () => {
//     alert("임시 저장이 완료되었습니다!");
//   };

//   // 글 내용
//   const change_content_handler = (e) => {
//     setBoard({
//       ...board,
//       content: e.target.value,
//     });
//   };

//   // -----------
//   return (
//     <div className={`${style.BoardCreate}`}>
//       {/*-상단 버튼 */}
//       <div className={`${style.header}`}>
//         <button
//           className={`${style.bt_back}`}
//           onClick={() => {
//             if (window.confirm("글 작성을 취소하시겠습니까?")) {
//               navigator(-1);
//             }
//           }}
//         >
//           취소
//         </button>
//         <div className={`${style.header_right}`}>
//           <button className={`${style.bt_save}`} onClick={save_handler}>
//             임시저장
//           </button>
//           |
//           <Link to="/boardtemp">
//             <div>임시보관함</div>
//           </Link>
//           <button className={`${style.bt_upload}`} onClick={submit_handler}>
//             업로드
//           </button>
//         </div>
//       </div>
//       {/*-배경 적용 부분 */}
//       <div
//         className={`${style.background_area}`}
//         style={
//           repImg && {
//             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
//     url(${repImg})`,
//           }
//         }
//       >
//         {/*--글 입력창 */}
//         <div>
//           <div className={`${style.textarea_container}`}>
//             <textarea
//               ref={contentInput}
//               name="content"
//               onChange={change_content_handler}
//               // placeholder="내용을 입력하세요"
//               style={repImg && { color: "white" }}
//               spellCheck="false"
//               rows="1"
//             >
//               hi
//             </textarea>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardCreate;
