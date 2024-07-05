import { CopyIcon } from "icons/CopyIcon";

export default function Code({ code, language }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code">
      <div>
        <span className="copy-btn" onClick={handleCopy}>
          <CopyIcon />
        </span>
      </div>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
