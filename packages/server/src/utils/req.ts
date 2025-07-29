import { Context } from "hono";
import { convertStrToIntNumber } from "./parser";

/**
 * 从GET请求中提取分页参数
 * @param c
 */
export function extractGetReqOffsetAndLimit(c: Context): {
  offset: number;
  limit: number;
} {
  const { page_number = 1, page_size = 10 } = c.req.query();
  const handledPageNumber = convertStrToIntNumber(page_number, 1);
  const handledPageSize = convertStrToIntNumber(page_size, 10);
  return {
    limit: handledPageSize,
    offset: (handledPageNumber - 1) * handledPageSize,
  };
}
