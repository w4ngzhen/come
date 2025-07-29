import "./index.less";
import { baseClassSupplier } from "../../../utils";

const baseCls = baseClassSupplier("error-tip");

export const ErrorTip = (props: { error: string }) => {
  const { error } = props;
  return <div className={baseCls()}>{error}</div>;
};
