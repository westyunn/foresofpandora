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

  //닉네임 출력 수정
  const formattedName = item.nickname.split("(")[0];

  const originDate = item.modifiedAt;
  // Date 객체 생성
  const date = new Date(originDate);
  // +9 해야돼서 밀리초 환산

  const adjustedDate = new Date(date.getTime());

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
    if (item.imageList.length === 0) {
      setImg(
        "https://images.unsplash.com/photo-1592769606534-fe78d27bf450?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    } else {
      setImg(item.imageList[0]);
    }
  };

  const getDetail = async (id) => {
    try {
      const data = await getBoardDetail(id);
      // console.log(item);
      console.log("click", data);
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
                  <span>{item.reactionCount}</span>
                </div>
                <div className={style.reactions}>
                  <img className={style.iconImg} src={comment}></img>
                  <span>{item.commentCount}</span>
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
