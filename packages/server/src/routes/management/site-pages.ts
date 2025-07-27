import type { Context } from "hono";
import { extractGetReqOffsetAndLimit } from "../../utils/req";
import { PageResult, SitePage } from "@come/common";
import { successResp } from "../../utils/resp";

/**
 * 分页查询页面记录
 * ${api-path}?pageNumber=1&pageSize=10
 */
export async function getSitePagesWithPagination(c: Context) {
  try {
    const { limit, offset } = extractGetReqOffsetAndLimit(c);
    const db = c.env.DB;

    // 查询指定页的数据
    const result = await db
      .prepare(
        "SELECT uid, pageKey, pageName FROM tb_site_pages LIMIT ? OFFSET ?",
      )
      .bind([limit, offset])
      .all();

    const pages = result.results as SitePage[];

    // 查询总记录数
    const countResult = await db
      .prepare("SELECT COUNT(*) as total FROM tb_site_pages")
      .first();

    const total = countResult?.total || 0;
    const pageResult: PageResult<SitePage> = {
      total,
      itemList: pages,
    };

    return c.json(successResp(pageResult));
  } catch (error) {
    // 处理 error 类型未知的问题
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return c.json({ success: false, error: errorMessage }, 500);
  }
}
