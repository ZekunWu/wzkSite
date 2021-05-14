import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import { logger } from 'ice';

const Effect: FC = () => {
  const [imgArray] = useState(new Array(6).fill(0));
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
      logger.info(deltaX);
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
    <div className={styles.effectPage}>
      <div className={styles.banner} id="banner">
        {imgArray.map((value, index) =>
          (<div className={styles[`bannerItem${ index}`]} key={index} id={`banner${index}`}>
            <img style={{ height: '100%', width: 'auto' }} src={`/src/img/bg${index + 1}.png`} alt={String(index)} />
          </div>))}
      </div>
    </div>
  );
};

export default Effect;
