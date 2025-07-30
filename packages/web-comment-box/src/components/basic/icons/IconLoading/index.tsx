import { CSSProperties } from "preact/compat";
import * as styles from "./index.module.less";
import { cls } from "../../../../utils";

export const IconLoading = (props: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={cls(styles.comeCommentBox__icon_loading, props.className)}
      style={props.style}
    />
  );
};
