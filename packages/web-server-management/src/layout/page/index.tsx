import React from "react";
import { ReactNode } from "react";
import * as styles from "./index.module.less";

interface IProps {
  title: string;
  children?: ReactNode;
}

export const Page = (props: IProps) => {
  const { title, children } = props;
  return (
    <div className={styles.page}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
