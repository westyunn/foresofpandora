import { useSelector } from "react-redux";

import NotificationItem from "./NotificationItem";
import style from "./NotificationList.module.css";

const NotificationList = () => {
  const eventList = useSelector((state) => state.notification.noticeList);

  const testEventList = [{}, {}];

  // const event = "like";
  // const myContent = "집에 가고 싶다";
  // const content = "나도 집";
  // const time = "3분전";

  return (
    <div className={`${style.container}`}>
      <NotificationItem
        event="comment"
        myContent="test"
        content="test2"
        time="3"
      />
    </div>
  );
};

export default NotificationList;
