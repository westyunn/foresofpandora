import { useEffect, useState, useRef } from "react";
import { getImgList } from "./api";
import styles from "./BoardImage.module.css";

const BoardImage = ({ item, setImgModalOpen }) => {
  // 이미지 여러개일 경우 무한 슬라이드 가능하게(일단 슬라이드만 가능하게 하자)
  const [imgList, setImgList] = useState([]);
  const slideRef = useRef(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const IMG_WIDTH = 200;
  const slideRange = currentImgIdx * IMG_WIDTH;

  // slide 배열 만들어주기
  // let slideArr = [beforeSlide, ...imgList, nextSlide];
  // const slideNum = slideArr.length;
  const imgArrN = imgList.length;
  // const beforeSlide = imgList[imgArrN - 1];
  // const nextSlide = imgList[0];

  const getList = () => {
    getImgList({ item, setImgList });
    console.log(imgList);
  };

  useEffect(() => {
    getList();
    if (slideRef.current) {
      // slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${slideRange}px)`;
    }
  }, [currentImgIdx, slideRange]);

  const handleNextSlide = () => {
    if (currentImgIdx < imgList.length - 1) setCurrentImgIdx(currentImgIdx + 1);
  };

  const handlePrevSlide = () => {
    if (currentImgIdx === 0) return;
    setCurrentImgIdx(currentImgIdx - 1);
  };

  return (
    <div className={styles.background}>
      <div className={styles.slideContainer} ref={slideRef}>
        {imgList.map((img, index) => (
          <div className={styles.slideWrapper} key={index}>
            <img src={img} className={styles.img} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button onClick={handlePrevSlide}>prev</button>
      <button onClick={handleNextSlide}>next</button>
      <button onClick={() => setImgModalOpen(false)}>모달 닫기</button>
    </div>
  );
};

export default BoardImage;
