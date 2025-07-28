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
  errorMessage?: string;
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
  pageNumber: number;
  /**
   * page size
   * 每页数量
   */
  pageSize: number;
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
  itemList: TItem[];
}
