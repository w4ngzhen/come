import React, { useState, useEffect } from "react";
import {
  Table,
  message,
  Input,
  Select,
  Row,
  Col,
  TableColumnsType,
  TableProps,
} from "antd";
import { QueryCommentsFilter, SITE_SERVICE } from "../../service/base";
import { PageContentWrapper } from "../../components/page-content-wrapper";
import { Comment, SortInfo, PageInfo } from "@come/common";
// 新增：导入时间格式化工具和状态映射
import { formatUnixTime } from "../../utils/date";
import { COMMENT_STATUS_MAP } from "../../constants/comment";
import { SorterResult } from "antd/es/table/interface";

export const CommentsManagement: React.FC = () => {
  const [dataSource, setDataSource] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // 新增：筛选条件状态
  const [filters, setFilters] = useState<QueryCommentsFilter>({
    user_nickname: "",
    content: "",
    status: [],
  });
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page_size: 10,
    page_number: 1,
  });
  const [sortInfo, setSortInfo] = useState<SortInfo>({});

  // 新增：表格列配置（支持提交时间排序）
  const columns: TableColumnsType<Comment> = [
    {
      title: "ID",
      dataIndex: "uid",
      key: "uid",
      width: 80,
    },
    {
      title: "站点Key",
      dataIndex: "site_key",
      key: "site_key",
      width: 120,
    },
    {
      title: "页面Key",
      dataIndex: "page_key",
      key: "page_key",
      width: 120,
    },
    {
      title: "用户昵称",
      dataIndex: "user_nickname",
      key: "user_nickname",
      width: 120,
    },
    {
      title: "用户邮箱",
      dataIndex: "user_email",
      key: "user_email",
      width: 180,
    },
    {
      title: "评论内容",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: number) => COMMENT_STATUS_MAP[status] || "未知",
    },
    {
      title: "关联评论ID",
      dataIndex: "related_comment_uid",
      key: "related_comment_uid",
      width: 120,
      render: (uid?: number) => uid || "-",
    },
    {
      title: "提交时间",
      dataIndex: "submit_time",
      key: "submit_time",
      width: 180,
      render: (time: number) => formatUnixTime(time), // 格式化时间戳
      sorter: true, // 启用排序
      sortDirections: ["ascend", "descend"], // 支持正序/倒序
    },
  ];

  const loadData = async (
    filters?: QueryCommentsFilter,
    pageInfo?: PageInfo,
    sorterInfo?: SortInfo,
  ) => {
    console.debug("loadData", filters, pageInfo, sorterInfo);
    setLoading(true);
    try {
      const result = await SITE_SERVICE.queryComments({
        pageInfo,
        sorterInfo,
        filters,
      });
      setDataSource(result.items);
      setTotal(result.total);
    } catch (error) {
      message.error(`获取评论失败: ${error.message || "未知错误"}`);
    } finally {
      setLoading(false);
    }
  };

  // 新增：筛选条件变化处理
  const handleFilterChange = (
    field: keyof typeof filters,
    value: QueryCommentsFilter[keyof typeof filters],
  ) => {
    console.debug("handleFilterChange", field, value);
    const changedFilters = { ...filters, [field]: value };
    setFilters(changedFilters);
    // 重置到第一页
    const resetPageInfo = {
      ...pageInfo,
      page_number: 1,
    };
    setPageInfo(resetPageInfo);
    loadData(changedFilters, resetPageInfo, sortInfo);
  };

  useEffect(() => {
    loadData(filters, pageInfo, sortInfo);
  }, []);

  let onTableChange: TableProps<Comment>["onChange"] = (
    pagination,
    _filters,
    sorter: SorterResult<Comment>,
    _extra,
  ) => {
    const pageInfo: PageInfo = {
      page_size: pagination.pageSize,
      page_number: pagination.current,
    };
    const sortInfo: SortInfo = {
      sort_field: String(sorter.field),
      sort_order: sorter.order === "descend" ? "desc" : "asc",
    };
    setPageInfo(pageInfo);
    setSortInfo(sortInfo);
    loadData(filters, pageInfo, sortInfo);
  };

  return (
    <PageContentWrapper title={"评论管理"}>
      {/* 新增：筛选区域 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            style={{ width: "100%" }}
            placeholder="请输入用户昵称"
            value={filters.user_nickname}
            onChange={(e) =>
              handleFilterChange("user_nickname", e.target.value)
            }
            allowClear
          />
        </Col>
        <Col span={6}>
          <Input
            style={{ width: "100%" }}
            placeholder="请输入评论内容"
            value={filters.content}
            onChange={(e) => handleFilterChange("content", e.target.value)}
            allowClear
          />
        </Col>
        <Col span={6}>
          <Select<number[]>
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="请选择评论状态"
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            allowClear
            options={[
              { label: "审核中", value: "0" },
              { label: "已通过", value: "1" },
              { label: "已拒绝", value: "2" },
              { label: "已删除", value: "3" },
            ]}
          />
        </Col>
      </Row>

      <Table<Comment>
        rowKey="uid"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: pageInfo.page_number,
          pageSize: pageInfo.page_size,
          total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        onChange={onTableChange}
      />
    </PageContentWrapper>
  );
};
