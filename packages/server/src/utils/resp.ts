import { ResponseData } from "@come/common";

export function successResp<T = unknown>(data?: T): ResponseData<T> {
  return {
    success: true,
    data,
  };
}

export function errorResp(err?: string | object): ResponseData {
  let errMsg: string | undefined;
  if (typeof err === "string") {
    errMsg = err;
  } else if (typeof err === "object") {
    errMsg = err.toString();
  } else {
    errMsg = undefined;
  }

  return {
    success: false,
    errorMessage: errMsg,
  };
}
