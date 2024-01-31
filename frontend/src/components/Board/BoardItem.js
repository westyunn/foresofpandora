import style from "./Board.module.css";
import heart from "../../assets/heart.png";
import comment from "../../assets/comment.png";
import { useEffect, useState } from "react";

const BoardItem = ({ item, isSave }) => {
  const [newTime, setNewTime] = useState("");
  const [img, setImg] = useState("");

  function timeAgo() {
    const currentTime = new Date();
    const inputTime = new Date(item.modifiedAt);

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
    setImg(item.imgUrls[item.repImg]);
  };

  useEffect(() => {
    timeAgo();
  }, []);
  useEffect(() => {
    getRepImg();
  }, []);

  return (
    <div>
      <div className={style.article}>
        <img className={style.articleImg} src={img} />
        <div className={style.articleSort}>
          <div className={style.articleText}>
            <p className={style.content}>{item.content}</p>
            {isSave && <p className={style.nickname}>{item.memberNickname}</p>}
            {!isSave && (
              <div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={heart}></img>
                  <span>{item.like}</span>
                </div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={comment}></img>
                  <span>{item.comment}</span>
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
