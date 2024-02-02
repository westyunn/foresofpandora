import styles from "./BoardItem.module.css";
import { useEffect, useRef, useState } from "react";
import heart from "../../../assets/heart.png";
import icon from "../../../assets/profilecat.png";
import comment from "../../../assets/comments.png";
import saved from "../../../assets/saved.png";
import axios from "axios";

const BoardItem = ({ item, page }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [count, setCount] = useState(0);
  const params = { page: page };
  // backend에서 갖고온 오리지널 날짜(수정날짜 쓰기로 하였음)
  const originDate = item.modifiedAt;
  // Date 객체 생성
  const date = new Date(originDate);
  // +9 해야돼서 밀리초 환산
  const nineHours = 9 * 60 * 60 * 1000;

  // 현재 시간에서 9시간을 빼기
  const adjustedDate = new Date(date.getTime() + nineHours);
  // 대한민국 표준시 변환을 위한 옵션 설정
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
  const getReactionCount = async () => {};

  const getCommentCount = async () => {
    try {
      const res = await axios.get(`api/articles/${item.id}/comments`, {
        params,
      });
      console.log(res.data.data.totalElements);
      setCount(res.data.data.totalElements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommentCount();
  }, [page]);

  return (
    <div className={styles.board_container}>
      <div>
        <div className={styles.board_main}>
          <div>{item.id}</div>
          <div>{item.content}</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.side_container}>
            <div>
              <img src={saved} style={{ width: "28px", height: "33px" }}></img>
            </div>
            <div>
              <img src={heart} style={{ width: "30px" }}></img>
            </div>
            <div className={styles.btn_modal_wrapper}>
              <button
                className={styles.modal_open_btn}
                onClick={() => setModalOpen(true)}
              >
                <img src={comment} alt="댓글창"></img>
              </button>
              {count}
            </div>
            {modalOpen && (
              <div
                className="modal-container"
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
    </div>
  );
};
export default BoardItem;
