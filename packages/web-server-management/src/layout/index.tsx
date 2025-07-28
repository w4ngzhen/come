import React, { useEffect } from "react";
import { Layout } from "antd";
import * as styles from "./index.module.less";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { useLocalAuthToken } from "../hooks";
import { AsideMenu } from "./aside";

export const AppLayout = () => {
  const navigate = useNavigate();
  const { authToken } = useLocalAuthToken();

  useEffect(() => {
    if (!authToken) {
      navigate("/setup-token");
    } else {
      navigate("/site-pages");
    }
  }, [authToken]);

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
