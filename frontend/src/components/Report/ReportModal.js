import styles from "./ReportModal.module.css";
import report from "../../assets/report.png";
import no from "../../assets/no.png";
import { reportArticle, reportComment, reportReply } from "./api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const ReporteModal = ({ setEtcModalOpen, setOpenReportModal, item, type }) => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleReport = () => {
    if (content) {
      if (type === "article") {
        reportArticle(item.id, content);
      } else if (type === "commentId") {
        reportComment(item.commentId, content);
      } else if (type === "reply") {
        reportReply(item.commentReplyId, content);
      }

      setOpenReportModal(false);
      setEtcModalOpen(false);

      navigate("/");
    } else {
      window.alert("신고 이유를 작성해 주세요");
    }
  };
  const reportContentHandler = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content}`}>해당 글을 신고하시겠습니까?</div>
      <input
        className={`${styles.reportInput}`}
        onChange={reportContentHandler}
        placeholder="  신고 이유를 작성해 주세요"
      />
      <div className={`${styles.btnC}`}>
        <button className={`${styles.dBtn}`} onClick={handleReport}>
          <img
            src={report}
            alt="신고"
            style={{ width: "68px", height: "28px" }}
          />
        </button>
        <button
          className={`${styles.dBtn}`}
          onClick={() => setOpenReportModal(false)}
        >
          <img src={no} alt="취소" style={{ width: "68px", height: "28px" }} />
        </button>
      </div>
    </div>
  );
};

export default ReporteModal;
