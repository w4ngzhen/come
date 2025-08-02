import { Hono } from "hono";
import { cors } from "hono/cors";

import { createComment, queryComments } from "./routes/client";
import { errRes } from "./utils/resp";
import { checkAdminToken } from "./routes/management/middleware/check-token";
import { getComments, markCommentStatus } from "./routes/management/comments";

const app = new Hono();

app.use(
  cors({
    origin: () => {
      console.dir("handle cors origin");
      return "*";
    },
  }),
);

app.get("/", (c) => c.text("hello, come!"));

/**
 * management API
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
