import { useMemo, useState } from "preact/compat";
import { cls } from "../../utils";
import { IconLoading, IconSend } from "../basic";
import * as styles from "./index.module.less";

interface IProps {
  loading?: boolean;
  onCommentSendClick?: (content: CommentInfo) => void;
  className?: string;
  contentMaxLength?: number;
}

export interface CommentInfo {
  content: string;
  userEmail: string;
  userNickname: string;
}

export const CommentEditor = (props: IProps) => {
  const { contentMaxLength = 300 } = props;
  const { loading, onCommentSendClick, className } = props;
  const [userEmail, setUserEmail] = useState<string>();
  const [userNickname, setUserNickname] = useState<string>();
  const [inputContent, setInputContent] = useState<string>(undefined);

  const [focused, setFocused] = useState<boolean>(false);

  const sendBtnDisabled = useMemo(() => {
    return !userEmail || !userNickname || !inputContent;
  }, [userEmail, userNickname, inputContent]);

  return (
    <div className={cls(styles.come_comment_box__comment_editor, className)}>
      <div className={styles.info}>
        <label htmlFor={"email"}>*邮箱</label>
        <input
          className={styles.email_input}
          id="email"
          placeholder={"email"}
          onChange={(e) => setUserEmail((e.target as any).value)}
        />
        <label htmlFor={"nickname"}>*昵称</label>
        <input
          id="nickname"
          placeholder={"nickname"}
          onChange={(e) => setUserNickname((e.target as any).value)}
        />
      </div>
      <div className={styles.input_area}>
        <textarea
          maxLength={contentMaxLength}
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
      </div>
      <div className={styles.actions}>
        <button
          className={cls(
            styles.send_btn,
            (loading || sendBtnDisabled) && styles.disabled,
          )}
          onClick={() => {
            if (!sendBtnDisabled && confirm("Do you want send this comment?")) {
              onCommentSendClick?.({
                content: inputContent,
                userEmail: userEmail,
                userNickname: userNickname,
              });
            }
          }}
        >
          {loading ? <IconLoading /> : <IconSend />}
        </button>
      </div>
    </div>
  );
};
