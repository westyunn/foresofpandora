import styles from "./BoardItem.module.css";
import { useRef, useState } from "react";
const BoardItem = ({ item }) => {
  return (
    <div className={styles.board_container}>
      <div>
        <div>{item.id}</div>
        <div>{item.content}</div>
      </div>
    </div>
  );
};
export default BoardItem;
