import no from "../../assets/no.png";
import report from "../../assets/report.png";
import styles from "./ReportModal.module.css";

import { reportArticle, reportComment, reportReply } from "./api";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Report = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const itemId = state.itemId;
  const type = state.type;
  const itemContent = state.content;
  const img = state.img;
  // id articleId, itemId는 commentId
  const id = state.articleId;
  const reply = state.commentReplyId;

  const handleReport = () => {
    if (content) {
      if (type === "article") {
        reportArticle(itemId, content);
      } else if (type === "comment") {
        reportComment(itemId, content, id);
      } else if (type === "reply") {
        reportReply(id, content, itemId, reply);
      }

      navigate(-1);
    } else {
      window.alert("신고 이유를 작성해 주세요");
    }
  };
  const reportContentHandler = (e) => {
    setContent(e.target.value);
  };
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.board_container}>
        <div className={styles.container}>
          <p className={styles.reportTitle}>해당 글을 신고하시겠습니까?</p>
          {img && (
            <div className={styles.article}>
              <img className={styles.articleImg} src={img} />
              <div className={styles.articleSort}>
                <div className={styles.articleText}>
                  <p className={styles.content}>{itemContent}</p>
                </div>
              </div>
            </div>
          )}
          {!img && <p className={styles.itemContent}>내용 : "{itemContent}"</p>}
          <input
            className={`${styles.reportInput}`}
            onChange={reportContentHandler}
            placeholder="  신고 이유를 작성해 주세요"
          />
          <div className={`${styles.btnC}`}>
            <button className={`${styles.dBtn}`} onClick={handleReport}>
              <img
                className={styles.eBtn}
                src={report}
                alt="신고"
                style={{ width: "68px", height: "28px" }}
              />
            </button>
            <button className={`${styles.dBtn}`} onClick={handleClose}>
              <img
                className={styles.eBtn}
                src={no}
                alt="취소"
                style={{ width: "68px", height: "28px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Report;
