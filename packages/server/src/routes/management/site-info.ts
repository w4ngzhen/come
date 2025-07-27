import { extractGetReqOffsetAndLimit } from "../../utils/req";
import { errorResp, successResp } from "../../utils/resp";
import { SiteInfo } from "@come/common/dist";
import { Context } from "hono";

/**
 * query site info by page
 * @param c
 */
export async function querySites(c: Context) {
  const { limit, offset } = extractGetReqOffsetAndLimit(c);
  const sql = "SELECT * FROM tb_site_info OFFSET = ?, LIMIT = ?";
  const queryRes = await c.env.DB.prepare(sql).bind([offset, limit]).all();
  if (!queryRes.success) {
    c.json(errorResp(queryRes.error));
  } else {
    const sites = queryRes.results.map((item) => {
      return {
        ...item,
      } as unknown as SiteInfo;
    });
    c.json(successResp(sites));
  }
}

export async function createSite(c: Context) {
  c.json(successResp());
}
