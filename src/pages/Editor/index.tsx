import React, { useState, useRef, CSSProperties, useContext, createContext } from 'react';
import { Button, Card } from '@alifd/next';
import Controller from './Controller';
import Presenter from './Presenter';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/addon/hint/show-hint';
import styles from './index.module.scss';

export const Actions = createContext(null);

function Editor() {
  const commonProps = {
    title: '控制区',
    style: {
      margin: '0',
      fontSize: '16px',
      lineHeight: '1.5',
    },
  };
  const contentStyle: CSSProperties = {
    position: 'relative',
    height: 'calc(100% - 24px)',
    margin: '0',
    padding: '20px',
  };
  const commonProps1 = {
    title: '展示区',
    style: { margin: '0' },
  };
  const [actionList, setActionList] = useState<object[]>([]);

  return (
    <Actions.Provider value={{ actionList, setActionList }}>
      <div className={styles.editorPage}>
        <Card free className={styles.oneArea}>
          <Card.Header {...commonProps} />
          <Card.Content style={contentStyle}>
            <Controller />
          </Card.Content>
        </Card>
        <Card free className={styles.oneArea}>
          <Card.Header {...commonProps1} />
          <Card.Content style={contentStyle}>
            <Presenter />
          </Card.Content>
        </Card>
      </div>
    </Actions.Provider>
  );
}

export default Editor;
