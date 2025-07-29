/**
 * 获取当前时间的 UTC 秒数
 */
export const nowUtcSeconds = () => {
  return Math.floor(new Date().getTime() / 1000);
};
