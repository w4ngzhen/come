import React from "react";
import * as styles from "./index.module.less";
import { Button, Form, FormProps, Input } from "antd";
import { ManagementSettings, useSettings } from "../../hooks";
import { PageContentWrapper } from "../../components/page-content-wrapper";
import { createServiceUrlMap } from "../../service/base";

export const SettingsManagement = () => {
  const { setSettings, settings } = useSettings();

  const onFinish: FormProps<ManagementSettings>["onFinish"] = (values) => {
    const { adminAuthToken, serviceUrl } = values;
    setSettings({ ...settings, serviceUrl, adminAuthToken });
  };

  const buildServiceApiUrlInfo = (serviceUrl: string) => {
    if (!serviceUrl) {
      return null;
    }
    const { queryCommentUrl, markCommentStatusUrl } =
      createServiceUrlMap(serviceUrl);
    return (
      <div>
        <p>查询评论 API: {queryCommentUrl}</p>
        <p>标记评论状态 API: {markCommentStatusUrl}</p>
      </div>
    );
  };

  return (
    <PageContentWrapper title={"设置"}>
      <div className={styles.settings_management}>
        <div className={styles.form}>
          <Form
            name="basic"
            layout={"vertical"}
            style={{ width: 600 }}
            initialValues={{
              adminAuthToken: settings?.adminAuthToken,
              serviceUrl: settings?.serviceUrl,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<ManagementSettings>
              label="COME_ADMIN_AUTH_TOKEN"
              name="adminAuthToken"
              rules={[
                {
                  required: true,
                  message: "请填写 COME_ADMIN_AUTH_TOKEN",
                },
              ]}
            >
              <Input.Password width={"100%"} />
            </Form.Item>
            <Form.Item<ManagementSettings>
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
            {buildServiceApiUrlInfo(settings?.serviceUrl)}
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
