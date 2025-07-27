import { Context, Next } from "hono";
import { errorResp } from "../../../utils/resp";

export async function checkAdminToken(c: Context, next: Next) {
  if (!c.env.ADMIN_GITHUB_AUTH_KEY) {
    return c.json(
      errorResp("admin AUTH KEY is not set, please contact site manager"),
      500,
    );
  }
  const authKey = c.env.ADMIN_GITHUB_AUTH_KEY;
  const reqToken = c.req.header("x-api-token");
  if (authKey !== reqToken) {
    return c.json(errorResp("authorized failed"), 401);
  }
  return await next();
}
