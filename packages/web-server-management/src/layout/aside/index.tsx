import { Menu, MenuProps } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const MENU_ITEMS: MenuItem[] = [
  {
    key: "comments-management",
    label: "评论管理",
  },
  {
    key: "token-management",
    label: "Token管理",
  },
];

export const AsideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      selectedKeys={[location.pathname.substring(1)]}
      onClick={(info) => {
        const { key } = info;
        navigate(`${!key.startsWith("/") ? "/" : ""}${key}`);
      }}
      style={{ width: "100%", height: "100%" }}
      mode={"vertical"}
      items={MENU_ITEMS}
    />
  );
};
