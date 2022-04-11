import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Img1 from '/src/img/remChild.jpg';
import Img2 from '@/img/saber4.png';
import Img3 from '@/img/486.png';
import Img4 from '@/img/saber3.png';
import Img5 from '@/img/saber2.png';

function BackgroundWall() {
  const [imgArray] = useState([Img5, Img1, Img2, Img3, Img4]);
  const [curImg, setCurImg] = useState(0);
  useEffect(() => {
    const animated = document.getElementById('change');
    animated.addEventListener('animationiteration', () => {
      setCurImg((cur) => (cur === 4 ? 0 : cur + 1));
    });
  }, []);
  return (
    <div className={styles.backgroundWallPage}>
      <div className={styles.background}>
        <div className={styles.backgroundList}>
          <img
            className={styles.backgroundItemCur}
            id="change"
            src={imgArray[curImg]}
            alt=""
          />
        </div>
        {/* 图片预加载，避免加载图片的时延导致动画和图片切换不同步 */}
        <div style={{ height: '0', width: '0', overflow: 'hidden' }}>
          {imgArray.map((item, index) =>
            (<img key={String(index)} src={item} />))}
        </div>
      </div>
    </div>
  );
}

export default BackgroundWall;
