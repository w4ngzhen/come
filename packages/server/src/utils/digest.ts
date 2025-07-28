/**
 * 计算字符串的 md5 值
 */
async function md5(str: string) {
  const msgUint8 = new TextEncoder().encode(str); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("MD5", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  // convert bytes to hex string
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
