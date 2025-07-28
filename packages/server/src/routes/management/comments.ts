import type { Context } from "hono";
import { extractGetReqOffsetAndLimit } from "../../utils/req";
import { Comment, PageResult } from "@come/common";
import { okRes } from "../../utils/resp";

/**
 * 分页查询页面记录
 * ${api-path}?pageNumber=1&pageSize=10
 */
export async function getCommentsWithPagination(c: Context) {
  try {
    const { limit, offset } = extractGetReqOffsetAndLimit(c);

    // console.debug("准备获取对应分页数据", limit, offset);

    const db = c.env.MY_COME_DB;

    // 查询指定页的数据
    const result = await db
      .prepare(
        "SELECT uid, page_key, user_nickname, user_email_id, user_email, content, submit_time, status, related_comment_uid FROM tb_comments LIMIT ? OFFSET ?",
      )
      .bind(limit, offset)
      .all();

    const comments = result.results as Comment[];

    // 查询总记录数
    const countResult = await db
      .prepare("SELECT COUNT(*) as total FROM tb_comments")
      .first();

    const total = countResult?.total || 0;
    const pageResult: PageResult<Comment> = {
      total,
      itemList: comments,
    };

    return c.json(okRes(pageResult));
  } catch (error) {
    // 处理 error 类型未知的问题
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return c.json({ success: false, error: errorMessage }, 500);
  }
}
