import style from "./Board.module.css";
import heart from "../../assets/heart.png";
import comment from "../../assets/comment.png";
import { useEffect, useState } from "react";
import { getBoardDetail } from "./api";
import { useNavigate } from "react-router-dom";

const BoardItem = ({ item, type }) => {
  const navigate = useNavigate();
  const [newTime, setNewTime] = useState("");
  const [img, setImg] = useState("");
  const [formattedName, setFormattedName] = useState("");

  //닉네임 출력 수정
  useEffect(() => {
    if (item.nickname === "(탈퇴한 회원)") {
      setFormattedName("탈퇴한 회원");
    } else {
      setFormattedName(item.nickname.split("(")[0]);
    }
  }, [item.nickname]);

  const originDate = item.modifiedAt;
  // Date 객체 생성
  const date = new Date(originDate);
  // +9 해야돼서 밀리초 환산

  const adjustedDate = new Date(date.getTime());

  function timeAgo() {
    const currentTime = new Date();
    const inputTime = adjustedDate;

    const timeDifferenceInSeconds = Math.floor(
      (currentTime - inputTime) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return setNewTime(`${timeDifferenceInSeconds} 초 전`);
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return setNewTime(`${minutes} 분 전`);
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return setNewTime(`${hours} 시간 전`);
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return setNewTime(`${days} 일 전`);
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return setNewTime(`${months} 달 전`);
    } else {
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      return setNewTime(`${years} 년 전`);
    }
  }

  const getRepImg = () => {
    setImg(item.imageList[0]);
  };

  const getDetail = async (id) => {
    try {
      const data = await getBoardDetail(id);
      navigate("/boarddetail", { state: { item: data, type: type } });
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };

  useEffect(() => {
    timeAgo();
  }, []);
  useEffect(() => {
    getRepImg();
  }, []);

  return (
    <div
      onClick={() => {
        getDetail(item.id);
      }}
    >
      <div className={style.article}>
        <img className={style.articleImg} src={img} />
        <div className={style.articleSort}>
          <div className={style.articleText}>
            <p className={style.content}>{item.content}</p>
            {type === 2 && <p className={style.nickname}>{formattedName}</p>}
            {type === 1 && (
              <div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={heart}></img>
                  <span className={style.reactionIcon}>
                    {item.reactionCount}
                  </span>
                </div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={comment}></img>
                  <span className={style.reactionIcon}>
                    {item.commentCount}
                  </span>
                </div>
                <p>{newTime}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
