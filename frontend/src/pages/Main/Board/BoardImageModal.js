import { useEffect, useState, useRef } from "react";
import { getImgList } from "./api";
import styles from "./BoardImage.module.css";
import prev from "../../../assets/prev.png";
import next from "../../../assets/next.png";
import close from "../../../assets/close.png";

const BoardImage = ({ item, setImgModalOpen, containerWidth, style }) => {
  // 이미지 여러개일 경우 무한 슬라이드 가능하게...일단 슬라이드만 가능하게 하자
  const slideRef = useRef(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  // 슬라이드 한 장의 크기는 boardmain 크기 배경에 맞추고 거기에 사진 집어넣기
  const slideRange = currentImgIdx * containerWidth;
  // console.log(containerWidth);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${slideRange}px)`;
      // 슬라이드 컨테이너의 너비를 이미지 개수에 맞게 설정
      slideRef.current.style.width = `${
        containerWidth * item.imageList.length
      }px`;
    }
  }, [currentImgIdx, slideRange, item.imageList.length]);

  const handleNextSlide = () => {
    if (currentImgIdx < item.imageList.length - 1) {
      setCurrentImgIdx(currentImgIdx + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentImgIdx > 0) {
      setCurrentImgIdx(currentImgIdx - 1);
    }
  };

  return (
    <div className={`${styles.background}`} style={style}>
      <button
        onClick={() => setImgModalOpen(false)}
        className={`${styles.closeBtn} ${styles.slideBtn}`}
      >
        <img
          src={close}
          alt="Close"
          style={{ width: "30px", height: " 30px" }}
        />
      </button>
      {item.imageList.length > 1 && (
        <button
          onClick={handlePrevSlide}
          className={`${styles.prevBtn} ${styles.slideBtn}`}
        >
          <div className={styles.imgWrapper}>
            <img
              src={prev}
              alt="Previous"
              style={{ width: "19px", height: "30px" }}
            />
          </div>
        </button>
      )}
      <div
        className={styles.slideContainer}
        ref={slideRef}
        style={{ transform: `translateX(-${currentImgIdx * style}px)` }}
      >
        {item.imageList.map((img, index) => (
          // 각 이미지를 slideWrapper 대신 직접 slideContainer 안에 배치
          <img src={img} className={styles.img} key={index} style={style} />
        ))}
      </div>
      {item.imageList.length > 1 && (
        <button
          onClick={handleNextSlide}
          className={`${styles.nextBtn} ${styles.slideBtn}`}
        >
          <img
            src={next}
            alt="Next"
            style={{ width: "19px", height: "30px" }}
          />
        </button>
      )}
    </div>
  );
};

export default BoardImage;
