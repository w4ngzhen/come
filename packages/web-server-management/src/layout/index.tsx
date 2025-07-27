import React, { useEffect } from "react";
import { Layout } from "antd";
import * as styles from "./index.module.less";
import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import { AsideMenu } from "./aside-menu";
import { Header } from "./header";

export const AppLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/site-info");
  //   // 导航
  //   console.debug("AppLayout navigate to /site-info");
  // }, []);

  return (
    <Layout className={styles.app_layout}>
      <Layout.Header className={styles.header_style}>
        <Header />
      </Layout.Header>
      <Layout>
        <Layout.Sider width="240px" className={styles.aside_style}>
          <AsideMenu />
        </Layout.Sider>
        <Layout.Content className={styles.content_style}>
          <Outlet />
        </Layout.Content>
      </Layout>
      <Layout.Footer className={styles.footer_style}>
        <div className={styles.info}>come</div>
      </Layout.Footer>
    </Layout>
  );
};
