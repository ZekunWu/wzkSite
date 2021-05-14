import React, { useEffect, useState } from 'react';
import Http from '@/utils/fetch';
import { List, Avatar, Box, Button, Divider, Menu, Search, Nav, Shell, Radio } from '@alifd/next';
import styles from './index.module.scss';
import { useHistory } from 'ice';

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}

interface BlogItem {
  id: number;
  name: string;
  content: string;
  imgUrl: string;
  date: string;
}

const getDevice: IGetDevice = (width) => {
  const isPhone =
    typeof navigator !== 'undefined' &&
    navigator &&
    navigator.userAgent.match(/phone/gi);

  if (width < 680 || isPhone) {
    return 'phone';
  } else if (width < 1280 && width > 680) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

function BlogList() {
  const [blogs, setBlogs] = useState<Array<BlogItem>>([]);
  const history = useHistory();
  useEffect(() => {
    Http.get('/blogs').then((res) => {
      setBlogs(res);
    });
  }, []);

  const [device, setDevice] = useState(getDevice(NaN));

  const toBlog = function(id: number): void {
    history.push('/blog/' + id)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth =
        (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }
  return (
    <div className={styles.blogListPage}>
      <Shell className={styles.iframeHack} device={device} style={{ border: '1px solid #eee' }}>
        <Shell.Branding>
          <span style={{ marginLeft: 10 }}>个人博客</span>
        </Shell.Branding>
        <Shell.Navigation direction="hoz">
          <Search key="2" shape="simple" type="dark" placeholder="Search" style={{ width: '200px' }} />
        </Shell.Navigation>
        <Shell.Navigation>
          <Nav embeddable aria-label="global navigation">
            <Nav.Item icon="favorites-filling">Javascript</Nav.Item>
            <Nav.Item icon="favorites-filling">React</Nav.Item>
          </Nav>
        </Shell.Navigation>

        <Shell.Content>
          <div style={{ background: '#fff' }}>
            <List>
              {blogs.map(item => 
                <List.Item
                  key={item.name}
                  onClick={() => toBlog(item.id)}
                  media={<img width="161" height="108" src={item.imgUrl} />}
                  title={item.name}
                >
                  <p>{item.content.slice(0, 80)+'...'}</p>
                  <div>{item.date + '更新'}</div>
                </List.Item>
              )}
            </List>
          </div>
        </Shell.Content>
      </Shell>
    </div>
  );
}

export default BlogList;
