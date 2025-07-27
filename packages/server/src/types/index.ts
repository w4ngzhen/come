import { Context } from "hono";

export type HonoContext = Context<{
  // Bindings: {
  //     DB: D1Database;
  // },
  Variables: {
    ADMIN_GITHUB_AUTH_KEY?: string;
  };
}>;
