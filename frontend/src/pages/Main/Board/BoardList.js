import { useCallback, useEffect, useRef, useState } from "react";
import BoardItem from "./BoardItem";
import "./BoardList.css";
// Intersection Observer를 사용
const dummyData = [
  { id: 1, title: "Post 1", content: "Content for post 1" },
  { id: 2, title: "Post 2", content: "Content for post 2" },
  { id: 3, title: "Post 3", content: "Content for post 3" },
  { id: 4, title: "Post 4", content: "Content for post 4" },
  { id: 5, title: "Post 5", content: "Content for post 5" },
  { id: 6, title: "Post 6", content: "Content for post 6" },
  { id: 7, title: "Post 7", content: "Content for post 7" },
  { id: 8, title: "Post 8", content: "Content for post 8" },
  { id: 9, title: "Post 9", content: "Content for post 9" },
  { id: 10, title: "Post 10", content: "Content for post 10" },
  { id: 12, title: "Post 12", content: "Content for post 12" },
  { id: 13, title: "Post 13", content: "Content for post 13" },
  { id: 14, title: "Post 14", content: "Content for post 14" },
  { id: 15, title: "Post 15", content: "Content for post 15" },
  { id: 16, title: "Post 16", content: "Content for post 16" },
  { id: 17, title: "Post 17", content: "Content for post 17" },
  { id: 18, title: "Post 18", content: "Content for post 18" },
  { id: 19, title: "Post 19", content: "Content for post 19" },
  { id: 20, title: "Post 20", content: "Content for post 20" },
];
const BoardList = () => {
  const obsRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]); // list
  const preventRef = useRef(true); // 옵저버 중복 실행 방지
  const endRef = useRef(false); // 모든 글 로드 확인

  const getBoardList = async () => {
    try {
      // const res = await fetch(`${process.env.REACT_APP_BACKURL}/api/articles`);
      // const data = await res.json();
      const data = dummyData;
      setList((prev) => [...prev, ...data]);
      setLoad(true);
    } catch (error) {
      console.error(error);
    } finally {
      preventRef.current = true;
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  const options = {
    root: null, // 관찰대상 부모 요소 지정
    rootMargin: "20px", // 관찰 뷰포트 마진 지정
    threshold: 0.5,
  };
  const obsHandler = useCallback(
    async (entries) => {
      const target = entries[0];
      if (!endRef.current && target.isIntersecting) {
        console.log("is InterSecting");
        getBoardList();
      }
    },
    [preventRef]
  );
  // obsRef 요소 관찰 -> viewport와 50% 겹쳐졌을 때 겹쳐짐이 true로 set
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, options);
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [obsHandler]);

  return (
    <>
      <div className="scroll-container">
        {list.map((board) => (
          <div key={board.id}>
            <BoardItem key={board.id} board={board} />
          </div>
        ))}
        <div ref={obsRef}>관찰중</div>
      </div>
    </>
  );
};

export default BoardList;
