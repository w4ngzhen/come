import "./index.less";
import { CSSProperties } from "preact/compat";
import { baseClassSupplier, cls } from "../../../../utils";

const baseCls = baseClassSupplier("icon-loading");
export const IconLoading = (props: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div className={cls(baseCls(), props.className)} style={props.style} />
  );
};
