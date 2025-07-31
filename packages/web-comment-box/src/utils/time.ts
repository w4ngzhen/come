/**
 * 将UTC时间毫秒数转换为YYYY-MM-DD HH:mm:ss格式
 * @param utcMillis - UTC时间毫秒数（如Date.now()）
 * @param [timeZone] - 目标时区（如'America/New_York'），默认使用系统时区
 * @returns {string} 格式化后的日期时间字符串
 */
export function formatUTCTime(utcMillis: number, timeZone: string = "UTC"): string {
  const date = new Date(utcMillis);

  // 使用Intl.DateTimeFormat处理时区和本地化（兼容性更好）
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 强制24小时制
    timeZone: timeZone || "UTC" // 未指定时区时使用默认值
  });

  const parts = formatter.formatToParts(date); // formatToParts方法需要ES2017
  const partMap: Record<string, string> = {};
  parts.forEach((part) => (partMap[part.type] = part.value));

  return `${partMap.year}-${partMap.month}-${partMap.day} ${partMap.hour}:${partMap.minute}:${partMap.second}`;
}

// 示例用法
// console.log(formatUTCTime(1741564800000, "UTC")); // 指定UTC时区，输出"2025-03-11 00:00:00"