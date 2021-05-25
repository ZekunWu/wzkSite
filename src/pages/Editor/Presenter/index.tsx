import React, { useState, useRef, Fragment, useEffect, useContext } from 'react';
import ReactMirror from '@/components/ReactMirror';
import CodeMirror from 'codemirror';
import { Button, Tab } from '@alifd/next';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/addon/hint/show-hint';
import styles from './index.module.scss';
import { Actions } from '../index';
import { logger } from 'ice';

interface actionsType {
  time: number;
  selections: object[];
  actions: object[];
}

function Presenter() {
  const [codemirror, setCodemirror] = useState<CodeMirror.EditorFromTextArea>();
  const [actions, setActions] = useState<actionsType[]>([]);
  const [tabKey, setTabKey] = useState<number>(1);
  const { actionList } = useContext(Actions);
  const getActions = function () {
    setActions(actionList);
    setTabKey(2);
  };
  const init = function () {
    codemirror.setValue('');
  };
  const play = function () {
    const initActions = JSON.parse(JSON.stringify(actions)); // 深拷贝
    initActions.forEach((item) => {
      setTimeout(() => {
        item.actions.forEach((item1) => {
          logger.info(item1);
          switch (item1.type) {
            case 'value':
              codemirror.makeChange(codemirror.doc, item1.value);
              break;
            case 'cursor':
              codemirror.focus();
              codemirror.setCursor(item1.value);
              break;
            default: break;
          }
        });
        if (item.selections) codemirror.setSelection(...item.selections);
      }, item.time - actions[0].time);
    });
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
          <Button onClick={init}>清空内容</Button>
          <Button onClick={getActions}>行为获取</Button>
          <div>播放控制：</div>
          <Button disabled={!actions.length} onClick={play}>开始播放</Button>
        </Tab.Item>
        <Tab.Item title="行为记录" key="2" onClick={() => setTabKey(2)}>
          <div>{actions.length ? JSON.stringify(actions) : ''}</div>
        </Tab.Item>
      </Tab>
    </Fragment>
  );
}

export default Presenter;
