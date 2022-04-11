import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.beian}>
        <a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备19011492号-1</a>
      </div>
    </div>
  );
}

export default Home;
