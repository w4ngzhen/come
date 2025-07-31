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
