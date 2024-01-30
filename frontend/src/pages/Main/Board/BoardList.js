import { useCallback, useEffect, useRef, useState } from "react";
import BoardItem from "./BoardItem";
import "./BoardList.css";

// Intersection Observer를 사용하여 무한 스크롤 구현
const BoardList = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    getBoardList();
  }, [page]);

  const getBoardList = async () => {
    setIsLoading(true);
    try {
      // const res = await fetch(`${process.env.REACT_APP_BACKURL}/api/articles`);
      // const data = await res.json();
      const dummyResponse = Array.from({ length: 10 }, (_, index) => ({
        id: (page - 1) * 10 + index + 1,
        content: `더미 콘텐츠 ${(page - 1) * 10 + index + 1}`,
      })); // 더미 데이터로 일단 예시 구현
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDummyData((prev) => [...prev, ...dummyResponse]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  /*
  obsHandler: 교차점이 발생했을 때 실행되는 콜백 함수.
  entries: 교차점 정보를 담는 배열
  isIntersecting: 교차점(intersection)이 발생한 요소의 상태
  교차점이 발생하면 page 1 증가
  */
  const obsHandler = (entries) => {
    const target = entries[0];
    if (!isLoading && target.isIntersecting) {
      console.log("is InterSecting");
      setPage((prev) => prev + 1); // 다음 페이지로 이동
    }
  };

  const options = {
    root: null, // 관찰대상 부모 요소 지정
    rootMargin: "20px", // 관찰 뷰포트 마진 지정
    threshold: 0.8,
  };
  // obsRef 요소 관찰 -> viewport와 50% 겹쳐졌을 때 겹쳐짐이 true로 set
  // 옵저버 생성
  useEffect(() => {
    // observer 정의 이후 IntersectionObserver 생성
    const observer = new IntersectionObserver(obsHandler, options);
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  return (
    <>
      <div className="scroll-container">
        {dummyData &&
          dummyData.map((item) => (
            <div key={item.id}>
              <BoardItem item={item} />
            </div>
          ))}
        {isLoading && <div>Loading...</div>}
        <div id="observer"></div>
      </div>
    </>
  );
};

export default BoardList;
