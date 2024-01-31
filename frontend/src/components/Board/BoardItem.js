import "./Board.css";
import heart from "../../assets/heart.png";
import comment from "../../assets/comment.png";
import { useEffect, useState } from "react";

const BoardItem = ({ item, isSave }) => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  const nowHours = now.getHours();
  const nowMinuites = now.getMinutes();
  const nowSeconds = now.getSeconds();

  const write = item.modifiedAt;
  const year = Number(write.substr(0, 4));
  const month = Number(write.substr(5, 2));
  const date = Number(write.substr(8, 2));
  const hours = Number(write.substr(11, 2));
  const minutes = Number(write.substr(14, 2));
  const seconds = Number(write.substr(17, 2));

  const [newTime, setNewTime] = useState("");

  const time = () => {
    if (nowYear - year != 0) {
      setNewTime(`${nowYear - year}년전`);
    } else {
      if (nowMonth - month != 0) {
        setNewTime(`${nowMonth - month}달전`);
      } else {
        if (nowDate - date != 0) {
          setNewTime(`${nowDate - date}일전`);
        } else {
          if (nowHours - hours != 0) {
            setNewTime(`${nowHours - hours}시간전`);
          } else {
            if (nowMinuites - minutes != 0) {
              setNewTime(`${nowMinuites - minutes}분전`);
            } else {
              setNewTime(`${nowSeconds - seconds}초전`);
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    time();
  }, []);

  console.log(newTime);

  return (
    <div>
      <div className="article">
        <img className="articleImg" src={item.imgUrl} />
        <div className="articleText">
          <p className="content">{item.content}</p>
          {isSave && <p>{item.memberNicname}</p>}
          {!isSave && (
            <div>
              <div className="reactions">
                <img className="iconImg" src={heart}></img>
                <span>{item.like}</span>
              </div>
              <div className="reactions">
                <img className="iconImg" src={comment}></img>
                <span>{item.comment}</span>
              </div>
              <p>{newTime}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
