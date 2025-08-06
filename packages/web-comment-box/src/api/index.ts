import {
  Comment,
  PageInfo,
  PageResult,
  ReqCreateComment,
  Result,
} from "@come/common-types";
import { ConfigOptions } from "../interface";
import { logger } from "../utils";
import { RespCreateComment } from "@come/common-types/src/req";

export class ComeCommentApi {
  /**
   * 构造API实例时，需传递服务URL
   * @protected
   */
  protected serviceBaseUrl: string;
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

  constructor(
    init: Pick<ConfigOptions, "serviceBaseUrl" | "siteKey" | "pageKey">,
  ) {
    const { siteKey, pageKey, serviceBaseUrl } = init;
    this.serviceBaseUrl = serviceBaseUrl;
    this.siteKey = siteKey;
    this.pageKey = pageKey;
  }

  /**
   * 分页查询评论
   */
  public async getComments(requestParams: {
    pageInfo: PageInfo;
  }): Promise<Result<PageResult<Comment>>> {
    return handleRawResp("加载评论", () => {
      const { pageInfo } = requestParams;
      const query = new URLSearchParams({
        site_key: this.siteKey,
        page_key: this.pageKey,
        page_number: pageInfo.page_number.toString(),
        page_size: pageInfo.page_size.toString(),
      });
      return fetch(`${this.serviceBaseUrl}/comments?${query.toString()}`, {
        method: "GET",
      });
    });
  }

  public async submitComment(
    reqCreateComment: Omit<ReqCreateComment, "site_key" | "page_key">,
  ): Promise<Result<RespCreateComment>> {
    return handleRawResp("创建评论", () => {
      const req = {
        ...reqCreateComment,
        site_key: this.siteKey,
        page_key: this.pageKey,
      };
      return fetch(`${this.serviceBaseUrl}/comment`, {
        method: "POST",
        body: JSON.stringify(req),
      });
    });
  }
}

/**
 * @param subject
 * @param reqFunc
 */
async function handleRawResp<T>(
  subject: string,
  reqFunc: () => Promise<Response>,
): Promise<Result<T>> {
  try {
    const rawResp = await reqFunc();
    if (!rawResp.ok) {
      let errMsg: string;
      const errorBody = await rawResp.json();
      if ("success" in errorBody && !errorBody.success) {
        // 服务端非2xx，响应的Result
        errMsg = (errorBody as Result).err_msg || rawResp.statusText;
      } else {
        errMsg = rawResp.statusText;
      }
      return {
        success: false,
        err_msg: `${subject || "接口调用"}出错: ${errMsg}`,
      };
    }
    return (await rawResp.json()) as Result<T>;
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      err_msg: `${subject || "接口调用"}出错: ${e.message}`,
    };
  }
}
