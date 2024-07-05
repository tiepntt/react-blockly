import { getMainWorkspace, Xml } from "blockly";
import ConfigFiles from "components/blockly-editor/initContent/content";
import { jsonToXml } from "helper";
import { useCallback, useState } from "react";

const CodeEditor = () => {
  const [value, setValue] = useState(
    JSON.stringify(ConfigFiles.INITIAL_JSON, null, 2)
  );
  const onReset = useCallback(() => {
    const json = JSON.parse(value);
    const blocks = json?.["blocks"]?.["blocks"];
    if (!blocks) return;
    const xml = jsonToXml(blocks);
    const mainWorkspace = getMainWorkspace();
    mainWorkspace.clear();
    Xml.domToWorkspace(xml, mainWorkspace);
  }, [value]);

  return (
    <div className="code-editor">
      <div className="preview-options">
        <button onClick={onReset}>Reset</button>
      </div>
      <div className="d-flex"></div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default CodeEditor;
