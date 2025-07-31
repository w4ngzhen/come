/**
 * 结果结构体
 */
export interface Result<T = unknown> {
  /**
   * 响应状态
   */
  success: boolean;
  /**
   * 出错相应内容
   */
  err_msg?: string;
  /**
   * 响应数据
   */
  data?: T;
}

/**
 * data page info
 * 数据分页信息
 */
export interface PageInfo {
  /**
   * page number, base 1(not 0)
   * 页码，基于1的页码
   */
  page_number: number;
  /**
   * page size
   * 每页数量
   */
  page_size: number;
}

/**
 * 排序
 */
export interface SortInfo {
  /**
   * 排序字段
   */
  sort_field?: string;
  /**
   * 排序方向
   */
  sort_order?: "asc" | "desc";
}

/**
 * page result struct
 * 数据分页结果
 */
export interface PageResult<TItem = unknown> {
  /**
   * total count
   * 总数量
   */
  total: number;
  /**
   * item list
   * 数据列表
   */
  items: TItem[];
}
