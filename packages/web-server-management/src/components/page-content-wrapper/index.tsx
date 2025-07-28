import React from "react";
import { ReactNode } from "react";
import * as styles from "./index.module.less";

interface IProps {
  title: string;
  children?: ReactNode;
}

export const PageContentWrapper = (props: IProps) => {
  const { title, children } = props;
  return (
    <div className={styles.page_content_wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
