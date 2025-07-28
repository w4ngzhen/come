import React from "react";
import * as styles from "./index.module.less";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useLocalAuthToken } from "../../hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { desensitizeAuthToken } = useLocalAuthToken();

  const renderAction = () => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              label: "设置 token",
              key: "setup_token",
              onClick: () => {
                navigate("/setup-token");
              },
            },
          ],
        }}
      >
        <a style={{ color: "white" }} onClick={(e) => e.preventDefault()}>
          <Space>
            TOKEN:
            {desensitizeAuthToken || "无"}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>COME 管理后台</div>
      <div className={styles.actions}>{renderAction()}</div>
    </div>
  );
};
