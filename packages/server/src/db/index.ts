import { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";

/**
 * Drizzle封装后的DB对象
 * https://orm.drizzle.team/docs/connect-cloudflare-d1
 * @param c
 */
export const drizzleDbWrapper = (c: Context) => {
  const rawDb = c.env.MY_COME_DB;
  return drizzle(rawDb);
};
