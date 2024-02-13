// 로그인 성공시 SSE 연결
// 로그인 후 어디서든 알림을 수신해야 한다 -> 상위 Router

// eventSource 객체가 생성되면, 네트워크 탭에서 event 스트림을 볼 수 있음
// event 스트림이 열려있다 -> 서버에서 언제든 이벤트를 받을 준비가 되어있다
// 한번 열린 EventStream은 1분마다 닫히고 다시 연결
// 클라이언트에서 페이지를 닫아도 서버가 감지하기 어려움

// 응답 헤더 -> content-type : text/event-stream (연속적인 이벤트를 수신받는 방식의 컨텐츠)

// 이벤트 수신 중단 -> eventSource.close()
// 연결은 EventSource.close() 호출로 종료되기 전까지 지속
// 로그아웃 했을 때
// 사이트를 벗어났을 때

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../../store/notification";

const Event = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId); // 유저 정보
  // 다음과 같은 정보들을 redux에 저장하면 좋을 것 같다.
  const listen = useSelector((state) => state.notification.listen);
  const noticeList = useSelector((state) => state.notification.noticeList);

  const URL = "http://i10b110.p.ssafy.io/";

  const handleConnect = () => {
    const eventSource = new EventSource(
      URL + `/api/notifications?userId=${userId}`
      // { withCredentials: true }
      // 연결 요청시 헤더에 JWT를 보내야 한다면,
      // EventSource는 헤더 전달 지원 X -> event-source-polyfill 사용해야 함
    );

    // 연결 성공
    eventSource.onopen = (event) => {
      dispatch(notificationAction.connect());
      console.log("Event Opened : ", event);
    };

    // 연결 실패
    eventSource.onerror = (err) => {
      dispatch(notificationAction.disconnect());
      console.log("Event Error : ", err);
    };

    // 이벤트 리스너
    eventSource.addEventListener("connect", (e) => {
      const { data: receivedData } = e;
      console.log("connect : ", receivedData);

      dispatch(notificationAction.addEvent(receivedData));
    });

    // 테스트용으로 작성해볼 것
    eventSource.addEventListener("notice", (e) => {
      const { data: receivedData } = e;
      console.log("notice : ", receivedData);

      dispatch(notificationAction.addEvent(receivedData));
    });
  };

  const handleTest = () => {
    // 내 글에 직접 댓글 달아도 알림이 온다면,
    // 1. 내가 쓴 글 목록 얻기 : GET /api/member/articles
    // 2. 첫번째 글에 테스트 댓글 작성 : POST 요청 /api/articles/{articleId}/comments
    // 3. 알림이 오는지 테스트
  };

  // useEffect(() => {
  //   eventSource.onmessage = (e) => {
  //     const eventData = JSON.parse(e.data);
  //     setEvents((prevEvents) => [...prevEvents, eventData]);
  //     showNotification(eventData.message); // 알림 표시
  //   };

  //   const showNotification = () => {
  //     // 알림 로직
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // });

  return (
    <div>
      <button onClick={handleConnect}>connect 요청</button>
      <button onClick={handleTest}>알림 테스트</button>
      <div>
        <h4>Test</h4>
        <div>연결 여부 : {listen}</div>
        <div>이벤트 리스트 : {noticeList}</div>
      </div>
    </div>
  );
};

export default Event;
