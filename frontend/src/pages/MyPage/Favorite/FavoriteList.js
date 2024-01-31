import BoardList from "../../../components/Board/BoardList";
import { getSave } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "../Mypage.module.css";
import arrow from "../../../assets/arrow.png";

const FavoriteList = ({ isSave }) => {
  const [items, setItems] = useState([]);

  const newItems = () => {
    setItems([
      {
        id: 1,
        memberId: 1,
        memberNickname: "굴러가는 도토리",
        imgUrls: [
          "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
          "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
          "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
        ],
        repImg: 0,
        content: "고양이 이름으로 곤약이 어때? 화나면 꼬냑이야",
        like: 3,
        comment: 5,
        createdAt: "2024-01-29T12:35:49.9631477",
        modifiedAt: "2024-01-31T11:13:00",
      },
      {
        id: 2,
        memberId: 1,
        memberNickname: "소리치는 하마",
        imgUrls: [
          "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
          "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
          "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
        ],
        repImg: 1,
        content:
          "고양이랑 강아지 중 고양이가 좋지않아?? 이것봐 진짜 이뻐 대박이뻐 완전이뻐 ",
        like: 3,
        comment: 5,
        createdAt: "2023-01-30T23:35:49.9631477",
        modifiedAt: "2023-01-30T23:35:49.963",
      },
      {
        id: 3,
        memberId: 1,
        memberNickname: "소리치는 하마",
        imgUrls: [
          "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
          "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
          "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
        ],
        repImg: 2,
        content:
          "오래도록 좋아했던 그 사람이 \n 다른 남자와 같이 이야기하며 \n 걸어가는 것을 봤다. \n그녀 웃음이 그녀가 얼마나 \n즐거워 하고 있는지 그대로 /n보여주었다.",
        like: 3,
        comment: 5,
        createdAt: "2024-01-31T00:10:49.9631477",
        modifiedAt: "2023-01-31T00:10:49.963",
      },
    ]);
  };
  useEffect(() => {
    newItems();
  }, []);

  //   const handleLoad = async () => {
  //     const { articles } = await getSave();
  //     setItems(articles);
  //   };
  //   useEffect(() => {
  //     handleLoad();
  //   }, []);

  return (
    <div>
      <Link to="/mypage">
        <img className={style.arrow} src={arrow} />
      </Link>

      <h3>보관한 글</h3>
      <p>총 &nbsp;{items.length}개</p>
      <BoardList items={items} isSave={isSave} />
    </div>
  );
};

export default FavoriteList;
