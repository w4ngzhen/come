import { Hono } from "hono";
import { cors } from "hono/cors";

import { createComment, queryComments } from "./routes/client";
import { getSitePagesWithPagination } from "./routes/management/site-pages";
import { errorResp } from "./utils/resp";
import { checkAdminToken } from "./routes/management/middleware/check-token";

const app = new Hono();

app.use(cors());

app.get("/", (c) => c.text("hello, come!"));

/**
 * management API
 */
// check header token for all
app.use("/management/*", checkAdminToken);
app.get("/management/site-pages", getSitePagesWithPagination);

/**
 * client API
 */
app.get("/client-api/comments", queryComments);
app.post("/client-api/comment", createComment);

app.all("*", (c) => {
  return c.json(errorResp("API not found"), 404);
});

export default app;
