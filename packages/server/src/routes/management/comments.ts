import type { Context } from "hono";
import { extractGetReqOffsetAndLimit } from "../../utils/req";
import { Comment, PageResult } from "@come/common";
import { okRes } from "../../utils/resp";
import { drizzleDbWrapper } from "../../db";
import { tb_comments } from "../../db/schema";
import { asc, count, desc, inArray, like } from "drizzle-orm";

/**
 * 分页查询页面记录
 * ${api-path}?key=value
 * key如下:
 * page_number: number
 * page_size: number
 * user_nickname: string
 * content: string
 * status: "1, 2, 3" 或 "1"
 * sort_field: "asc" | "desc"
 * sort_order: 目前仅支持"submit_time"
 */
export async function getComments(c: Context) {
  try {
    const { limit, offset } = extractGetReqOffsetAndLimit(c);
    const { user_nickname, content, status, sort_field, sort_order } =
      c.req.query();

    const db = drizzleDbWrapper(c);

    function createBaseQuery() {
      const baseQuery = db.select().from(tb_comments);
      if (user_nickname) {
        baseQuery.where(like(tb_comments.user_nickname, `%${user_nickname}%`));
      }
      if (content) {
        baseQuery.where(like(tb_comments.content, `%${content}%`));
      }
      if (status) {
        const statusList = status
          .split(",")
          .map((item) => parseInt(item?.trim()))
          .filter((item) => !isNaN(item));
        if (statusList.length > 0) {
          baseQuery.where(inArray(tb_comments.status, statusList));
        }
      }
      if (sort_field) {
        // 目前只支持提交时间排序
        const field = {
          submit_time: tb_comments.submit_time,
        }[sort_field];

        if (field) {
          baseQuery.orderBy(sort_order === "asc" ? asc(field) : desc(field));
        }
      }
      return baseQuery;
    }

    // 查询对应条件下所有记录
    const dataQuery = createBaseQuery().limit(limit).offset(offset);
    const result = await dataQuery.run();
    const comments = result.results as Comment[];

    // 查询总记录数
    const countResult = await db
      .select({ total: count() })
      .from(createBaseQuery().as("sub_query"))
      .run();

    const total = countResult?.results?.[0]?.["count(*)"] || 0;

    const pageResult: PageResult<Comment> = {
      total,
      items: comments,
    };

    return c.json(okRes(pageResult));
  } catch (error) {
    // 处理 error 类型未知的问题
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return c.json({ success: false, error: errorMessage }, 500);
  }
}
