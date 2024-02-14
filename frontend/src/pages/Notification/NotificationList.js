import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import NotificationItem from "./NotificationItem";
import style from "./NotificationList.module.css";

const NotificationList = () => {
  const page = 0; // test - 수정 필요

  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    getNoticeList();
  }, [page]);

  // axios : 알림 목록 조회
  const getNoticeList = () => {
    axios
      .get(`/api/member/alarm`, {
        params: {
          page,
        },
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
      .then((response) => {
        setNoticeList(response.data.data.content);
      })
      .catch((err) => {
        console.log("알림 불러오기 실패 : ", err);
      });
  };

  return (
    <div className={`${style.container}`}>
      {noticeList.map((it) => (
        <NotificationItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default NotificationList;
