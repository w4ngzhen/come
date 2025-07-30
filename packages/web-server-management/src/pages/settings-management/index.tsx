import React from "react";
import * as styles from "./index.module.less";
import { Button, Form, FormProps, Input } from "antd";
import { useSettings } from "../../hooks";
import { PageContentWrapper } from "../../components/page-content-wrapper";

type FieldType = {
  token?: string;
  serviceUrl?: string;
};

export const SettingsManagement = () => {
  const { setSettings, settings, desensitizeAuthToken } = useSettings();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { token, serviceUrl } = values;
    setSettings({ ...settings, serviceUrl, adminAuthToken: token });
  };

  return (
    <PageContentWrapper title={"Token设置"}>
      <div className={styles.settings_management}>
        <p>当前 TOKEN: {desensitizeAuthToken || "无"}</p>
        <p>当前 service URL: {settings?.serviceUrl || "无"}</p>
        <div className={styles.form}>
          <Form
            name="basic"
            layout={"vertical"}
            style={{ width: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="COME_ADMIN_AUTH_TOKEN"
              name="token"
              rules={[
                {
                  required: true,
                  message: "请填写 COME_ADMIN_AUTH_TOKEN",
                },
              ]}
            >
              <Input width={"100%"} />
            </Form.Item>
            <Form.Item<FieldType>
              label="serviceUrl"
              name="serviceUrl"
              rules={[
                {
                  required: true,
                  message: "请填写 serviceUrl",
                },
              ]}
            >
              <Input width={"100%"} />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                设置
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PageContentWrapper>
  );
};
