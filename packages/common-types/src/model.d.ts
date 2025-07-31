/**
 * page comment(s)
 * 页面评论
 */
export interface Comment {
  /**
   * db uid, primary key
   * 数据库ID，主键
   */
  uid: number;
  /**
   * site key
   * 站点key
   */
  site_key: string;
  /**
   * page key
   * 页面key
   */
  page_key: string;
  /**
   * email id after algorithm digest
   * 用户ID（经过算法摘要存储）
   */
  user_id: string;
  /**
   * The nickname of the person who left the comment
   * 评论者昵称
   */
  user_nickname: string;
  /**
   * desensitized email string
   * for example, "abc@xxx.com" will convert to "a***c@xxx.com"
   * 脱敏后的邮箱字符串
   * 例如，"abc@xxx.com" 会转换为 "a***c@xxx.com"
   */
  user_email: string;
  /**
   * the comment content
   * 评论内容
   */
  content: string;
  /**
   * the comment submit time
   * UTC second timestamp
   * 评论提交时间（使用UTC 秒时间戳）
   */
  submit_at: number;
  /**
   * comment status
   * 评论状态
   * 0: under review, 审核中
   * 1: passed, 已通过
   * 2: rejected, 已拒绝
   * 3: deleted, 已删除
   */
  status: number;
}
