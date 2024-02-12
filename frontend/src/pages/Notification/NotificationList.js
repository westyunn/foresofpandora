import NotificationItem from "./NotificationItem";

import style from "./NotificationList.module.css";

const NotificationList = () => {
  return (
    <div className={`${style.container}`}>
      <NotificationItem />
    </div>
  );
};

export default NotificationList;
