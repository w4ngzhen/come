import { useState } from "preact/compat";
import { cls } from "../../utils";
import { IconLoading, IconSend } from "../basic";
import * as styles from "./index.module.less";

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
    <div className={cls(styles.come_comment_box__comment_editor, className)}>
      <div className={styles.info}>
        <label htmlFor={"email"}>邮箱</label>
        <input id={"email"} placeholder={"Email"} />
        <label htmlFor={"nickname"}>昵称</label>
        <input id="nickname" placeholder={"Name"} />
      </div>
      <div className={styles.input_area}>
        <textarea
          disabled={loading}
          className={cls(
            styles.textarea,
            focused && styles.focused,
            loading && styles.disabled,
          )}
          value={inputContent}
          onChange={(e: Event) => {
            setInputContent((e.target as any)?.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={"Leave some comments here"}
        />
        <div className={styles.actions}>
          <button
            className={cls(
              styles.send_btn,
              (loading || isDisabled) && styles.disabled,
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
