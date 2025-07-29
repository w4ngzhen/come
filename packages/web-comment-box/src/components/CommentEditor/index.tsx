import "./index.less";
import { useState } from "preact/compat";
import { baseClassSupplier, cls } from "../../utils";
import { IconLoading, IconSend } from "../basic";

const baseCls = baseClassSupplier("editor");

interface IProps {
  loading?: boolean;
  onCommentSendClick?: (content: string) => void;
  className?: string;
}

export const CommentEditor = (props: IProps) => {
  const { loading, onCommentSendClick, className } = props;
  const [inputContent, setInputContent] = useState<string>(undefined);

  const [focused, setFocused] = useState<boolean>(false);

  const isDisabled = !inputContent;

  return (
    <div className={cls(baseCls(), className)}>
      <div className={baseCls("info")}>
        <label htmlFor={"email"}>邮箱</label>
        <input id={"email"} placeholder={"Email"} />
        <label htmlFor={"nickname"}>昵称</label>
        <input id="nickname" placeholder={"Name"} />
      </div>
      <div className={baseCls("input-area")}>
        <textarea
          disabled={loading}
          className={cls(
            baseCls("input-area-input"),
            focused && baseCls("input-area-input-focused"),
            loading && baseCls("input-area-input-disabled"),
          )}
          value={inputContent}
          onChange={(e: Event) => {
            setInputContent((e.target as any)?.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={"Leave some comments here"}
        />
        <div className={baseCls("input-area-actions")}>
          <button
            className={cls(
              baseCls("input-area-actions-send-btn"),
              (loading || isDisabled) &&
                baseCls("input-area-actions-send-btn-disabled"),
            )}
            onClick={() => {
              if (!isDisabled && confirm("Do you want send this comment?")) {
                onCommentSendClick?.(inputContent);
              }
            }}
          >
            {loading ? <IconLoading /> : <IconSend />}
          </button>
        </div>
      </div>
    </div>
  );
};
