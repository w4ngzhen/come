import { Hono } from "hono";
import { cors } from "hono/cors";

import { createSite, querySites } from "./routes/management/site-info";
import { checkAdminToken } from "./routes/management/middleware/check-header";
import { createComment, queryComments } from "./routes/client";

const app = new Hono();

app.use(cors());

app.get("/", (c) => c.text("hello, come!"));

/**
 * management API
 */
// 1. check header token for all
app.use("/management/*", checkAdminToken);
app.get("/management/sites", querySites);
app.post("/management/sites", createSite);

/**
 * client API
 */
app.get("/client-api/comments", queryComments);
app.post("/client-api/comment", createComment);

app.all("*", (c) => {
  return c.text("404 Not Found");
});

export default app;
