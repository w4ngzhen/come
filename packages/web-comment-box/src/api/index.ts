import type { PageInfo, Comment, PageResult, Result } from "@come/common";
import { ConfigOptions } from "../interface";

export class ComeCommentApi {
  /**
   * 构造API实例时，需传递服务URL
   * @protected
   */
  protected serviceUrl: string;
  /**
   * 当前评论列表所属站点标识
   * @protected
   */
  protected siteKey: string;
  /**
   * 当前评论列表所属页面标识
   * @protected
   */
  protected pageKey: string;

  constructor(init: Pick<ConfigOptions, "serviceUrl" | "siteKey" | "pageKey">) {
    const { siteKey, pageKey, serviceUrl } = init;
    this.serviceUrl = serviceUrl;
    this.siteKey = siteKey;
    this.pageKey = pageKey;
  }

  /**
   * 分页查询评论
   */
  public async getComments(requestParams: {
    pageInfo: PageInfo;
  }): Promise<Result<PageResult<Comment>>> {
    const { pageInfo } = requestParams;
    const query = new URLSearchParams({
      site_key: this.siteKey,
      page_key: this.pageKey,
      page_number: pageInfo.page_number.toString(),
      page_size: pageInfo.page_size.toString(),
    });

    try {
      const rawResp = await fetch(
        `${this.serviceUrl}/comments?${query.toString()}`,
        {
          method: "GET",
        },
      );

      if (!rawResp.ok) {
        return {
          success: false,
          err_msg: `加载评论失败：${rawResp.statusText}`,
        };
      }

      return await rawResp.json();
    } catch (e) {
      return {
        success: false,
        err_msg: `加载评论失败：${e.message}`,
      };
    }
  }
}
