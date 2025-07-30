import * as styles from "./index.module.less";
import { cls } from "../../utils";
import { Fragment } from "preact";

interface IProps {
  /** 总条数 */
  total: number;
  /** 当前页码 */
  pageNumber: number;
  /** 每页条数 */
  pageSize: number;
  /** 页码变更回调 */
  onPageChange: (pageNumber: number) => void;
  /** 中间显示的页码数量（不含首页和末页） */
  visiblePageCount?: number;
}

export const SimplePager = (props: IProps) => {
  const {
    pageNumber,
    pageSize,
    total,
    onPageChange,
    visiblePageCount = 3,
  } = props;

  // 计算总页数
  const totalPages = Math.ceil(total / pageSize);

  // 没有数据或只有一页时不显示分页器
  if (total <= 0 || totalPages <= 1) return null;

  // 生成页码显示列表
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    // 添加首页
    pages.push(1);

    // 计算当前页左右可见页码范围
    const halfVisible = Math.floor(visiblePageCount / 2);
    let startPage = Math.max(2, pageNumber - halfVisible);
    let endPage = Math.min(totalPages - 1, pageNumber + halfVisible);

    // 确保可见页码数量充足
    if (endPage - startPage < visiblePageCount - 1) {
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, startPage + visiblePageCount - 1);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - visiblePageCount + 1);
      }
    }

    // 添加开始省略号
    if (startPage > 2) {
      pages.push("...");
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 添加结束省略号
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // 添加末页
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // 页码点击处理
  const handlePageClick = (page: number) => {
    if (page !== pageNumber) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.come_comment_box__simple_pager}>
      {/* 页码列表 */}
      <div className={styles.page_numbers}>
        {pageNumbers.map((page, index) => (
          <Fragment key={index}>
            {typeof page === "number" ? (
              <button
                className={cls(
                  styles.page_number,
                  page === pageNumber ? styles.active : null,
                )}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ) : (
              <span className={styles.ellipsis}>...</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
