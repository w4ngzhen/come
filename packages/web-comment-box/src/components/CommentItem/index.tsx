import { useMemo } from "preact/compat";
import { cls } from "../../utils";
import { Comment } from "@come/common";
import * as styles from "./index.module.less";
import dayjs from "dayjs";

interface IProps {
  commentData: Comment;
  className?: string;
}

export const CommentItem = (props: IProps) => {
  const { commentData, className } = props;
  const {
    uid,
    user_nickname,
    user_email,
    submit_at,
    content: commentContent,
  } = commentData;

  const { displayTime } = useDisplayTime(submit_at * 1000);

  return (
    <div
      key={uid}
      className={cls(styles.come_comment_box__comment_item, className)}
    >
      <div className={styles.header}>
        <span className={styles.user_nickname}>
          {user_nickname}
          <span>{`(${user_email})`}</span>
        </span>
        <span className={styles.time}>{displayTime}</span>
      </div>
      <div
        className={styles.content}
        style={{
          whiteSpace: "pre-wrap", // 避免丢失换行（\n）
        }}
      >
        {commentContent}
      </div>
    </div>
  );
};

/**
 * 支持动态刷新的时间显示
 * @param baseTime UTC millisecond
 */
function useDisplayTime(baseTime: number) {
  const displayTime = useMemo(() => {
    return dayjs(baseTime).format("YYYY-MM-DD HH:mm:ss");
  }, [baseTime]);

  return { displayTime };
}
