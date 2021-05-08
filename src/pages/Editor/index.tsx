import React, { useState, useRef } from 'react';
import CodeMirror from '@/components/ReactMirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/addon/hint/show-hint'
import styles from './index.module.scss'
import { logger } from 'ice';

function Editor() {
  const [model, setModel] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  const [codemirror, setCodemirror] = useState<CodeMirror.EditorFromTextArea>()
  const handleOnKeypress = function(): void {
    // logger.info('keypress');
  }
  const handleOnClick = function(): void {
    logger.info('mousedown', codemirror);
  }
  const handleOnCursor = function(): void {
    if(codemirror) logger.info('cursor', codemirror.getSelection('position'))
  }
  
  const setEditor = function(): void {
    // console.log(this.codemirror.editor)
    // this.setState({
    //   saveEditor: this.codemirror.editor
    // })
    if(codemirror) codemirror.setValue('this.setfasdfa/nreergsd')
  }

  const setreadOnly = function(): void {
    setReadOnly(!readOnly)
  }

  const push = function(num: number): void {
    if(codemirror) codemirror.makeChange(codemirror.doc, {
      from: {line: 0, ch: 0}, 
      origin: "+input", 
      removed: [""], 
      text: Array(Array(num).fill("f").join('')),
      to: {line: 0, ch: num}
    })
  }

  const setCursor = function(): void {
    // this.codemirror.editor = this.state.saveEditor
    if(codemirror) {
      codemirror.focus()
      codemirror.setCursor({line: 0, ch: 1})
    }
  }

  const del = function(num: number): void {
    if(codemirror) codemirror.makeChange(codemirror.doc, {
      from: {line: 0, ch: 0}, 
      origin: "+delete", 
      removed: Array(Array(num).fill("f").join('')), 
      text: [""],
      to: {line: 0, ch: num}
    })
  }

  const select = function(): void {
    if(codemirror) codemirror.setSelection({line: 0, ch: 15}, {line: 0, ch: 23})
  }
 
  const deleteSelect = function(): void {
    if(codemirror) codemirror.replaceSelection('')
  }

  const moveSelect = function(): void {
    if(codemirror) {
      codemirror.makeChange(codemirror.doc, {
        from: {line: 0, ch: 15}, 
        origin: "+delete", 
        removed: ["nreergsd"], 
        text: [""],
        to: {line: 0, ch: 23}
      })
      codemirror.makeChange(codemirror.doc, {
        from: {line: 0, ch: 0}, 
        origin: "paste", 
        removed: [""], 
        text: ["nreergsd"],
        to: {line: 0, ch: 0}
      })
    }
  }

  return (
    <div className={styles.editorPage}>
      {readOnly && (<div className={styles.cover}></div>)}
      <div style={{height: '300px'}}>
        <CodeMirror
          refMirror={editor => setCodemirror(editor)}
          value={model}
          onMousedown={handleOnClick}
          onKeyPress={handleOnKeypress}
          onCursorActivity={handleOnCursor}
          options={{
            // lockedLines:[],
            // lockAble: true,
            mode: 'text/x-java',
            theme: 'monokai',
            lineNumbers: true,
            indentUnit: 4,
            hintOptions: { completeSingle: false },
            readOnly: false,//如果不设置为nocursor，光标会随用户点击而移动，可以考虑覆盖一层防止用户点击，但是光标的位置还得调用api操作setCursor
            //inputStyle: 'contenteditable',
          }}
          // onChange={(editor, data, value) => {}}
          width='100%'
          height='100%'
        />
      </div>
      <div>
        <button onClick={setEditor}>初始</button>
        <button onClick={setreadOnly}>不可控制</button>
        <button onClick={setCursor}>控制光标</button> 
        <button onClick={() => push(1)}>输入单个</button>
        <button onClick={() => push(2)}>输入多个</button>
        <button onClick={() => del(1)}>删除单个</button>
        <button onClick={() => del(2)}>删除多个</button>
        <button onClick={select}>选中</button>
        <button onClick={deleteSelect}>删除选中</button>
        <button onClick={moveSelect}>移动选中</button>
      </div> 
    </div>
  );
}

export default Editor;
