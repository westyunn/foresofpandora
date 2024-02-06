import styles from "./EtcModal.module.css";
import { useSelector } from "react-redux";
import close from "../../../assets/modalClose.png";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";

const EtcModal = ({ item, setEtcModalOpen }) => {
  const navigate = useNavigate();

  const userId = useSelector((store) => store.user.data.id); // 멤버아이디랑 비교해서 맞으면 수정할 수 있는 모달 띄우기
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  console.log(userId, item.memberId); // 값 로깅하여 확인
  console.log(typeof userId, typeof item.memberId); // 타입도 확인

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleUpdate = () => {
    navigate("/board/update", { state: { item: item, temp: false } });
  };
  if (userId === item.memberId) {
    return (
      <>
        {openDeleteModal ? (
          <DeleteModal item={item} setOpenDeleteModal={setOpenDeleteModal} />
        ) : (
          <div className={styles.etcContainer}>
            <div>
              <button
                onClick={() => setEtcModalOpen(false)}
                className={`${styles.modalBtn} ${styles.closeBtn2}  ${styles.cc}`}
              >
                <img
                  style={{ width: "29px", height: "29px" }}
                  src={close}
                  alt="모달 닫음"
                />
              </button>
            </div>
            <button
              className={`${styles.boardPut} ${styles.boardCommon} ${styles.modalBtn}`}
              onClick={handleUpdate}
            >
              게시글 수정하기
            </button>
            <hr />
            <button
              className={`${styles.boardDelete} ${styles.boardCommon}  ${styles.modalBtn}`}
              onClick={handleDeleteModal}
            >
              게시글 삭제하기
            </button>
          </div>
        )}
      </>
    );
  } else {
    // 아닐시 신고버튼만
    return (
      <div className={`${styles.etcContainer} ${styles.notMe}`}>
        <div>
          <button
            onClick={() => setEtcModalOpen(false)}
            className={`${styles.closedBtn} ${styles.modalBtn}`}
          >
            <img
              style={{ width: "29px", height: "29px" }}
              src={close}
              alt="모달 닫음"
            />
          </button>
        </div>
        <div className={`${styles.Declaration} ${styles.boardCommon}`}>
          게시글 신고하기
        </div>
      </div>
    );
  }
};
export default EtcModal;
