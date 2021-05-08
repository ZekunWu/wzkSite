import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Img1 from '/src/img/remChild.jpg';
import Img2 from '@/img/aimiliya.jpg';
import Img3 from '@/img/rem1.jpg';
import Img4 from '@/img/486.png';

function Home() {
  const [imgArray, setImgArray] = useState([Img1, Img2, Img3, Img4]);
  useEffect(() => {
    const timer: number = window.setInterval(() => {
      const arr: string[] = imgArray;
      arr.push(arr.shift() as string);
      setImgArray([...arr]);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={styles.homePage}>
      <div className={styles.background}>
        <div className={styles.backgroundList}>
          {imgArray.map((item, index) =>
            (<img
              key={String(index)}
              className={index === imgArray.length - 1 ? styles.backgroundItemCur : styles.backgroundItem}
              src={item}
              alt=""
            />))}
        </div>
      </div>
    </div>
  );
}

export default Home;
