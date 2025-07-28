-- 创建 tb_comments 表
CREATE TABLE IF NOT EXISTS tb_comments
(
    uid                 INTEGER PRIMARY KEY AUTOINCREMENT,
    page_key            TEXT    NOT NULL,
    user_nickname       TEXT    NOT NULL,
    user_email_id       TEXT    NOT NULL,
    user_email          TEXT    NOT NULL,
    content             TEXT    NOT NULL,
    submit_time         INTEGER NOT NULL,
    status              INTEGER NOT NULL,
    related_comment_uid INTEGER
);