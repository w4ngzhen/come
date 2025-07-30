import { CSSProperties } from "preact/compat";
import { IconLoading } from "../icons";
import { cls } from "../../../utils";
import * as styles from "./index.module.less";

export function Spin(props: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cls(styles.come_comment_box__spin, props.className)}
      style={{
        ...(props.style || {}),
      }}
    >
      <IconLoading />
    </div>
  );
}
