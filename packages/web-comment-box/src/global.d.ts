declare module "*.module.less" {
  const classes: { [key: string]: string };
  // css-loader >= v7, USE:
  // d.ts:
  // export = classes
  // WHEN YOUR CODE IS:
  // import * as style from "./style.css";
  // console.log(style.myClass);

  export = classes;
  // css-loader < v7, USE:
  // export default classes;
  // WHEN YOUR CODE IS:
  // import style from "./style.css";
  // console.log(style.myClass);
}
