import { logger } from 'ice';
import React, { useRef, useState, CSSProperties, useEffect, FC } from 'react';

export interface UnlimitedListProps {
  listArr: number[];
  size: number;
  bufferSize: number;
  itemHeight: number;
}

const UnlimitedList: FC<UnlimitedListProps> = ({ listArr, size, bufferSize, itemHeight }) => {
  const [list, setList] = useState<number[]>();
  const [localY, setLocalY] = useState<number>(0);
  const ref1 = useRef<HTMLDivElement>(null);
  const [bufferTop, setBufferTop] = useState<number>(0);
  const [bufferBottom, setBufferBottom] = useState<number>(bufferSize);
  const listsStyle: CSSProperties = {
    position: 'relative',
    height: '200px',
    overflow: 'auto',
    margin: '10px 40%',
  };
  const contentStyle = {
    height: `${itemHeight * listArr?.length}px`,
  };
  const ulStyle: CSSProperties = {
    position: 'absolute',
    top: `-${itemHeight * bufferTop}px`,
    height: `${itemHeight * (size + bufferTop + bufferBottom)}px`,
    width: '100%',
    transform: `translateY(${localY}px)`,
  };
  const listStyle = {
    height: `${itemHeight}px`,
    width: '100%',
    border: '1px solid grey',
  };
  useEffect(() => {
    setList(listArr.slice(0, size));
  }, []);
  const handleOnScroll = () => {
    if (ref1 && ref1.current) { // 缺个判断不超过1000个
      let first = Math.floor(ref1.current.scrollTop / itemHeight); let top = bufferTop; let
        bottom = bufferBottom;
      console.log('first: ', first);
      if (bufferTop === 0 && first > 0) {
        setBufferTop(bufferSize);
        top = bufferSize;
      }
      if (first >= listArr.length - size) {
        setBufferBottom(0);
        bottom = 0;
        first = listArr.length - size;
      } else if (bottom === 0) { // 到底后bufferBottom置零后上滑恢复
        setBufferBottom(bufferSize);
        bottom = bufferSize;
      }
      if (Math.abs(ref1.current.scrollTop - localY) > itemHeight * bufferSize) {
        setList(Array(size + top + bottom).fill(first).map((item, index) => item + index - 1));
        setLocalY(itemHeight * first); // 验证得知，scrollTop的余数部分会由scroll调整位置，跟translateY无关
      }
    }
  };
  return (
    <div ref={ref1} style={listsStyle} onScroll={handleOnScroll}>
      <div style={contentStyle}>
        <ul style={ulStyle}>
          {list?.map((item, index) =>
            <li style={listStyle} key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default UnlimitedList;
