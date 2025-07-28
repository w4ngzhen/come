/**
 * 创建评论请求
 */
export interface ReqCreateComment {
  /**
   * site key
   * 站点key
   */
  siteKey: string;
  /**
   * page key
   * 页面key
   */
  pageKey: string;
  /**
   * 评论人昵称
   */
  userNickname: string;
  /**
   * 评论人邮箱
   */
  userEmail: string;
  /**
   * 评论内容
   */
  content: string;
  /**
   * 关联的评论ID
   */
  relatedCommentUid?: number;
}
