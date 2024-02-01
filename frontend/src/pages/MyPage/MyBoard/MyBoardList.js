// import BoardList from "../../../components/Board/BoardList";
// import style from "../Mypage.module.css";
// import arrow from "../../../assets/arrow.png";

// import { getMyBoard } from "../api";
// import { useState, useCallback, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

const MyBoardList = ({ isSave }) => {
  //   // const [response, setResponse] = useState({});
  //   // const [items, setItems] = useState([]);

  //   const [page, setPage] = useState(0);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [items, setItems] = useState([]);

  //   // useRef를 사용하여 옵저버를 참조
  //   const observerRef = useRef(null);
  //   useEffect(() => {
  //     getBoardList(); // 초기 데이터 로딩 시에는 한 번만 호출
  //   }, [page]);

  //   const getBoardList = async () => {
  //     setIsLoading(true);
  //     try {
  //       getMyBoard(page);
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       setItems((prev) => prev + 1);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // useEffect(() => {
  //   //   if (page > 2) {
  //   //     getBoardList(page);
  //   //   }
  //   // }, [page]);

  //   /*
  //    obsHandler: 교차점이 발생했을 때 실행되는 콜백 함수.
  //    entries: 교차점 정보를 담는 배열
  //    isIntersecting: 교차점(intersection)이 발생한 요소의 상태
  //    교차점이 발생하면 page 1 증가
  //    */
  //   const obsHandler = useCallback(
  //     (entries) => {
  //       const target = entries[0];
  //       if (!isLoading && target.isIntersecting) {
  //         console.log("is InterSecting");
  //         setPage((prev) => prev + 1);
  //       }
  //     },
  //     [isLoading]
  //   );

  //   const options = {
  //     root: null, // 관찰대상 부모 요소 지정
  //     rootMargin: "20px", // 관찰 뷰포트 마진 지정
  //     threshold: 1.0,
  //   };
  //   // obsRef 요소 관찰 -> viewport와 50% 겹쳐졌을 때 겹쳐짐이 true로 set
  //   // 옵저버 생성
  //   useEffect(() => {
  //     // observer 정의 이후 IntersectionObserver 생성
  //     const observer = new IntersectionObserver(obsHandler, options);
  //     const observerTarget = document.getElementById("observer");
  //     if (observerTarget) {
  //       observer.observe(observerTarget);
  //     }
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, [obsHandler, options]);
  //   // 데이터 로딩이 완료되면 옵저버를 다시 설정
  //   useEffect(() => {
  //     if (!isLoading && observerRef.current) {
  //       const observerTarget = document.getElementById("observer");
  //       if (observerTarget) {
  //         observerRef.current.observe(observerTarget);
  //       }
  //     }
  //   }, [isLoading]);

  // const getResponse = async () => {
  //   try {
  //     // 비동기 작업을 수행하는 API 호출 등을 여기서 처리
  //     const responseData = {
  //       success: true,
  //       data: {
  //         content: [
  //           {
  //             id: 2,
  //             memberId: 1,
  //             memberNickname: "소리치는 하마",
  //             content: "아 심심하다",
  //             createdAt: "2024-01-31T12:54:34.43738",
  //             modifiedAt: "2024-01-31T12:54:34.43738",
  //             imgUrls: [
  //               "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
  //               "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
  //               "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
  //             ],
  //           },
  //           {
  //             id: 3,
  //             memberId: 1,
  //             memberNickname: "소리치는 하마",
  //             content: "주말 빨리 됐으면 좋겠다",
  //             createdAt: "2024-01-31T12:55:08.563779",
  //             modifiedAt: "2024-01-31T12:55:08.563779",
  //             imgUrls: [
  //               "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
  //               "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
  //               "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
  //             ],
  //           },
  //           {
  //             id: 4,
  //             memberId: 1,
  //             memberNickname: "소리치는 하마",
  //             content: "임시저장글을 이제 게시글로!",
  //             createdAt: "2024-01-31T12:57:33.986139",
  //             modifiedAt: "2024-01-31T12:57:33.986139",
  //             imgUrls: [
  //               "http://issuepress.kr/wp-content/uploads/2020/12/%EB%B0%A4%ED%95%98%EB%8A%98-%EB%B3%84%EB%B9%9B.jpg",
  //               "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG",
  //               "https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg",
  //             ],
  //           },
  //         ],
  //         pageable: {
  //           pageNumber: 0,
  //           pageSize: 10,
  //           sort: {
  //             empty: true,
  //             sorted: false,
  //             unsorted: true,
  //           },
  //           offset: 0,
  //           unpaged: false,
  //           paged: true,
  //         },
  //         last: true,
  //         totalPages: 2,
  //         totalElements: 3,
  //         first: true,
  //         numberOfElements: 3,
  //         size: 10,
  //         number: 0,
  //         sort: {
  //           empty: true,
  //           sorted: false,
  //           unsorted: true,
  //         },
  //         empty: false,
  //       },
  //     };
  //     return responseData;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseData = await getResponse();
  //       setResponse(responseData);
  //       console.log("after", response.data);
  //       // setTotalItems(response.data.totalElements);
  //       // setPageCount(response.data.totalPages);
  //     } catch (error) {
  //       // 에러 처리를 필요에 따라 추가
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setItems(response.data?.content || []);
  // }, [response]);

  return (
    <div>구현중</div>
    //     <div>
    //       <Link to="/mypage">
    //         <img className={style.arrow} src={arrow} alt="Arrow" />
    //       </Link>
    //       <h3>내가 쓴 글</h3>
    //       <p>총 &nbsp;{items.length}개</p>
    //       {/* BoardList에는 items가 변경될 때마다 다시 렌더링되도록 key 속성 추가 */}
    //       <BoardList
    //         items={items}
    //         isSave={isSave}
    //         // key={items.map((item) => item.id).join(",")}
    //       />
    //     </div>
  );
};

export default MyBoardList;
