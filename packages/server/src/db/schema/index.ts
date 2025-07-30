import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * 评论表
 * @param uid 主键
 * @param site_key 站点key
 * @param page_key 页面key
 * @param user_id 用户id
 * @param user_nickname 用户昵称
 * @param user_email 用户邮箱
 * @param content 评论内容
 * @param submit_at 提交时间
 * @param status 状态
 */
export const tb_comments = sqliteTable("tb_comments", {
  uid: integer().primaryKey(),
  site_key: text().notNull(),
  page_key: text().notNull(),
  user_id: text().notNull(),
  user_nickname: text().notNull(),
  user_email: text().notNull(),
  content: text().notNull(),
  submit_at: integer().notNull(),
  status: integer().notNull(),
});
