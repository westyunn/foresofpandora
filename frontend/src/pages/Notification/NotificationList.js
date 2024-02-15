import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import NotificationItem from "./NotificationItem";
import styles from "./NotificationList.module.css";

const NotificationList = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const params = { page: page };
  const [noticeList, setNoticeList] = useState({ content: [], totalPages: 0 });
  const observerRef = useRef(null);

  const getNoticeList = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/member/alarm`, {
        params,
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setNoticeList((prevData) => ({
        content: [...prevData.content, ...res.data.data.content],
        totalPages: res.data.data.totalPages,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getNoticeList();
  }, [page, getNoticeList]);

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
        if (page < noticeList.totalPages) {
          setPage((prev) => prev + 1);
        }
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
    <div className={`${styles.container}`}>
      {noticeList.content.map((it) => (
        <NotificationItem key={it.id} {...it} page={page} />
      ))}
      {isLoading && (
        <div className={styles.loading_main}>
          <div className={styles.loading_circle}></div>
        </div>
      )}
      <div id="observer"></div>
      <div style={{ marginTop: "6rem" }}></div>
    </div>
  );
};

export default NotificationList;
