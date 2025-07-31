import { cls } from "../../utils";
import { Comment } from "@come/common-types";
import { CommentItem } from "../CommentItem";
import * as styles from "./index.module.less";

interface ICommentListProps {
  comments: Comment[];
  commentTimeZone?: string;
  className?: string;
}

export const CommentList = (props: ICommentListProps) => {
  const { comments = [], className, commentTimeZone } = props;
  return (
    <div className={cls(styles.come_comment_box__comment_list, className)}>
      <div className={styles.content}>
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.uid}
              commentData={comment}
              commentTimeZone={commentTimeZone}
              className={styles.item_wrapper}
            />
          );
        })}
      </div>
    </div>
  );
};
