-- 创建 tb_comments 表
CREATE TABLE IF NOT EXISTS tb_comments
(
    uid           INTEGER PRIMARY KEY AUTOINCREMENT,
    site_key      TEXT    NOT NULL,
    page_key      TEXT    NOT NULL,
    user_id       TEXT    NOT NULL,
    user_nickname TEXT    NOT NULL,
    user_email    TEXT    NOT NULL,
    content       TEXT    NOT NULL,
    submit_at     INTEGER NOT NULL,
    status        INTEGER NOT NULL
);