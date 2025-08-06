import { useEffect, useState } from "preact/compat";
import { ConfigOptions } from "./interface";
import { Comment, PageInfo } from "@come/common-types";
import { OptionsContext } from "./context";
import { ErrorTip, Spin } from "./components/basic";
import { CommentList } from "./components/CommentList";

import * as styles from "./CommentBoxComponent.module.less";
import { CommentEditor, InputCommentInfo } from "./components/CommentEditor";
import { ComeCommentApi } from "./api";
import { SimplePager } from "./components/SimplePager";

interface CommentBoxComponentProps {
  options: ConfigOptions;
}

export const CommentBoxComponent = (props: CommentBoxComponentProps) => {
  const { options } = props;
  const { commentListPageSize = 5, commentCharLength = 300 } = options;
  const [commentApi] = useState<ComeCommentApi>(new ComeCommentApi(options));
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page_number: 1,
    page_size: commentListPageSize,
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadComments(pageInfo);
  }, []);

  const loadComments = async (pageInfo: PageInfo) => {
    setLoading(true);
    const result = await commentApi.getComments({
      pageInfo: {
        ...pageInfo,
      },
    });
    if (result.success) {
      setComments(result.data?.items || []);
      setTotal(result.data?.total || 0);
    } else {
      setError(result.err_msg || "评论加载出错");
    }
    setLoading(false);
  };

  const submitComment = async (comment: InputCommentInfo) => {
    setLoading(true);
    const result = await commentApi.submitComment({
      content: comment.content,
      user_email: comment.userEmail,
      user_nickname: comment.userNickname,
    });
    if (!result.success) {
      alert(result.err_msg);
      setLoading(false);
      return;
    } else {
      const { processing_time, is_comment_submit_review_enabled } =
        result.data || {};
      const msg = [`评论提交成功，服务端处理时间${processing_time}毫秒`];
      if (is_comment_submit_review_enabled) {
        msg.push("服务端开启评论审核，评论需要审核后才会显示");
      }
      alert(msg.join("，"));
    }
    // 重置分页，请求
    const page = { page_number: 1, page_size: pageInfo.page_size };
    setPageInfo(page);
    await loadComments(page);
    setLoading(false);
  };

  const renderCommentList = () => {
    if (loading) {
      return <Spin />;
    }
    if (error) {
      return <ErrorTip error={error} />;
    }
    if (comments.length === 0) {
      return <div className={styles.no_comment}>暂无评论</div>;
    }
    return (
      <>
        <CommentList comments={comments} />
        <SimplePager
          total={total}
          pageNumber={pageInfo.page_number}
          pageSize={pageInfo.page_size}
          onPageChange={(pageNumber) => {
            const nextPageInfo = {
              ...pageInfo,
              page_number: pageNumber,
            };
            setPageInfo(nextPageInfo);
            loadComments(nextPageInfo);
          }}
        />
      </>
    );
  };

  return (
    <OptionsContext.Provider
      value={{
        ...options,
      }}
    >
      <div className={styles.come_comment_box__root}>
        {renderCommentList()}
        <div className={styles.divider} />
        <CommentEditor
          loading={loading}
          contentMaxLength={commentCharLength}
          onCommentSendClick={submitComment}
        />
      </div>
    </OptionsContext.Provider>
  );
};
