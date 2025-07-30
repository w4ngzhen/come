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
}
