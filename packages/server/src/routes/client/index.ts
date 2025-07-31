import { errRes, okRes } from "../../utils/resp";
import { extractGetReqOffsetAndLimit } from "../../utils/req";
import { Context } from "hono";
import { Comment, PageResult, ReqCreateComment } from "@come/common-types";
import { z } from "zod";
import { md5 } from "hono/utils/crypto";
import { validateByZod } from "../../utils/validate";
import { drizzleDbWrapper } from "../../db";
import { tb_comments } from "../../db/schema";
import { nowUtcSeconds } from "../../utils/date";
import { and, count, desc, eq } from "drizzle-orm";

/**
 * 评论组件客户端查询评论
 * 始终以时间降序查询
 * @param c
 */
export async function queryComments(c: Context) {
  try {
    const { offset, limit } = extractGetReqOffsetAndLimit(c);
    const { site_key, page_key } = c.req.query();
    const db = drizzleDbWrapper(c);

    /**
     * 因为SelectBuilder是可变对象，所以查询和查全部需要重新构建
     */
    function createBaseQuery() {
      return db
        .select()
        .from(tb_comments)
        .where(
          and(
            eq(tb_comments.site_key, site_key),
            eq(tb_comments.page_key, page_key),
            eq(tb_comments.status, 1), // 只查询已通过的评论
          ),
        )
        .orderBy(desc(tb_comments.submit_at)); // 时间始终降序，显示最新
    }

    // 查询该条件下的分页数据
    const dataQuery = createBaseQuery().limit(limit).offset(offset);
    const result = await dataQuery.run();
    const comments = result.results as Comment[];
    // 查询该条件下的总数
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

export async function createComment(c: Context) {
  const rawReq = (await c.req.json()) as ReqCreateComment;

  const parseRes = validateByZod(rawReq, CreateCommentValidateSchema);
  if (!parseRes.success) {
    return c.json(parseRes, 400);
  }
  const req: ReqCreateComment = parseRes.data;

  const {
    site_key,
    page_key,
    user_nickname,
    user_email: rawUserEmail,
    content,
  } = req;

  const userId = await md5(rawUserEmail);
  const userEmail = await maskEmail(rawUserEmail);

  try {
    const start = performance.now();
    const db = drizzleDbWrapper(c);
    const dbRes = await db
      .insert(tb_comments)
      .values({
        site_key: site_key,
        page_key: page_key,
        user_id: userId,
        user_nickname: user_nickname,
        user_email: userEmail,
        content: content,
        status: 1,
        submit_at: nowUtcSeconds(),
      })
      .run();

    if (dbRes.success) {
      return c.json(okRes({ processingTime: performance.now() - start }));
    } else {
      return c.json(errRes("评论创建失败，请稍候再试"), 500);
    }
  } catch (e) {
    return c.json(errRes("评论创建失败，请稍候再试"), 500);
  }
}

/**
 * 创建评论参数校验
 */
const CreateCommentValidateSchema = z.object({
  site_key: z.string().min(1, "siteKey 不能为空"),
  page_key: z.string().min(1, "pageKey 不能为空"),
  user_nickname: z
    .string()
    .min(1, "用户昵称不能为空")
    .max(50, "昵称长度不能超过50"),
  user_email: z.email("邮箱格式不正确"),
  content: z
    .string()
    .min(1, "评论内容不能为空")
    .max(500, "评论内容不能超过500字符"),
  related_comment_uid: z.number().int().optional(), // 可选字段
});

/**
 * 对邮箱字符串进行脱敏
 * @param email
 */
function maskEmail(email: string) {
  if (typeof email !== "string") {
    return "";
  }
  const [localPart, domainPart] = email.split("@");
  if (!localPart?.length || !domainPart?.length) {
    return "";
  }
  const first = localPart.charAt(0);
  const last = localPart.charAt(localPart.length - 1);
  return `${first}***${last}@${domainPart}`;
}
