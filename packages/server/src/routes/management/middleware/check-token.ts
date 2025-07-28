import { Context, Next } from "hono";
import { errorResp } from "../../../utils/resp";

export async function checkAdminToken(c: Context, next: Next) {
  const authKey = c.env.COME_ADMIN_AUTH_TOKEN;
  if (!authKey) {
    return c.json(
      errorResp("admin AUTH TOKEN is not set, please contact site manager"),
      500,
    );
  }
  const reqToken = c.req.header("X-COME-ADMIN-AUTH-TOKEN");

  console.log(reqToken, authKey, typeof reqToken, typeof authKey);

  if (String(authKey) !== String(reqToken)) {
    return c.json(errorResp("Admin auth token authorized failed"), 401);
  }
  return await next();
}
