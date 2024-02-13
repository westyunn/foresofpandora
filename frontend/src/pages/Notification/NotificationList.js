import { useSelector } from "react-redux";

import NotificationItem from "./NotificationItem";
import style from "./NotificationList.module.css";

const NotificationList = () => {
  const noticeList = useSelector((state) => state.notification.noticeList);

  const testList = [
    {
      event: "comment",
      myContent: "test",
      content: "test2",
      time: 3,
    },
    {},
  ];

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
