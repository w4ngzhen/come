import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * 评论表
 * @param uid 主键
 * @param site_key 站点key
 * @param page_key 页面key
 * @param user_nickname 用户昵称
 * @param user_email_id 用户邮箱id
 * @param user_email 用户邮箱
 * @param content 评论内容
 * @param submit_time 提交时间
 * @param status 状态
 * @param related_comment_uid 关联评论uid
 */
export const tb_comments = sqliteTable("tb_comments", {
  uid: integer().primaryKey(),
  site_key: text().notNull(),
  page_key: text().notNull(),
  user_nickname: text().notNull(),
  user_email_id: text().notNull(),
  user_email: text().notNull(),
  content: text().notNull(),
  submit_time: integer().notNull(),
  status: integer().notNull(),
  related_comment_uid: integer(),
});
