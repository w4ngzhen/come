import { Hono } from "hono";
import { cors } from "hono/cors";

import { checkAdminToken } from "./routes/_middleware/check-token";
import { getComments, markCommentStatus } from "./routes/management";
import { createComment, queryComments } from "./routes/client";

import { errRes } from "./utils/resp";

const app = new Hono();

app.use(
  cors({
    origin: () => {
      return "*"; // 允许所有域名访问
    },
  }),
);

app.get("/", (c) => c.text("hello, come!"));

/**
 * management API
 * 管理端专属接口，使用checkAdminToken中间件进行接口token校验
 */
// check header token for all
app.use("/management-api/*", checkAdminToken);
app.get("/management-api/comments", getComments);
app.post("/management-api/mark-comment-status", markCommentStatus);
/**
 * client API
 */
app.get("/client-api/comments", queryComments);
app.post("/client-api/comment", createComment);

app.all("*", (c) => {
  return c.json(errRes("API not found"), 404);
});

export default app;
