import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Img1 from '/src/img/remChild.jpg';
import Img2 from '@/img/saber4.png';
import Img3 from '@/img/486.png';
import Img4 from '@/img/saber3.png';
import Img5 from '@/img/saber2.png';

function Home() {
  const [imgArray, setImgArray] = useState([Img1, Img2, Img3, Img4, Img5]);
  useEffect(() => {
    const animated = document.getElementById('change');
    animated.addEventListener('animationiteration', () => {
      const arr: string[] = imgArray;
      arr.push(arr.shift() as string);
      setImgArray([...arr]);
    });
  }, []);
  return (
    <div className={styles.homePage}>
      <div className={styles.background}>
        <div className={styles.backgroundList}>
          {imgArray.map((item, index) =>
            (<img
              key={String(index)}
              className={index === imgArray.length - 1 ? styles.backgroundItemCur : styles.backgroundItem}
              id={index === imgArray.length - 1 ? 'change' : 'unchange'}
              src={item}
              alt=""
            />))}
        </div>
      </div>
    </div>
  );
}

export default Home;
