/**
 * data page info
 */
export interface PageInfo {
  /**
   * page number, base 1(not 0)
   */
  pageNumber: number;
  /**
   * page size
   */
  pageSize: number;
}

export interface PageResult<TItem = unknown> {
  /**
   * total count
   */
  total: number;
  /**
   * item list
   */
  itemList: TItem[];
}

export interface ResponseData<T = unknown> {
  success: boolean;
  errorMessage?: string;
  data?: T;
}
