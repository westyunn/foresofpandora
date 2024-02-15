import styles from "./BoardItem.module.css";
import { useEffect, useRef, useState } from "react";
import heart from "../../../assets/heart.png";
import comment from "../../../assets/comments.png";
import saved from "../../../assets/saved.png";
import CommentModal from "../Comment/CommentModal";
import fullSave from "../../../assets/isSaved.png";
import fullHeart from "../../../assets/fullHeart.png";
import ZoomIn from "../../../assets/ZoomIn.png";
import etc from "../../../assets/dots.png";

// 프로필 이미지 리스트
import { profileImg } from "../../../components/profileImg";

import {
  postSaved,
  getIsSaved,
  postReaction,
  getMyReaction,
  getReactionCount,
  getArticle,
} from "./api";
import BoardImage from "./BoardImageModal";
import { useSelector } from "react-redux";
import EtcModal from "./EtcModal";
import ChatModal from "../../Chat/ChatModal";
import { useNavigate } from "react-router-dom";

const BoardItem = ({ item, page, refreshList }) => {
  const navigate = useNavigate();
  const [cModalOpen, setCModalOpen] = useState(false);
  const [etcModalOpen, setEtcModalOpen] = useState(false);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(item.commentCount);
  const modalBackground = useRef();
  const etcModalBg = useRef();
  const [isMyLiked, setIsMyLiked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(item.reactionCount);
  const [isSaved, setIsSaved] = useState(false);
  const [isMySaved, setIsMySaved] = useState(false);

  // 랜덤 인덱스 생성 (프로필 이미지)
  const profileIdx = Math.floor(Math.random() * profileImg.length);

  // 랜덤 인덱스 생성 (프로필 이미지 배경)
  const colorIdx = Math.floor(Math.random() * 2);

  // let hex = "#";
  // for (let c = 0; c < 6; c++) {
  //   hex += Math.round(Math.random() * 0xf).toString(16);
  // }

  // backend에서 갖고온 오리지널 날짜(수정날짜 쓰기로 하였음)
  const originDate = item.modifiedAt;
  // Date 객체 생성
  const date = new Date(originDate);
  const adjustedDate = new Date(date.getTime());
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 오전/오후 표시를 위해 12시간제 사용
  };
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
    adjustedDate
  );
  const id = useSelector((state) => state.user.userId);

  // board_main 너비 가져와서 width에 맞는 모달 띄우기
  const boardMainRef = useRef(null);
  const [boardMainWidth, setBoardMainWidth] = useState(0);
  // board_main 높이도 같이 prop으로 전달해야될듯
  const [boardMainHeight, setBoardMainHeight] = useState(0);

  useEffect(() => {
    if (boardMainRef.current) {
      setBoardMainWidth(boardMainRef.current.offsetWidth);
      setBoardMainHeight(boardMainRef.current.offsetHeight);
    }
  }, []);

  // 회원만 좋아요, 보관가능하게 하기 위한 토큰 필요
  const token = localStorage.getItem("access_token");
  const handleSaved = () => {
    if (token) {
      postSaved({ item, setIsSaved })
        .then((isSaved) => {
          // 요청 성공 후에 isMySaved 업데이트 해주기
          setIsMySaved(!isMySaved);
        })
        .catch((err) => {
          console.error("보관 요청 실패:", err);
        });
    } else {
      window.alert("로그인을 해주세요!");
      navigate("/login");
    }
  };
  // prop으로 내려줄 articleId
  const articleId = item.id;
  // 닉네임 최적화
  const formattedName = item.nickname.split("(")[0];

  const handleLiked = async () => {
    if (!token) {
      window.alert("로그인을 해주세요");
      navigate("/login");
      return;
    }

    // 좋아요 상태를 먼저 반전시키고 UI 업데이트
    setIsMyLiked(!isMyLiked);
    setLikeCnt((prev) => (!isMyLiked ? prev + 1 : prev - 1));

    try {
      // 서버에 좋아요 상태 동기화 요청
      await postReaction({ item });
      // 성공적으로 처리되면, getReactionCount 호출로는 필요하지 않을 수 있음
      // getReactionCount({ item, setLikeCnt });
    } catch (err) {
      console.error("좋아요 상태 업데이트 실패", err);
      // 요청 실패 시 상태 롤백
      setIsMyLiked(!isMyLiked);
      setLikeCnt((prev) => (!isMyLiked ? prev - 1 : prev + 1));
    }
  };

  const handleZoomIn = (event) => {
    event.stopPropagation(); // 이벤트 버블링 막기
    setImgModalOpen(true);
  };
  const closeImgModal = () => {
    setImgModalOpen(false); // 모달 닫기
  };

  const handleEtcModal = () => {
    setEtcModalOpen(true);
  };

  const handleCommentOpen = () => {
    // setCoModalOpen(true);
    setCModalOpen(true);
  };

  const handleChatOpen = () => {
    if (id !== item.memberId && formattedName) {
      setChatModalOpen(true);
    }
  };
  // const handleCommentChange = async () => {
  //   try {
  //     getArticle({ setCommentCount });
  //     console.log(commentCount);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (item && item.id) {
      getReactionCount({ item, setLikeCnt });
      getIsSaved({ item, setIsMySaved });
      getMyReaction({ item, setIsMyLiked });
    }
  }, [page, item.id]);

  return (
    <div className={styles.board_container}>
      <div
        ref={boardMainRef}
        className={`${styles.board_main} ${styles.board_imgTrue}`}
        style={{
          /* 이미지에 투명도 적용해서 자체 필터 씌워버리기 */

          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.imageList[0]})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {imgModalOpen ? (
          // 모달이 열려 있으면 모달 컴포넌트만 렌더링
          <BoardImage
            item={item}
            containerWidth={boardMainWidth}
            containerHeight={boardMainHeight}
            setImgModalOpen={setImgModalOpen}
            style={{ width: boardMainWidth, height: boardMainHeight }}
          />
        ) : (
          // 모달이 닫혀 있으면 페이지의 나머지 컨텐츠 렌더링
          <>
            <button onClick={handleZoomIn} className={styles.zoomBtn}>
              <img
                src={ZoomIn}
                alt="이미지 확대"
                style={{ width: "31px" }}
              ></img>
            </button>
            <div className={`${styles.board_content}`}>{item.content}</div>
          </>
        )}
      </div>

      <div className={styles.bottom}>
        <div className={styles.side_container}>
          <div>
            <button
              className={styles.savedBtn}
              onClick={handleSaved}
              style={{ visibility: cModalOpen ? "hidden" : "visible" }}
            >
              {isMySaved ? (
                <img
                  src={fullSave}
                  alt="보관완료"
                  style={{ width: "28px", height: "33px" }}
                ></img>
              ) : (
                <img
                  src={saved}
                  alt="보관함"
                  style={{ width: "28px", height: "33px" }}
                ></img>
              )}
            </button>
          </div>
          <div
            style={{
              marginBottom: "1rem",
              visibility: cModalOpen ? "hidden" : "visible",
            }}
          >
            <button className={styles.likedBtn} onClick={handleLiked}>
              {isMyLiked ? (
                <img
                  src={fullHeart}
                  alt="좋아요 누름"
                  style={{ width: "30px" }}
                />
              ) : (
                <img
                  src={heart}
                  alt="좋아요 안 누름"
                  style={{ width: "30px", height: "25.6px" }}
                ></img>
              )}
            </button>
            <div className={styles.count}>{likeCnt}</div>
          </div>
          <div className={`${styles.cmtModal}`}>
            {cModalOpen ? (
              <CommentModal
                setCModalOpen={setCModalOpen}
                articleId={articleId}
                item={item}
                style={{ width: boardMainWidth }}
                // setCoModalOpen={setCoModalOpen}
                // onCommentChange={handleCommentChange}
              />
            ) : (
              <>
                <button
                  className={`${styles.commentBtn}`}
                  onClick={handleCommentOpen}
                >
                  <img src={comment} alt="댓글창" style={{ width: "30px" }} />
                </button>
                <div className={styles.count}>{item.commentCount}</div>
              </>
            )}
          </div>
          {cModalOpen && (
            <div
              className={styles.cmtModal}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setCModalOpen(false);
                }
              }}
            />
          )}
          <div className={styles.cmtModal} style={{ marginTop: "1rem" }}>
            {etcModalOpen ? (
              // 모달이 열려 있으면 모달 컴포넌트만 렌더링
              <EtcModal
                item={item}
                setEtcModalOpen={setEtcModalOpen}
                refreshList={refreshList}
                style={{ width: boardMainWidth }}
                containerWidth={boardMainWidth}
              />
            ) : (
              // 모달이 닫혀 있으면 페이지의 나머지 컨텐츠 렌더링
              <>
                {formattedName && (
                  <button
                    className={styles.etcBtn}
                    alt="기타 등등"
                    onClick={handleEtcModal}
                  >
                    <img
                      src={etc}
                      alt="기타 등등"
                      style={{ width: "30px", height: "30px" }}
                    ></img>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.chatModal}>
          {chatModalOpen ? (
            <ChatModal
              setChatModalOpen={setChatModalOpen}
              item={item}
              style={{ width: boardMainWidth }}
              formattedName={formattedName}
            />
          ) : (
            <div className={styles.item_profile}>
              <button className={`${styles.chatBtn}`}>
                {/* 프로필 */}
                <div
                  onClick={handleChatOpen}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: profileImg[profileIdx].color[colorIdx],
                    borderRadius: "100%",
                    width: "4rem",
                    height: "4rem",
                  }}
                >
                  <img
                    src={profileImg[profileIdx].image}
                    style={{ width: "3rem" }}
                  ></img>
                </div>
              </button>
              <div className={styles.profile_content}>
                {formattedName ? (
                  <div className={`${styles.profile_name}`}>
                    <button
                      onClick={handleChatOpen}
                      className={`${styles.chatBtn}`}
                    >
                      {formattedName}
                    </button>
                  </div>
                ) : (
                  <div className={`${styles.profile_name}`}>탈퇴한 회원</div>
                )}
                <div className={styles.createdAt}>{formattedDate}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BoardItem;
