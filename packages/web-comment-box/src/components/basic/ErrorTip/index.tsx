import * as styles from "./index.module.less";

export const ErrorTip = (props: { error: string }) => {
  const { error } = props;
  return <div className={styles.come_comment_box__error_tip}>{error}</div>;
};
