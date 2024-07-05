import React from "react";
import * as Blockly from "blockly/core";

import ConfigFiles from "./initContent/content";

import "./blockly.css";
import { BlocklyWorkspace } from "react-blockly";
import { CodeWorkSpace } from "helper";

export interface BlockEditorRef {
  getWorkspace(): Blockly.WorkspaceSvg | undefined;
  getCode: () => {
    xml: CodeWorkSpace;
    json: CodeWorkSpace;
    python: CodeWorkSpace;
    javascript: CodeWorkSpace;
    dart: CodeWorkSpace;
    php: CodeWorkSpace;
  };
}

export interface BlocklyEditorProps {
  onWorkspaceChange: (workspace: Blockly.WorkspaceSvg) => void;
}

export const BlocklyEditor: React.FC<BlocklyEditorProps> = (props) => {
  return (
    <BlocklyWorkspace
      toolboxConfiguration={ConfigFiles.INITIAL_TOOLBOX_JSON}
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
      }}
      initialJson={ConfigFiles.INITIAL_JSON}
      className="fill-height"
      onInject={(workspace) => {
        props.onWorkspaceChange(workspace);
        workspace.addChangeListener(() => {
          props.onWorkspaceChange(workspace);
        });
      }}
    />
  );
};
