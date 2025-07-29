import { useState } from "preact/compat";
import { baseClassSupplier } from "./utils";
import { ConfigOptions } from "./interface";
import { Comment } from "@come/common";
import { OptionsContext } from "./context";
import { ErrorTip, IconArrow, Spin } from "./components/basic";
import { CommentList } from "./components/CommentList";

import "./CommentBoxComponent.less";
import { CommentEditor } from "./components/CommentEditor";

const baseCls = baseClassSupplier("root");

interface CommentBoxComponentProps {
  options: ConfigOptions;
}

export const CommentBoxComponent = (props: CommentBoxComponentProps) => {
  const { options } = props;
  const { ...restOpts } = options;

  // comments
  const [loadCommentsResult, setCommentsLoadingResult] = useState<{
    loading: boolean;
    error?: string;
    comments?: Comment[];
  }>({
    loading: false,
  });

  const loadComments = async () => {
    return {};
  };

  if (loadCommentsResult.loading) {
    return <Spin />;
  }

  if (!loadCommentsResult.loading && loadCommentsResult.error) {
    return <ErrorTip error={loadCommentsResult.error} />;
  }

  const renderCommentList = () => {
    const { loading, error, comments = [] } = loadCommentsResult;
    if (loading) {
      return <Spin />;
    }
    if (error) {
      return <ErrorTip error={error} />;
    }
    if (comments.length === 0) {
      return <div className={baseCls("no-comment")}>暂无评论</div>;
    }
    return <CommentList comments={comments} />;
  };

  return (
    <OptionsContext.Provider
      value={{
        ...restOpts,
      }}
    >
      <div className={baseCls()}>
        <div className={baseCls("input-wrapper")}>
          <CommentEditor />
        </div>
        <div className={baseCls("list-wrapper")}>{renderCommentList()}</div>
      </div>
    </OptionsContext.Provider>
  );
};
