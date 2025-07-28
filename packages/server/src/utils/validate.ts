import { z } from "zod";
import { errRes, okRes } from "./resp";
import { Result } from "@come/common";

export function zodParse<T>(rawData: T, schema: z.ZodObject): Result<T> {
  try {
    const result = schema.safeParse(rawData);
    if (result.success) {
      return okRes(result.data as T);
    } else {
      const errMsg = (result.error.issues || [])
        .map((issue) => issue.message)
        .join(",");
      return errRes(`参数校验失败: ${errMsg}`);
    }
  } catch (e) {
    return errRes(`参数校验处理出错 ${(e as any)?.message}`);
  }
}
