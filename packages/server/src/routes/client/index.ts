import { errRes, okRes } from "../../utils/resp";
import { extractGetReqOffsetAndLimit } from "../../utils/req";
import { Context } from "hono";
import { ReqCreateComment } from "@come/common";
import { z } from "zod";
import { md5 } from "hono/utils/crypto";
import { zodParse } from "../../utils/validate";

export async function queryComments(c: Context) {
  const { offset, limit } = extractGetReqOffsetAndLimit(c);
  return c.json(okRes([]));
}

export async function createComment(c: Context) {
  const rawReq = (await c.req.json()) as ReqCreateComment;

  const parseRes = zodParse(rawReq, CreateCommentValidateSchema);
  if (!parseRes.success) {
    return c.json(parseRes, 400);
  }
  const req: ReqCreateComment = parseRes.data;

  const {
    siteKey,
    pageKey,
    userNickname,
    userEmail,
    content,
    relatedCommentUid,
  } = req;

  const userEmailId = await md5(userEmail);

  try {
    const start = performance.now();
    const db = c.env.MY_COME_DB;
    const dbRes = await db
      .prepare(
        "INSERT INTO tb_comments (site_key, page_key, user_nickname, user_email_id, user_email, content, status, submit_time, related_comment_uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(
        siteKey,
        pageKey,
        userNickname,
        userEmailId,
        maskEmail(userEmail),
        content,
        1,
        new Date().getTime(),
        relatedCommentUid,
      )
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
  siteKey: z.string().min(1, "siteKey 不能为空"),
  pageKey: z.string().min(1, "pageKey 不能为空"),
  userNickname: z
    .string()
    .min(1, "用户昵称不能为空")
    .max(50, "昵称长度不能超过50"),
  userEmail: z.email("邮箱格式不正确"),
  content: z
    .string()
    .min(1, "评论内容不能为空")
    .max(500, "评论内容不能超过500字符"),
  relatedCommentUid: z.number().int().optional(), // 可选字段
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
