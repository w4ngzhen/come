import "./index.less";
import { baseClassSupplier } from "../../utils";
import { Comment } from "@come/common";
import { CommentItem } from "../CommentItem";

const baseClass = baseClassSupplier("comment-list");

interface ICommentListProps {
  comments: Comment[];
}

export const CommentList = (props: ICommentListProps) => {
  const { comments = [] } = props;
  return (
    <div className={baseClass()}>
      <div className={baseClass("content")}>
        {comments.map((comment) => {
          return (
            <CommentItem
              commentData={comment}
              className={baseClass("content-item-wrapper")}
            />
          );
        })}
      </div>
    </div>
  );
};
