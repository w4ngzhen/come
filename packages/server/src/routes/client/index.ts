import { HonoContext } from "../../types";
import { successResp } from "../../utils/resp";
import { extractGetReqOffsetAndLimit } from "../../utils/req";

export async function queryComments(c: HonoContext) {
  const { offset, limit } = extractGetReqOffsetAndLimit(c);
  return c.json(successResp([]));
}

export async function createComment(c: HonoContext) {
  return c.json(successResp([]));
}
