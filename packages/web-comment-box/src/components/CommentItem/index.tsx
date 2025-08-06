import { useMemo } from "preact/compat";
import { cls, formatUTCTime } from "../../utils";
import { Comment } from "@come/common-types";
import * as styles from "./index.module.less";

interface IProps {
  commentData: Comment;
  commentTimeZone?: string;
  className?: string;
}

export const CommentItem = (props: IProps) => {
  const { commentData, commentTimeZone, className } = props;
  const {
    uid,
    user_nickname,
    user_email,
    submit_at,
    content: commentContent,
  } = commentData;

  const { displayTime } = useDisplayTime(submit_at * 1000, commentTimeZone);

  return (
    <div
      key={uid}
      className={cls(styles.come_comment_box__comment_item, className)}
    >
      <div className={styles.header}>
        <span className={styles.user_nickname}>
          {user_nickname}
          <span className={styles.user_email}>{`(${user_email})`}</span>
        </span>
        <span className={styles.time}>{`${displayTime}`}</span>
      </div>
      <div className={styles.content}>{commentContent}</div>
    </div>
  );
};

/**
 * 支持动态刷新的时间显示
 * @param baseTime UTC millisecond
 * @param timeZone UTC时间戳格式化YYYY-HH-DD HH:mm:ss时，对应时区
 */
function useDisplayTime(baseTime: number, timeZone?: string) {
  return useMemo(() => {
    const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const displayTimeZone = timeZone || defaultTimeZone;
    const displayTime = formatUTCTime(baseTime, displayTimeZone);
    return {
      displayTime,
      displayTimeZone,
    };
  }, [baseTime, timeZone]);
}
