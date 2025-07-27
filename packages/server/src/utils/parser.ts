export function convertStrToIntNumber(
  str: string | undefined | null,
  defaultNum: number,
) {
  if (typeof str === "number") {
    return str;
  } else if (typeof str === "string") {
    const num = parseInt(str);
    if (isNaN(num)) {
      return defaultNum;
    }
    return isNaN(num) ? defaultNum : num;
  } else {
    return defaultNum;
  }
}
