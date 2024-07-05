import { WorkspaceSvg, Xml, serialization } from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";
import { dartGenerator } from "blockly/dart";
import { phpGenerator } from "blockly/php";

import xmlFormat from "xml-formatter";

export const codeOptions = [
  "xml",
  "json",
  "python",
  "javascript",
  "dart",
  "php",
] as const;

export type PreviewOption = (typeof codeOptions)[number];

export interface CodeWorkSpace {
  text: string;
  error?: boolean;
  message?: string;
}
export const workspaceToCode = (
  workspace: WorkspaceSvg,
  language: PreviewOption
): CodeWorkSpace => {
  try {
    switch (language) {
      case "xml":
        const newXml = Xml.domToText(Xml.workspaceToDom(workspace));
        return { text: xmlFormat(newXml) };
      case "json":
        const newJson = JSON.stringify(
          serialization.workspaces.save(workspace),
          null,
          2
        );
        return { text: newJson };
      case "python":
        return { text: pythonGenerator.workspaceToCode(workspace) };
      case "javascript":
        return { text: javascriptGenerator.workspaceToCode(workspace) };
      case "dart":
        return { text: dartGenerator.workspaceToCode(workspace) };
      case "php":
        return { text: phpGenerator.workspaceToCode(workspace) };
      default:
        return { text: "", error: true, message: "Invalid language" };
    }
  } catch (e) {
    return { text: "", error: true, message: (e as Error).message };
  }
};

export const jsonToXml = (json) => {
  var xml = document.createElement("xml");

  json.forEach(function (block) {
    var blockElement = document.createElement("block");
    blockElement.setAttribute("type", block.type);
    blockElement.setAttribute("x", block.x);
    blockElement.setAttribute("y", block.y);

    if (block.fields) {
      for (var fieldName in block.fields) {
        var fieldElement = document.createElement("field");
        fieldElement.setAttribute("name", fieldName);
        fieldElement.textContent = block.fields[fieldName];
        blockElement.appendChild(fieldElement);
      }
    }

    if (block.inputs) {
      for (var inputName in block.inputs) {
        var inputElement = document.createElement("value");
        inputElement.setAttribute("name", inputName);
        var inputBlock = jsonToXml([block.inputs[inputName].block]).firstChild;
        if (inputBlock) inputElement.appendChild(inputBlock);
        blockElement.appendChild(inputElement);
      }
    }

    xml.appendChild(blockElement);
  });

  return xml;
};

export const initXmlFromText = (text: string) => {
  var xml = document.createElement("xml");
  xml.innerHTML = text;
  return xml;
};
