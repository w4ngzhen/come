import { render } from "preact";
import { ConfigOptions } from "./interface";
import { CommentBoxComponent } from "./CommentBoxComponent";

export function init(mountEle: string, opts: ConfigOptions) {
  if (!opts) {
    console.error("CommentBox初始化失败：初始化参数对象为空");
    return;
  }
  const validateNonEmpty = (keys: Array<keyof ConfigOptions>): boolean => {
    if (!keys?.length) {
      return false;
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!opts[key]) {
        console.error(`CommentBox初始化失败：初始化参数 ${key} 为空`);
        return false;
      }
    }
    return true;
  };
  // if (!validateNonEmpty([])) {
  //   return;
  // }
  console.debug("Prepare mount CommentBox instant");
  render(
    <CommentBoxComponent options={opts} />,
    document.querySelector(mountEle || "#comment-box"),
  );
}
