import { codeOptions, CodeWorkSpace, PreviewOption } from "helper";
import React from "react";
import Code from "./Code";
import { WorkspaceSvg } from "blockly";

export interface PreviewCodeProps {
  option: PreviewOption;
  onPreviewOptionChange: (option: PreviewOption) => void;
  codes?: Partial<Record<PreviewOption, CodeWorkSpace>>;
  workspace?: WorkspaceSvg;
}
export const PreviewCode: React.FC<PreviewCodeProps> = ({
  option: selectedOption,
  onPreviewOptionChange: setOption,
  codes,
}) => {
  return (
    <div className="code-preview">
      <div className="d-flex justify-space-between align-center">
        <div className="preview-options">
          {codeOptions.map((option) => (
            <button
              key={option}
              className={option === selectedOption ? "active" : ""}
              onClick={() => {
                setOption(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <div></div>
      </div>
      <Code code={codes?.[selectedOption]?.text} language={selectedOption} />
    </div>
  );
};
