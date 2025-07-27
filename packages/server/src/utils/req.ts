import { Context } from "hono";
import { convertStrToIntNumber } from "./parser";

/**
 *
 * @param c
 */
export function extractGetReqOffsetAndLimit(c: Context): {
  offset: number;
  limit: number;
} {
  const pageNumber = convertStrToIntNumber(c.req.param("pageNumber"), 1);
  const pageSize = convertStrToIntNumber(c.req.param("pageSize"), 10);
  return {
    limit: pageSize,
    offset: (pageNumber - 1) * pageSize,
  };
}
