import { useEffect, useState } from "react";
import styles from "./BoardTemp.module.css";
import { deleteMyTemp, getMyTemp } from "../../../components/Board/api";

const BoardTempItem = ({ item, getBoardList, setItems }) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    setImg(
      "https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG"
    );
  });

  const originalDate = item.modifiedAt;
  const dateObject = new Date(originalDate);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;

  // 임시저장글 삭제
  const deleteTemp = async () => {
    try {
      await deleteMyTemp(item.id);
      // await getMyTemp();
      await setItems([]);

      await getBoardList();
      console.log("Temp deleted successfully");
    } catch (error) {
      console.error("Error deleting temp:", error);
    }
  };

  console.log(item);
  return (
    <div>
      <div className={styles.article}>
        <div className={styles.close}>
          <span onClick={deleteTemp}>X</span>
        </div>

        <div className={styles.tempArticle}>
          <div className={styles.itemBox}>
            <p className={styles.content}> {item.content}</p>
            <p className={styles.content}>{formattedDate}</p>
          </div>

          <div className={styles.imgBox}>
            <div className={styles.tempImgFrame}>
              <img className={styles.tempImg} src={img} />
            </div>
            <p className={styles.imgCount}>+3</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default BoardTempItem;
