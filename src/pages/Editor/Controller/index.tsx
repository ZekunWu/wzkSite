/* eslint-disable react/jsx-no-bind */
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

function Controller() {
  const [model, setModel] = useState('');
  const [curAction, setCurAction] = useState<any[]>([]);
  const [readOnly, setReadOnly] = useState(false);
  const [codemirror, setCodemirror] = useState<CodeMirror.EditorFromTextArea>();
  const { actionList, setActionList } = useContext(Actions);
  const handleOnKeypress = function (editor: CodeMirror.EditorFromTextArea): void {
    // logger.info('keypress', editor);
  };
  const handleOnClick = function (editor: CodeMirror.EditorFromTextArea): void {
    // logger.info('mousedown', editor);
  };
  const handleOnCursor = function (editor: CodeMirror.EditorFromTextArea): void {
    logger.info('cursor');
    const selection = editor.getSelection('position')[0];
    setCurAction((cur) => {
      logger.info(cur);
      setTimeout(() => {
        setActionList((act) =>
          [...act,
            {
              time: Date.now(),
              selections: JSON.stringify(selection.from()) === JSON.stringify(selection.to()) ? '' : [selection.from(), selection.to()],
              actions: [...cur, { type: 'cursor', value: editor.doc.getCursor() }],
            },
          ]);
      }, 0);
      return [];
    });
  };
  const handleOnChange = function (editor: CodeMirror.EditorFromTextArea, changeObj: CodeMirror.EditorChange): void {
    setCurAction((cur) => [...cur, { type: 'value', value: changeObj }]);
  };

  const refreshAction = function () {
    codemirror.setValue('');
    setTimeout(() => setActionList([]), 0);
  };

  const setEditor = function (): void {
    if (codemirror) codemirror.setValue('just for test!!!!!!!');
  };

  const setreadOnly = function (): void {
    setReadOnly(!readOnly);
  };

  const push = function (num: number): void {
    if (codemirror) {
      codemirror.makeChange(codemirror.doc, {
        from: { line: 0, ch: 0 },
        origin: '+input',
        removed: [''],
        text: Array(Array(num).fill('f').join('')),
        to: { line: 0, ch: num },
      });
    }
  };

  const setCursor = function (): void {
    // this.codemirror.editor = this.state.saveEditor
    if (codemirror) {
      codemirror.focus();
      codemirror.setCursor({ line: 0, ch: 1 });
    }
  };

  const del = function (num: number): void {
    if (codemirror) {
      codemirror.makeChange(codemirror.doc, {
        from: { line: 0, ch: 0 },
        origin: '+delete',
        removed: Array(Array(num).fill('f').join('')),
        text: [''],
        to: { line: 0, ch: num },
      });
    }
  };

  const select = function (): void {
    if (codemirror) codemirror.setSelection({ line: 0, ch: 13 }, { line: 0, ch: 20 });
  };

  const deleteSelect = function (): void {
    if (codemirror) codemirror.replaceSelection('');
  };

  const moveSelect = function (): void {
    if (codemirror) {
      codemirror.makeChange(codemirror.doc, {
        from: { line: 0, ch: 13 },
        origin: '+delete',
        removed: ['!!!!!!!'],
        text: [''],
        to: { line: 0, ch: 20 },
      });
      codemirror.makeChange(codemirror.doc, {
        from: { line: 0, ch: 0 },
        origin: 'paste',
        removed: [''],
        text: ['!!!!!!!'],
        to: { line: 0, ch: 0 },
      });
    }
  };

  return (
    <Fragment>
      {readOnly && (<div className={styles.cover} />)}
      <ReactMirror
        refMirror={(editor) => setCodemirror(editor)}
        value={model}
        onMousedown={handleOnClick}
        onKeypress={handleOnKeypress}
        onCursorActivity={handleOnCursor}
        options={{
          // lockedLines:[],
          // lockAble: true,
          mode: 'text/x-java',
          theme: 'monokai',
          lineNumbers: true,
          indentUnit: 4,
          hintOptions: { completeSingle: false },
          readOnly: false, // 如果不设置为nocursor，光标会随用户点击而移动，可以考虑覆盖一层防止用户点击，但是光标的位置还得调用api操作setCursor
          // inputStyle: 'contenteditable',
        }}
        onChange={handleOnChange}
        width="100%"
        height="300px"
      />
      <Tab
        className={styles.tab}
        navClassName={styles.tabNav}
        contentClassName={styles.tabContent} // height百分比计算需要父级的确定高度，所以层层下传高度值，达到控制navContent的高度控制已经超出部分加滚动条
      >
        <Tab.Item title="控制测试" key="1">
          <div>内容控制：</div>
          <Button onClick={setEditor}>初始内容</Button>
          <div>操作性控制：</div>
          <Button onClick={setreadOnly}>不可操作</Button>
          <div>光标控制：</div>
          <Button onClick={setCursor}>控制光标</Button>
          <div>增减删改：</div>
          <Button onClick={() => push(1)}>输入单个</Button>
          <Button onClick={() => push(2)}>输入多个</Button>
          <Button onClick={() => del(1)}>删除单个</Button>
          <Button onClick={() => del(2)}>删除多个</Button>
          <div>选中操作：</div>
          <Button onClick={select}>选中</Button>
          <Button onClick={deleteSelect}>删除选中</Button>
          <Button onClick={moveSelect}>移动选中</Button>
        </Tab.Item>
        <Tab.Item title="行为控制" key="2">
          <Button onClick={refreshAction}>清空内容</Button>
        </Tab.Item>
        <Tab.Item title="行为记录" key="3">
          <div>{actionList.length ? JSON.stringify(actionList) : ''}</div>
        </Tab.Item>
      </Tab>
    </Fragment>
  );
}

export default Controller;

