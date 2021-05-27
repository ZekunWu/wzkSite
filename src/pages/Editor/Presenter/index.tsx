/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef, Fragment, useEffect, useContext } from 'react';
import ReactMirror from '@/components/ReactMirror';
import CodeMirror from 'codemirror';
import { Button, Tab } from '@alifd/next';
import { Slider } from '@material-ui/core';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/addon/hint/show-hint';
import styles from './index.module.scss';
import { Actions } from '../index';
import playImg from '@/img/play.png';
import stopImg from '@/img/stop.png';
import resetImg from '@/img/reset.png';
import { logger } from 'ice';

interface actionType {
  type: string;
  value: object;
}
interface actionsType {
  time: number;
  selections: object[];
  actions: actionType[];
}

function Presenter() {
  const [codemirror, setCodemirror] = useState<CodeMirror.EditorFromTextArea>(); // 编辑器实例
  const [actions, setActions] = useState<actionsType[]>([]); // 行为记录
  const [tabKey, setTabKey] = useState<number>(1); // tab值
  const [isPlay, setIsPlay] = useState<boolean>(false); // 播放状态
  const [curTime, setCurTime] = useState<number>(0); // 当前播放时间
  const [maxTime, setMaxTime] = useState<number>(100); // 行为时长
  const [curIndex, setCurIndex] = useState<number>(0); // 当前播放记录index
  const [timer, setTimer] = useState<NodeJS.Timeout>(); // 定时器
  const timeRef = useRef<number>();
  const indexRef = useRef<number>();
  timeRef.current = curTime;
  indexRef.current = curIndex;
  const { actionList } = useContext(Actions);

  const getActions = function () { // 获取行为信息
    setActions(actionList);
    setMaxTime(actionList[actionList.length - 1].time - actionList[0].time);
    setTabKey(2);
    handleOnReset();
  };

  const handleOnSlide = function (event: React.ChangeEvent<{}>, value: number): void { // 对于调整进度条的处理
    if (isPlay) clearTimeout(timer);
    if (value > timeRef.current) {
      let index = indexRef.current;
      while (value >= actions[index].time - actions[0].time) {
        setValue(index);
        if (index >= actions.length - 1) break;
        index++;
      }
      setCurIndex(index);
    } else if (value < timeRef.current) {
      codemirror.setValue('');
      let index = 0;
      while (value >= actions[index].time - actions[0].time && value !== 0) {
        setValue(index);
        if (index >= actions.length - 1) break;
        index++;
      }
      setCurIndex(index);
    }
    setCurTime(value);
  };

  const handleOnAfterChange = function (): void { // 松开鼠标后的处理
    if (isPlay && timeRef.current < actions[actions.length - 1].time - actions[0].time) {
      setTimer(setTimeout(() => {
        start();
        setCurTime((cur) => Math.min(cur + 10, maxTime));
      }, 10));
    }
  };

  const start = function (): void { // 播放行为控制
    if (timeRef.current >= actions[indexRef.current].time - actions[0].time) {
      setValue(indexRef.current);
      setCurIndex(indexRef.current + 1);
    }
    if (timeRef.current < actions[actions.length - 1].time - actions[0].time) {
      setTimer(setTimeout(() => {
        start();
        setCurTime((cur) => Math.min(cur + 10, maxTime));
      }, 10));
    } else {
      setIsPlay(false);
    }
  };

  const setValue = function (index: number): void { // 编辑器内容控制
    actions[index].actions.forEach((item) => {
      switch (item.type) {
        case 'value':
          codemirror.makeChange(codemirror.doc, item.value);
          break;
        case 'cursor':
          codemirror.focus();
          codemirror.setCursor(item.value);
          break;
        default: break;
      }
    });
    if (actions[index].selections) codemirror.setSelection(...actions[index].selections);
  };

  const handleOnPlay = function (): void { // 播放、暂停
    if (actions.length === 0) return;
    if (isPlay) {
      clearTimeout(timer);
      // console.log('stop!');
    } else {
      start();
    }
    setIsPlay(!isPlay);
  };

  const handleOnReset = function (): void { // 停止 && 清空内容
    codemirror.setValue('');
    setCurIndex(0);
    setCurTime(0);
    setIsPlay(false);
    clearTimeout(timer);
  };

  return (
    <Fragment>
      <div className={styles.cover} />
      <ReactMirror
        refMirror={(editor) => setCodemirror(editor)}
        value={''}
        options={{
          // lockedLines:[],
          // lockAble: true,
          mode: 'text/x-java',
          theme: 'monokai',
          lineNumbers: true,
          indentUnit: 4,
          hintOptions: { completeSingle: false },
          readOnly: true,
          // inputStyle: 'contenteditable',
        }}
        width="100%"
        height="300px"
      />
      <Tab
        activeKey={tabKey}
        className={styles.tab}
        navClassName={styles.tabNav}
        contentClassName={styles.tabContent} // height百分比计算需要父级的确定高度，所以层层下传高度值，达到控制navContent的高度控制已经超出部分加滚动条
      >
        <Tab.Item title="行为控制" key="1" onClick={() => setTabKey(1)}>
          <div>内容控制</div>
          <Button onClick={handleOnReset}>清空内容</Button>
          <Button onClick={getActions} disabled={actionList.length === 0}>行为获取</Button>
          <div>播放控制：</div>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <Slider
              style={{ margin: '0 10px', width: 'calc(100% - 20px)' }}
              value={curTime}
              max={maxTime}
              disabled={actions.length === 0}
              onChange={handleOnSlide}
              onChangeCommitted={handleOnAfterChange}
            />
          </div>
          <div className={styles.playArea}>
            <img className={styles.playButton} onClick={handleOnPlay} src={isPlay ? stopImg : playImg} />
            <img className={styles.playButton} onClick={handleOnReset} src={resetImg} />
          </div>
        </Tab.Item>
        <Tab.Item title="行为记录" key="2" onClick={() => setTabKey(2)}>
          <div>{actions.length ? JSON.stringify(actions) : ''}</div>
        </Tab.Item>
      </Tab>
    </Fragment>
  );
}

export default Presenter;
