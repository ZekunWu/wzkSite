import React from 'react';
import styles from './index.module.scss';
import BiliBanner from './biliBanner';
import UnlimitedList from './unlimitedList';

function Effect() {
  return (
    <div className={styles.effectPage}>
      <div className={styles.header}>实现bilibili的banner效果：</div>
      <BiliBanner />
      <div className={styles.header}>实现长列表无限滚动：</div>
      <UnlimitedList listArr={Array(10000).fill(0).map((item, index) => index + 1)} size={5} bufferSize={2} itemHeight={40} />
      <div className={styles.header}>实现动态变色字体：</div>
      <div className={styles.colorfulArea}>
        <div className={styles.colorful}>生命中的美好光芒，靠的都是坚持</div>
      </div>
    </div>
  );
}

export default Effect;
