import React from "react";
import * as styles from "./index.module.less";
import { Button, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocalAuthToken } from "../../hooks";

type FieldType = {
  token?: string;
};

export const SetupToken = () => {
  const navigate = useNavigate();

  const { desensitizeAuthToken, setAuthToken } = useLocalAuthToken();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { token } = values;
    setAuthToken(token);
    navigate("/site-pages");
  };

  return (
    <div className={styles.setup_token}>
      <div className={styles.title}>COME 管理后台</div>
      <div className={styles.token}>
        当前 TOKEN: {desensitizeAuthToken || "无"}
      </div>
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

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              设置TOKEN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
