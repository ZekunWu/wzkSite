import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

interface DomEvent {
  (editor: CodeMirror.Editor, event?: any): void;
}

interface MirrorProps {
  value: string;
  options: object;
  width: string;
  height: string;
  refMirror: (editor: CodeMirror.EditorFromTextArea) => void;
  onMousedown?: DomEvent;
  onKeyPress?: DomEvent;
  onCursorActivity?: (editor: CodeMirror.Editor) => void;
}

function ReactMirror(props: MirrorProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [editor, setEditor] = useState<CodeMirror.EditorFromTextArea>();
  const [preProps, setPreProps] = useState(props);

  useEffect(() => {
    const iniEditor: CodeMirror.EditorFromTextArea = CodeMirror.fromTextArea(textarea.current as HTMLTextAreaElement, props.options);
    setEditor(iniEditor);
    const eventDict = getEventHandleFromProps();
    Object.keys(eventDict).forEach((event) => {
      iniEditor.on(eventDict[event], props[event]);
    });

    const { value, width, height, refMirror } = props;
    refMirror(iniEditor);
    // 初始化值
    iniEditor.setValue(value || '');

    if (width || height) {
      // 设置尺寸
      iniEditor.setSize(width, height);
    }
    Object.keys(props || {}).filter((p) => /^on/.test(p)).forEach((prop) => {
      switch (prop) {
        case 'onKeyPress':
          iniEditor.on('keypress', (cm, event) => {
            if (props.onKeyPress) props.onKeyPress(iniEditor, event);
          });
          break;
        case 'onCursorActivity':
          iniEditor.on('cursorActivity', (cm) => {
            if (props.onCursorActivity) props.onCursorActivity(iniEditor);
          });
          break;
      }
    });
    return () => {
      if (editor) {
        editor.toTextArea();
      }
    };
  }, []);

  useEffect(() => {
    if (!editor) return;
    const val = editor.getValue();
    const next = props.value;
    if (next !== undefined && next !== preProps.value && next !== val) {
      editor.setValue(props.value);
    }
    const { options, width, height } = props;
    if (typeof options === 'object') {
      Object.keys(options).forEach((name: keyof CodeMirror.EditorConfiguration) => {
        if (JSON.stringify(preProps.options[name]) !== JSON.stringify(options[name])) {
          editor.setOption(name, options[name]);
        }
      });
    }

    if (width !== preProps.width || height !== preProps.height) {
      editor.setSize(width, height);
    }
    setPreProps(props);
  }, [props]);

  function getEventHandleFromProps(): object {
    const propNames: string[] = Object.keys(props);
    const eventHandle: string[] = propNames.filter((prop: string) => {
      const p = /^on+/;
      return p.test(prop);
    });

    const eventDict: object = {};
    eventHandle.forEach((ele) => {
      eventDict[ele] = ele.replace(/^on[A-Z]/g, (s) => s.slice(2).toLowerCase());
    });

    return eventDict;
  }
  return (
    <textarea ref={textarea} />
  );
}

export default ReactMirror;
