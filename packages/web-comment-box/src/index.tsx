import { render } from "preact";
import { ConfigOptions } from "./interface";
import { CommentBoxComponent } from "./CommentBoxComponent";
import { logger } from "./utils";

export function init(mountEle: string, opts: ConfigOptions) {
  if (!validateOptions(opts)) {
    return;
  }
  logger.info("Prepare mount CommentBox instant");
  render(
    <CommentBoxComponent options={opts} />,
    document.querySelector(mountEle || "#come-comment-box"),
  );
}

function validateOptions(options: ConfigOptions) {
  if (!options) {
    logger.error("ComeCommentBox初始化失败：初始化参数对象为空");
    return false;
  }
  if (!options.serviceBaseUrl) {
    logger.error("ComeCommentBox初始化失败：初始化参数 serviceUrl 为空");
    return false;
  }
  if (!options.siteKey) {
    logger.error("ComeCommentBox初始化失败：初始化参数 siteKey 为空");
    return false;
  }
  if (!options.pageKey) {
    logger.error("ComeCommentBox初始化失败：初始化参数 pageKey 为空");
    return false;
  }
  return true;
}
