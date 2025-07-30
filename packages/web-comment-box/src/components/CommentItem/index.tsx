import { useEffect, useState } from "preact/compat";
import { cls } from "../../utils";
import { Comment } from "@come/common";
import * as styles from "./index.module.less";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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

  const { displayTime } = useDynamicDisplayTime(submit_time * 1000);

  return (
    <div className={cls(styles.come_comment_box__comment_item, className)}>
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
 * @param interval
 */
function useDynamicDisplayTime(baseTime: number, interval: number = 5) {
  const [displayTime, setDisplayTime] = useState<string>("");

  useEffect(() => {
    const timeStr = dayjs(baseTime).fromNow();
    setDisplayTime(timeStr);
    const id = setInterval(() => {
      const timeStr = dayjs(baseTime).fromNow();
      setDisplayTime(timeStr);
    }, interval);
    return () => clearInterval(id);
  }, [baseTime, interval]);

  return { displayTime };
}
