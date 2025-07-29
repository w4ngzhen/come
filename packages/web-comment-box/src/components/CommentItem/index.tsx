import "./index.less";
import { useMemo } from "preact/compat";
import { baseClassSupplier, cls } from "../../utils";
import { Comment } from "@come/common";

const baseClass = baseClassSupplier("comment-item");

interface IProps {
  commentData: Comment;
  className?: string;
}

export const CommentItem = (props: IProps) => {
  const { commentData, className } = props;
  const {
    uid,
    user_email_id,
    user_nickname,
    user_email,
    submit_time,
    content: commentContent,
  } = commentData;

  const time = useMemo(() => {
    return `${submit_time}`;
  }, [submit_time]);

  return (
    <div className={cls(baseClass(), className)}>
      <div className={baseClass("avatar")}></div>
      <div className={baseClass("panel")}>
        <div className={baseClass("panel-header")}>
          <span className={baseClass("panel-header-name")}>
            {user_nickname}
            <span>{`(${user_email})`}</span>
          </span>
          <span className={baseClass("panel-header-datetime")}>{time}</span>
        </div>
        <div className={baseClass("panel-content")}>
          <CommentContent rawCommentContent={commentContent} />
        </div>
      </div>
    </div>
  );
};

function CommentContent(props: { rawCommentContent?: string }) {
  const { rawCommentContent } = props;
  return (
    <div
      className={baseClass("panel-content-pure-text")}
      style={{
        whiteSpace: "pre-wrap", // 避免丢失换行（\n）
      }}
    >
      {rawCommentContent}
    </div>
  );
}
