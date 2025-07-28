import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import type { SitePage } from "/Users/w4ngzhen/projects/web-projects/come/packages/common/src/index.ts";
import { SITE_SERVICE } from "../../service/base";
import { PageContentWrapper } from "../../components/page-content-wrapper";

export const SitePages: React.FC = () => {
  const [dataSource, setDataSource] = useState<SitePage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: "uid",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Page Key",
      dataIndex: "pageKey",
      key: "pageKey",
    },
    {
      title: "Page Name",
      dataIndex: "pageName",
      key: "pageName",
    },
  ];

  const loadData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const result = await SITE_SERVICE.getSitePagesByPagination({
        pageInfo: {
          pageNumber: page,
          pageSize,
        },
      });
      setDataSource(result.itemList);
      setTotal(result.total);
      setCurrentPage(page);
      setPageSize(pageSize);
    } catch (error) {
      message.error(`获取站点页面失败: ${error.message || "未知错误"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage, pageSize);
  }, []);

  const handleTableChange = (current: number, pageSize: number) => {
    loadData(current, pageSize);
  };

  return (
    <PageContentWrapper title={"站点页面"}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: handleTableChange,
        }}
        rowKey="uid"
      />
    </PageContentWrapper>
  );
};
