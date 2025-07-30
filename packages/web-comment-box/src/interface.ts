/**
 * ComeCommentBox 配置
 */
export interface ConfigOptions {
  /**
   * 评论服务地址，例如http://xxx.com
   * 注意，内部会在该serviceUrl基础上，添加默认的path
   * 例如，在查询评论列表时，会 GET ${serviceUrl}/comment
   */
  serviceUrl: string;
  /**
   * 当前评论列表所属站点标识
   */
  siteKey: string;
  /**
   * 当前评论列表所属页面标识
   */
  pageKey: string;
  /**
   * 评论列表分页大小
   * @default 5
   */
  commentListPageSize?: number;
  /**
   * 评论内容字符长度
   * 注意，该处仅仅前端限制，请与服务端保持一致校验
   * @default 300
   */
  commentCharLength?: number;
}
