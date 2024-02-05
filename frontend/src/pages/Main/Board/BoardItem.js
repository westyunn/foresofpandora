import styles from "./BoardItem.module.css";
import { useEffect, useRef, useState } from "react";
import heart from "../../../assets/heart.png";
import icon from "../../../assets/profilecat.png";
import comment from "../../../assets/comments.png";
import saved from "../../../assets/saved.png";
import Comment from "../Comment/Comment";
import fullSave from "../../../assets/isSaved.png";
import fullHeart from "../../../assets/fullHeart.png";
import ZoomIn from "../../../assets/ZoomIn.png";
import {
  postSaved,
  getIsSaved,
  postReaction,
  getMyReaction,
  getReactionCount,
  getArticle,
} from "./api";
import BoardImage from "./BoardImageModal";

const BoardItem = ({ item, page }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const modalBackground = useRef();
  const [isLiked, setIsLiked] = useState(false);
  const [isMyLiked, setIsMyLiked] = useState(false);
  const [reactionCount, setReactionCount] = useState(0);
  const [likeCnt, setLikeCnt] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isMySaved, setIsMySaved] = useState(false);
  // backend에서 갖고온 오리지널 날짜(수정날짜 쓰기로 하였음)
  const originDate = item.modifiedAt;
  // Date 객체 생성
  const date = new Date(originDate);
  // +9 해야돼서 밀리초 환산
  const nineHours = 9 * 60 * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + nineHours);
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
  const handleSaved = () => {
    postSaved({ item, setIsSaved })
      .then((isSaved) => {
        // 요청 성공 후에 isMySaved 업데이트 해주기
        setIsMySaved(!isMySaved);
      })
      .catch((err) => {
        console.error("보관 요청 실패:", err);
      });
  };

  const handleLiked = () => {
    postReaction({ item, setIsLiked })
      .then((isLiked) => {
        setIsMyLiked(!isMyLiked);
        // 좋아요 요청 처리한 후 최신 좋아요 개수 반영해서 reaction count 받아오기
        getArticle({ item, setReactionCount }).then((updateCount) => {
          // 이제 서버에 반영된 최신 count 가져옴
          setReactionCount(updateCount);
          console.log(reactionCount);
          console.log(updateCount);
        });
      })
      .catch((err) => {
        console.error("좋아요 실패:", err);
      });
  };

  const handleZoomIn = (event) => {
    event.stopPropagation(); // 이벤트 버블링 막기
    setImgModalOpen(true);
  };
  useEffect(() => {
    if (item && item.id) {
      // getCommentCount({ item, setCommentCount, page });
      // getReactionCount({ item, setReactionCount });
      getIsSaved({ item, setIsMySaved });
      getMyReaction({ item, setIsMyLiked });
    }
  }, [page]);

  return (
    <div className={styles.board_container}>
      {item.imageList.length > 0 ? (
        <div
          className={`${styles.board_main} ${styles.board_imgTrue}`}
          style={{
            /* 이미지에 투명도 적용해서 자체 필터 씌워버리기 */
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.imageList[0]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className={`${styles.board_zoomBtn}`}>
            <button onClick={handleZoomIn} className={styles.zoomBtn}>
              <img
                src={ZoomIn}
                alt="이미지 확대"
                style={{ width: "31px" }}
              ></img>
            </button>
            {imgModalOpen === true ? (
              <BoardImage item={item} setImgModalOpen={setImgModalOpen} />
            ) : null}
          </div>
          <div className={`${styles.board_content}`}>{item.content}</div>
        </div>
      ) : (
        <div className={`${styles.board_main} ${styles.board_imgFalse} `}>
          <div className={`${styles.board_content}`}>{item.content}</div>
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.side_container}>
          <div>
            <button className={styles.savedBtn} onClick={handleSaved}>
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
          <div style={{ marginBottom: "1rem" }}>
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
            <div className={styles.count}>{item.reactionCount}</div>
          </div>
          <div className={styles.btn_modal_wrapper}>
            <div>
              <img
                src={comment}
                alt="댓글창"
                style={{ width: "30px" }}
                onClick={() => setModalOpen(true)}
              />
            </div>
            <div className={styles.count}>{item.commentCount}</div>
            {modalOpen && <Comment setModalOpen={setModalOpen} />}
          </div>
          {modalOpen && (
            <div
              className={styles.modal_container}
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            />
          )}
        </div>
        <div className={styles.item_profile}>
          <img src={icon} style={{ width: "4rem" }}></img>
          <div className={styles.profile_content}>
            <div>깡총깡총 토끼</div>
            <div className={styles.createdAt}>{formattedDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardItem;
