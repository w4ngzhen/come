/**
 * 创建评论请求
 */
export interface ReqCreateComment {
  /**
   * site key
   * 站点key
   */
  site_key: string;
  /**
   * page key
   * 页面key
   */
  page_key: string;
  /**
   * 评论人昵称
   */
  user_nickname: string;
  /**
   * 评论人邮箱
   */
  user_email: string;
  /**
   * 评论内容
   */
  content: string;
}

/**
 * 评论请求创建响应
 */
export interface RespCreateComment {
  /**
   * 处理时间
   */
  processing_time: number;
  /**
   * 评论是否启用审核
   * 若启用审核，评论会先进入审核队列，待审核通过后才会显示
   */
  is_comment_submit_review_enabled: boolean;
}
