import styles from "./BoardItem.module.css";
import { useEffect, useRef, useState } from "react";
import heart from "../../../assets/heart.png";
import icon from "../../../assets/profilecat.png";
import comment from "../../../assets/comments.png";
import saved from "../../../assets/saved.png";
import Comment from "../Comment/Comment";
import isSaved from "../../../assets/isSaved.png";
import axios from "axios";
import { getCommentCount, getReactionCount, postSaved } from "./api";

const BoardItem = ({ item, page }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [isSaved, setIsSaved] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [reactionCount, setReactionCount] = useState(0);
  const params = { page: page };
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
    postSaved({ item, setIsSaved });
  };

  useEffect(() => {
    if (item && item.id) {
      getCommentCount({ item, setCommentCount, page });
      getReactionCount({ item, setReactionCount });
    }
  }, [page]);

  return (
    <div className={styles.board_container}>
      <div className={styles.board_main}>
        <div>{item.id}</div>
        <div>{item.content}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.side_container}>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              float: "right",
            }}
          >
            <button className={styles.savedBtn} onClick={handleSaved}>
              {isSaved === true ? (
                <img src={isSaved}></img>
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
            <img src={heart} style={{ width: "30px" }}></img>
            <div className={styles.count}>{reactionCount}</div>
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
            <div className={styles.count}>{commentCount}</div>
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
