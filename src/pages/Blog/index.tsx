import React, { useEffect, useState } from 'react';
import Http from '@/utils/fetch';
import marked from 'marked';
import hljs from 'highlight.js';
import styles from './index.module.scss';
import './blog.scss';
import { useParams } from 'react-router';

interface BlogItem {
  id: number;
  name: string;
  content: string;
  imgUrl: string;
  date: string;
}

interface RouteParams {
  id: string;
}

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  pedantic: false,
  sanitize: false, // 为true时会使<br>无法识别
  smartLists: true,
  smartypants: true,
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});

function Blog() {
  const [blog, setBlog] = useState<BlogItem>();
  const { id } = useParams<RouteParams>();
  useEffect(() => {
    Http.get(`/blogs/${ id}`).then((res) => {
      setBlog(res);
    });
  }, []);
  return (
    <div className={styles.blogPage}>
      <div className={styles.header}>{blog?.name}</div>
      <div className={styles.date}>{blog?.date}</div>
      <div
        id="content"
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: marked(blog ? blog.content : ''),
        }}
      />
    </div>
  );
}

export default Blog;
