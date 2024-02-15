import React, { useEffect, useState } from "react";

import NotificationList from "./NotificationList";
import style from "./Notification.module.css";
import Event from "./Event";

const Notification = () => {
  return (
    <div className={`${style.container}`}>
      <h2>알림</h2>
      <NotificationList />
      {/* <Event /> */}
    </div>
  );
};

export default Notification;
