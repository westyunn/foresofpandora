import React, { useEffect, useState } from "react";

import NotificationList from "./NotificationList";
import style from "./Notification.module.css";

const Notification = () => {
  return (
    <div className={`${style.container}`}>
      <h2>알림</h2>
      <NotificationList />
    </div>
  );
};

export default Notification;
