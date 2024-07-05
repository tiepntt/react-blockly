import { WorkspaceSvg } from "blockly";
import { BlocklyEditor } from "components/blockly-editor/BlocklyEditor";
import CodeEditor from "components/code-editor/CodeEditor";
import { PreviewCode } from "components/preview-code/PreviewCode";
import { CodeWorkSpace, PreviewOption, workspaceToCode } from "helper";
import React, { useCallback, useState } from "react";

export const App = () => {
  const [previewOption, setPreviewOption] =
    React.useState<PreviewOption>("javascript");

  const [workspace, setWorkspace] = useState<WorkspaceSvg | undefined>();

  const [codes, setCodes] = useState<
    Partial<Record<PreviewOption, CodeWorkSpace>>
  >({
    xml: { text: "" },
    json: { text: "" },
    python: { text: "" },
    javascript: { text: "" },
    dart: { text: "" },
    php: { text: "" },
  });

  const onWorkspaceChange = useCallback((workspace) => {
    setWorkspace(workspace);
    const newCodes = {
      xml: workspaceToCode(workspace, "xml"),
      json: workspaceToCode(workspace, "json"),
      python: workspaceToCode(workspace, "python"),
      javascript: workspaceToCode(workspace, "javascript"),
      dart: workspaceToCode(workspace, "dart"),
      php: workspaceToCode(workspace, "php"),
    };
    setCodes(() => ({ ...newCodes }));
  }, []);

  return (
    <div className="app">
      <div id="blockly-editor">
        <BlocklyEditor onWorkspaceChange={onWorkspaceChange} key="code" />
      </div>
      <div className="preview-code d-flex">
        <PreviewCode
          key={previewOption}
          option={previewOption}
          onPreviewOptionChange={setPreviewOption}
          codes={codes}
          workspace={workspace}
        />
        <CodeEditor />
      </div>
    </div>
  );
};

export default App;
