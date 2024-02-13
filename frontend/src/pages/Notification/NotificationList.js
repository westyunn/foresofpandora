import { useSelector } from "react-redux";

import NotificationItem from "./NotificationItem";
import style from "./NotificationList.module.css";

const NotificationList = () => {
  const noticeList = useSelector((state) => state.notification.noticeList);

  const testList = [
    {
      id: 1,
      event: "comment",
      myContent: "test",
      content: "test2",
      time: 3,
    },
    {
      id: 2,
      event: "like",
      myContent: "test",
      content: "test2",
      time: 5,
    },
  ];

  return (
    <div className={`${style.container}`}>
      {testList.map((it) => (
        <NotificationItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default NotificationList;
