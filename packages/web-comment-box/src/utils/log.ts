export const logger = {
  info: (msg: string): void => {
    console.log("[ComeCommentBox]", msg);
  },
  error: (msg: string): void => {
    console.error("[ComeCommentBox]", msg);
  }
}