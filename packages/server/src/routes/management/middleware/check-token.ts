import { Context, Next } from "hono";
import { errorResp } from "../../../utils/resp";

export async function checkAdminToken(c: Context, next: Next) {
  if (!c.env.ADMIN_AUTH_TOKEN) {
    return c.json(
      errorResp("admin AUTH TOKEN is not set, please contact site manager"),
      500,
    );
  }
  const authKey = c.env.ADMIN_AUTH_TOKEN;
  const reqToken = c.req.header("X-COME-ADMIN-AUTH-TOKEN");
  if (authKey !== reqToken) {
    return c.json(errorResp("Admin auth token authorized failed"), 401);
  }
  return await next();
}
