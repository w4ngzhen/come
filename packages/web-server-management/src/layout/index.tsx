import React from "react";
import { Layout, message } from "antd";
import * as styles from "./index.module.less";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { useSettings } from "../hooks";
import { AsideMenu } from "./aside";

export const AppLayout = () => {
  return (
    <Layout className={styles.app_layout}>
      <Layout.Header className={styles.header_style}>
        <Header />
      </Layout.Header>
      <Layout>
        <Layout.Sider width="120px" className={styles.aside_style}>
          <AsideMenu />
        </Layout.Sider>
        <Layout.Content className={styles.content_style}>
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        </Layout.Content>
      </Layout>
      <Layout.Footer className={styles.footer_style}>
        <div className={styles.info}>come</div>
      </Layout.Footer>
    </Layout>
  );
};

// 路由守卫组件：接收需要保护的子组件和校验条件
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();

  // 1. 特殊路由放行（如设置页本身，避免死循环）
  if (location.pathname === "/settings-management") {
    return <>{children}</>;
  }

  // 2. 核心条件校验（根据你的业务需求调整）
  const isConditionMet = Boolean(
    settings && settings.adminAuthToken && settings.serviceUrl,
  );

  // 3. 条件不满足时重定向到设置页
  if (!isConditionMet) {
    message.error("请先设置相关token以及服务地址");
    // 使用 replace: true 避免将当前未授权路由加入历史记录
    navigate("/settings-management", { replace: true });
    return null; // 条件未满足时不渲染任何内容
  }

  // 4. 条件满足，渲染受保护的路由内容
  return <>{children}</>;
};
