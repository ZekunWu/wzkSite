import React from 'react';
import { Dropdown, Menu } from '@alifd/next';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';
import Img1 from '@/img/wzk.png';
import Img2 from '@/img/component.png';
import Img3 from '@/img/effect.png';
import Img4 from '@/img/blog.png';

function BasicHeader({ children }: {children: React.ReactNode}) {
  const history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={() => history.push('/editor')}>
          CodeMirror
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.Basic}>
      <div className={history.location.pathname === '/' ? styles.header : styles.header1}> {/* 只有在首页的时候header作为半透明 */}
        <div className={styles.avatarArea} onClick={() => history.push('')}>
          <img className={styles.avatar} src={Img1} alt="wzk" />
          <div className={styles.avatarText}>Wzk</div>
        </div>
        <div className={styles.navigation}>
          <Dropdown
            trigger={
              <div className={styles.navItem}>
                <img className={styles.navIcon} src={Img2} alt="" />
                <div className={styles.navText}>组件</div>
              </div>
          }
            triggerType={['click', 'hover']}
          >
            {menu}
          </Dropdown>
          <div className={styles.navItem} onClick={() => history.push('/effect')}>
            <img className={styles.navIcon} src={Img3} alt="" />
            <div className={styles.navText}>特效</div>
          </div>
          <div className={styles.navItem} onClick={() => history.push('/blogList')}>
            <img className={styles.navIcon} src={Img4} alt="" />
            <div className={styles.navText}>博客</div>
          </div>
        </div>
      </div>
      <div className={styles.child}>{children}</div>
    </div>
  );
}

export default BasicHeader;
