import dayjs from "dayjs"; // 新增：导入 dayjs

/**
 * 格式化 Unix 时间戳（秒级）为本地时间字符串
 */
export function formatUnixTime(timestamp: number): string {
  if (!timestamp) return "-";
  // 修改：使用 dayjs 格式化时间（支持更灵活的格式定义）
  return dayjs.unix(timestamp).format("YYYY/MM/DD HH:mm:ss");
}
