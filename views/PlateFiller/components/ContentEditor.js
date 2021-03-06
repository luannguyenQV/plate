import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'
import React, { Component } from 'react'

import BlockRenderMap from './BlockRenderMap'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { getBlockStyle } from './getBlockStyle'

class ContentEditor extends Component {
  static propTypes = {
    saveContent: PropTypes.func,
    plateContent: PropTypes.string,
    plateId: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.plateContent))
      )
    }
  }

  saveContent = debounce(content => {
    this.props.saveContent(this.props.plateId, content)
  }, 500)

  onChange = editorState => {
    this.setState({
      editorState
    })

    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    )

    this.saveContent(content)
  }

  focus = () => {
    this.editor.focus()
  }

  handleKeyCommand = command => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  onTab = e => {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  render() {
    return (
      <div className="RichEditor-root">
        <div className="button-container">
          <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
        </div>
        <div className="button-container">
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <div className="RichEditor-editor" onClick={this.focus}>
          <Editor
            editorKey="editor"
            blockStyleFn={getBlockStyle}
            blockRenderMap={BlockRenderMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref={input => {
              this.editor = input
            }}
            spellCheck={true}
          />
        </div>
        <style jsx global>{`
          * {
            font-size: inherit;
          }
          RichEditor-root {
            background: #fff;
            padding: 15px;
          }
          .RichEditor-editor {
            cursor: text;
            margin-top: 10px;
            padding: 15px;
            min-height: 400px;
          }
          .button-container {
            word-wrap: break-word;
            text-align: center;
          }
          .text-align-right {
            text-align: right;
          }
          .text-align-center {
            text-align: center;
          }
          .text-align-left {
            text-align: left;
          }

        `}</style>
      </div>
    )
  }
}

export default ContentEditor
