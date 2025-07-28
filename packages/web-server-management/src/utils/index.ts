/**
 * 对字符串进行脱敏处理，只保留前2个和后2个字符，中间用三个*代替
 * @param str 要处理的字符串
 * @returns 处理后的脱敏字符串
 */
export function desensitizeString(str: string): string {
  if (!str || typeof str !== "string") {
    return "";
  }
  if (str.length <= 4) {
    return "***";
  }
  const firstTwo = str.slice(0, 2);
  const lastTwo = str.slice(-2);
  return `${firstTwo}***${lastTwo}`;
}
