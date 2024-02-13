import BoardItem from "./BoardItem";
import style from "./Board.module.css";
import BoardTempItem from "../../pages/Main/BoardTemp/BoardTempItem";

import { getMyBoard, getMySaved } from "./api";
import { getMyTemp, deleteMyTemp } from "../../pages/Main/BoardTemp/api";
import { useState, useCallback, useEffect, useRef } from "react";

const BoardList = ({ type }) => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [items, setItems] = useState([]);
  const [newData, setNewData] = useState({});
  const [fstLoading, setFstLoading] = useState(false);

  // useRef를 사용하여 옵저버를 참조
  const observerRef = useRef(null);
  useEffect(() => {
    getBoardList(); // 초기 데이터 로딩 시에는 한 번만 호출
  }, [page]);

  //임시보관글 삭제(자식컴포넌트(item)에서 호출)
  const deleteTemp = async (id) => {
    try {
      if (window.confirm("임시저장 글을 삭제하겠습니까?")) {
        await deleteMyTemp(id); //임시보관 삭제 api
        //페이지가 2페이지 이상일땐 페이지 0으로 초기화 해서 getBoardList 재호출
        if (page > 0) {
          setItems([]);
          setPage(0);
        } else {
          //1페이지일때 items빈배열로 초기화 하고 getBoardList호출
          await getBoardList(setItems([]));
        }
        console.log("Temp deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };
  //임시저장 목록 불러오기
  const getBoardList = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(); //api호출하는 함수 호출

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setItems((prev) => [...prev, ...res]); //이전 items와 다음 페이지 값을 합쳐서 items에 넣기
      setFstLoading(true);
    } catch (error) {
      console.error("임시저장 목록 불러오기 실패", error);
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
        if (page + 1 < newData.data.data.totalPages) {
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
  //다음 페이지 items불러오기
  const fetchData = async () => {
    try {
      let responseData;
      //type에 따라 다른 list불러오기
      if (type === 2) {
        responseData = await getMySaved(page); //보관한 글
      } else if (type === 1) {
        responseData = await getMyBoard(page); //내가 쓴 글
      } else if (type === 3) {
        responseData = await getMyTemp(page); //임시저장한 글
      }

      setNewData(responseData);
      setTotalElements(responseData.data.data.totalElements);

      return responseData.data.data.content;
    } catch (error) {
      console.log("다음 페이지 목록 불러오기 실패", error);
    }
  };

  if (items.length === 0) {
    if (fstLoading === false) {
      return (
        <div className={style.message}>
          <span className={style.messageText}>로딩 중...</span>
        </div>
      );
    } else {
      return (
        <div>
          <p className={style.count}>총 &nbsp;{totalElements}개</p>

          {type === 1 && (
            <div className={style.message}>
              <span className={style.messageText}>
                내가 쓴 게시글이 없습니다.
              </span>
            </div>
          )}
          {type === 2 && (
            <div className={style.message}>
              <span className={style.messageText}>
                보관한 게시글이 없습니다.
              </span>
            </div>
          )}
        </div>
      );
    }
  } else {
    return (
      <div>
        <p className={style.count}>총 &nbsp;{totalElements}개</p>

        <div>
          {items.map((item) => (
            <div key={item.id}>
              {type !== 3 && <BoardItem item={item} type={type} />}
              {type === 3 && (
                <BoardTempItem item={item} deleteTemp={deleteTemp} />
              )}
            </div>
          ))}
          <div className={style.empty}> </div>
        </div>
        {isLoading && <div>Loading...</div>}
        <div id="observer"></div>
      </div>
    );
  }
};

export default BoardList;
