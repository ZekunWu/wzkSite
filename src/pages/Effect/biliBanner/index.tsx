import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import Img1 from '@/img/bg1.png';
import Img2 from '@/img/bg2.png';
import Img3 from '@/img/bg3.png';
import Img4 from '@/img/bg4.png';
import Img5 from '@/img/bg5.png';
import Img6 from '@/img/bg6.png';

function BiliBanner() {
  const [imgArray] = useState([Img1, Img2, Img3, Img4, Img5, Img6]);
  const [initialX, setInitialX] = useState<number | null>(null);
  const getEle = (str: string): HTMLElement => {
    return document.getElementById(`banner${ str}`) as HTMLElement;
  };
  const xRef = useRef<number | null>();
  xRef.current = initialX;
  useEffect(() => {
    getEle('').addEventListener('mousemove', (e) => {
      if (!xRef.current) {
        setInitialX(e.offsetX);
        return;
      }
      const deltaX = e.offsetX - xRef.current;
      getEle('1').style.filter = `blur(${deltaX / window.innerWidth * 10}px)`;
      getEle('4').style.filter = `blur(${Math.abs(5 - deltaX / window.innerWidth * 20)}px)`;
      getEle('4').style.transform = `translate(${deltaX / 10}px)`;
      getEle('2').style.transform = `translate(${deltaX / 12}px)`;
      getEle('3').style.transform = `translate(${deltaX / 14}px)`;
      getEle('5').style.transform = `translate(${deltaX / 16}px)`;
    });
    getEle('').addEventListener('mouseout', () => {
      setInitialX(null);
      getEle('0').style.filter = 'blur(4px)';
      getEle('1').style.filter = 'blur(0px)';
      getEle('2').style.filter = 'blur(1px)';
      getEle('3').style.filter = 'blur(4px)';
      getEle('4').style.filter = 'blur(5px)';
      getEle('5').style.filter = 'blur(6px)';
      getEle('4').style.transform = 'translate(0px)';
      getEle('2').style.transform = 'translate(0px)';
      getEle('3').style.transform = 'translate(0px)';
      getEle('5').style.transform = 'translate(0px)';
    });
    return () => {};
  }, []);
  return (
    <div className={styles.banner} id="banner">
      {imgArray.map((value, index) =>
        (<div className={styles[`bannerItem${ index}`]} key={index} id={`banner${index}`}>
          <img style={{ height: '100%', width: 'auto' }} src={value} alt={String(index)} />
        </div>))}
    </div>
  );
}

export default BiliBanner;
