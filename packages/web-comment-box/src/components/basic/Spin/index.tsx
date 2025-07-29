import { CSSProperties } from "preact/compat";
import "./index.less";
import { IconLoading } from "../icons";
import { baseClassSupplier, cls } from "../../../utils";

const baseCls = baseClassSupplier("spin");

export function Spin(props: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cls(baseCls(), props.className)}
      style={{
        ...(props.style || {}),
      }}
    >
      <IconLoading />
    </div>
  );
}
