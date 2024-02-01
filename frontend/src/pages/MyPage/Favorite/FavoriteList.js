import BoardList from "../../../components/Board/BoardList";
import { getSave } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "../Mypage.module.css";
import arrow from "../../../assets/arrow.png";

const FavoriteList = ({ isSave }) => {
  const [response, setResponse] = useState({});
  const [items, setItems] = useState([]);

  const getResponse = async () => {
    try {
      // 비동기 작업을 수행하는 API 호출 등을 여기서 처리
      const responseData = {
        success: true,
        data: {
          content: [
            {
              id: 2,
              memberId: 1,
              memberNickname: "소리치는 하마",
              content: "아 심심하다",
              createdAt: "2024-01-31T12:54:34.43738",
              modifiedAt: "2024-01-31T12:54:34.43738",
              imgUrls: [
                "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
                "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
                "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
              ],
            },
            {
              id: 3,
              memberId: 1,
              memberNickname: "소리치는 하마",
              content: "주말 빨리 됐으면 좋겠다",
              createdAt: "2024-01-31T12:55:08.563779",
              modifiedAt: "2024-01-31T12:55:08.563779",
              imgUrls: [
                "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
                "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
                "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
              ],
            },
            {
              id: 4,
              memberId: 1,
              memberNickname: "소리치는 하마",
              content: "임시저장글을 이제 게시글로!",
              createdAt: "2024-01-31T12:57:33.986139",
              modifiedAt: "2024-01-31T12:57:33.986139",
              imgUrls: [
                "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
                "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
                "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
              ],
            },
            {
              id: 5,
              memberId: 1,
              memberNickname: "소리치는 하마",
              content: "임시저장글을 이제 게시글로!",
              createdAt: "2024-01-31T12:57:33.986139",
              modifiedAt: "2024-01-31T12:57:33.986139",
              imgUrls: [
                "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
                "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
                "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
              ],
            },
            {
              id: 6,
              memberId: 1,
              memberNickname: "소리치는 하마",
              content: "임시저장글을 이제 게시글로!",
              createdAt: "2024-01-31T12:57:33.986139",
              modifiedAt: "2024-01-31T12:57:33.986139",
              imgUrls: [
                "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
                "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
                "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
              ],
            },
          ],
          pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            unpaged: false,
            paged: true,
          },
          last: true,
          totalPages: 1,
          totalElements: 3,
          first: true,
          numberOfElements: 3,
          size: 10,
          number: 0,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          empty: false,
        },
      };
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  console.log("out", response.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getResponse();
        setResponse(responseData);
        console.log("after", responseData.data);
      } catch (error) {
        // 에러 처리를 필요에 따라 추가
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setItems(response.data?.content || []);
  }, [response]);

  console.log("악", items);

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
