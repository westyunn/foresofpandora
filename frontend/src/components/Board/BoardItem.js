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

  const originDate = item.modifiedAt;
  // Date 객체 생성
  const date = new Date(originDate);
  // +9 해야돼서 밀리초 환산
  const nineHours = 9 * 60 * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + nineHours);

  function timeAgo() {
    const currentTime = new Date();
    const inputTime = adjustedDate;
    console.log(currentTime);
    console.log(inputTime);

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
      console.log("click", data);
      navigate("/boarddetail", { state: { item: item, type: type } });
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
            {type === 2 && <p className={style.nickname}>소리치는 하마</p>}
            {type === 1 && (
              <div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={heart}></img>
                  <span>32</span>
                </div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={comment}></img>
                  <span>13</span>
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
