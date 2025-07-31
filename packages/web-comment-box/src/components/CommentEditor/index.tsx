import { useMemo, useState } from "preact/compat";
import { cls } from "../../utils";
import { IconLoading, IconSend } from "../basic";
import * as styles from "./index.module.less";

interface IProps {
  loading?: boolean;
  onCommentSendClick?: (content: InputCommentInfo) => void;
  className?: string;
  contentMaxLength?: number;
}

export interface InputCommentInfo {
  content: string;
  userEmail: string;
  userNickname: string;
}

export const CommentEditor = (props: IProps) => {
  const { contentMaxLength = 300 } = props;
  const { loading, onCommentSendClick, className } = props;

  const [inputCommentInfo, setInputCommentInfo] = useState<InputCommentInfo>({
    content: "",
    userEmail: "",
    userNickname: "",
  });

  const [focused, setFocused] = useState<boolean>(false);

  const sendBtnDisabled = useMemo(() => {
    return (
      !inputCommentInfo.content ||
      !inputCommentInfo.userEmail ||
      !inputCommentInfo.userNickname
    );
  }, [inputCommentInfo]);

  const handleInfoInput = (
    key: keyof InputCommentInfo,
    value: InputCommentInfo[keyof InputCommentInfo],
  ) => {
    setInputCommentInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className={cls(
        styles.come_comment_box__comment_editor,
        focused && styles.focused,
        loading && styles.disabled,
        className,
      )}
    >
      <div className={styles.info}>
        <div className={styles.input_item}>
          <label htmlFor={"email"}>*邮箱</label>
          <input
            className={styles.email_input}
            id="email"
            placeholder={"email"}
            value={inputCommentInfo.userEmail}
            onChange={(e) => {
              const str = (e.target as any).value || "";
              handleInfoInput("userEmail", str);
            }}
          />
        </div>
        <div className={styles.input_item}>
          <label htmlFor={"nickname"}>*昵称</label>
          <input
            id="nickname"
            placeholder={"nickname"}
            value={inputCommentInfo.userNickname}
            onChange={(e) => {
              const str = (e.target as any).value || "";
              handleInfoInput("userNickname", str);
            }}
          />
        </div>
      </div>
      <div className={styles.input_area}>
        <textarea
          maxLength={contentMaxLength}
          disabled={loading}
          className={cls(styles.textarea)}
          value={inputCommentInfo.content}
          onChange={(e: Event) => {
            const str = (e.target as any).value || "";
            handleInfoInput("content", str);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={"Leave some comments here"}
        />
        <div className={styles.actions}>
          <button
            className={cls(
              styles.send_btn,
              (loading || sendBtnDisabled) && styles.disabled,
            )}
            onClick={() => {
              if (
                !sendBtnDisabled &&
                confirm("Do you want send this comment?")
              ) {
                onCommentSendClick?.(inputCommentInfo);
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
