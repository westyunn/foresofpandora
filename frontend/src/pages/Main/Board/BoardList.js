import { useCallback, useEffect, useRef, useState } from "react";
import BoardItem from "./BoardItem";
import styles from "./BoardList.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// Intersection Observer를 사용하여 무한 스크롤 구현
const BoardList = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState([]);
  const params = { page: page };
  const dispatch = useDispatch();
  // useRef를 사용하여 옵저버를 참조
  const observerRef = useRef(null);
  useEffect(() => {
    getBoardList(); // 초기 데이터 로딩 시에는 한 번만 호출
  }, [page]);

  const getBoardList = async () => {
    setIsLoading(true);
    try {
      // 여기서 불러옴
      const res = await axios.get(`api/articles`, {
        params,
      });
      console.log(res.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData((prev) => [...prev, ...res.data.data.content]);
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
  const obsHandler = useCallback(
    (entries) => {
      const target = entries[0];
      if (!isLoading && target.isIntersecting) {
        console.log("is InterSecting");
        // if (page < Data.data.totalPages) {
        setPage((prev) => prev + 1);
        // }
      }
    },
    [isLoading]
  );

  const options = {
    root: null, // 관찰대상 부모 요소 지정
    rootMargin: "20px", // 관찰 뷰포트 마진 지정
    threshold: 1.0,
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
    return () => {
      observer.disconnect();
    };
  }, [obsHandler, options]);
  // 데이터 로딩이 완료되면 옵저버를 다시 설정
  useEffect(() => {
    if (!isLoading && observerRef.current) {
      const observerTarget = document.getElementById("observer");
      if (observerTarget) {
        observerRef.current.observe(observerTarget);
      }
    }
  }, [isLoading]);

  return (
    <>
      <div className={styles.scroll_container}>
        {Data &&
          Data.map((item) => (
            <div className={styles.scroll_area}>
              <BoardItem item={item} page={page} />
            </div>
          ))}
        {isLoading && (
          <div className={styles.loading_main}>
            <div className={styles.loading_circle}></div>
          </div>
        )}
        <div id="observer"></div>
      </div>
    </>
  );
};

export default BoardList;
