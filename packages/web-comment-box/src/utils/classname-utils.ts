/**
 * classnames简单实现
 * https://www.npmjs.com/package/classnames
 * @param classNames
 */
export const cls = (...classNames: string[]) => {
  return (classNames || []).filter((cn) => !!cn).join(" ");
};
