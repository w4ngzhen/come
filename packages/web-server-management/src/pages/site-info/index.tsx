import React, { useState } from "react";
import { SiteInfo } from "@come/common";
import { Page } from "../../layout/page";
import * as styles from "./index.module.less";
import { Card, Empty, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export const SiteInfoPage = () => {
  const [sites, setSites] = useState<SiteInfo[]>(mockSites());

  const renderContent = () => {
    if (!sites.length) {
      return <Empty description={"暂无站点"} />;
    }

    return (
      <div className={styles.site_card_pane}>
        {sites.map((site) => {
          const { siteKey, siteName, createTime } = site;
          return (
            <Card title={siteName} hoverable>
              <Typography.Paragraph
                className={styles.card_site_key}
                copyable={{
                  text: siteKey,
                  icon: <CopyOutlined color={"#f5f5f5"} />,
                }}
              >
                site_key: {siteKey}
              </Typography.Paragraph>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <Page title={"站点与页面"}>
      <div className={styles.site_info_content}>{renderContent()}</div>
    </Page>
  );
};

function mockSites(): SiteInfo[] {
  // 定义一些形容词和名词用于生成花哨的 siteName
  const adjectives = [
    "梦幻的",
    "闪耀的",
    "神秘的",
    "奇妙的",
    "炫酷的",
    "迷人的",
    "惊艳的",
    "震撼的",
    "华丽的",
    "独特的",
  ];
  const nouns = [
    "星际空间",
    "魔法城堡",
    "童话世界",
    "科技之巅",
    "梦幻花园",
    "神秘森林",
    "海洋奇观",
    "天空之城",
    "时光隧道",
    "宝藏岛屿",
  ];

  const sites: SiteInfo[] = [];
  for (let i = 0; i < 10; i++) {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    sites.push({
      siteKey: `${i + 1}`,
      siteName: `${randomAdjective}${randomNoun}`,
      createTime: Date.now() - i * 3600 * 1000, // 模拟不同创建时间
      uid: i,
    });
  }
  return sites;
}
