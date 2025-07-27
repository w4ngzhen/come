export { PageInfo, ResponseData, PageResult } from "./communication";

/**
 * site info
 */
export interface SiteInfo {
  /**
   * db uid, primary key
   */
  uid: number;
  /**
   * site key
   */
  siteKey: string;
  /**
   * site name
   */
  siteName: string;
  /**
   * UTC second timestamp
   */
  createTime: number;
}

/**
 * site page(s) info
 */
export interface SitePage {
  /**
   * db uid, primary key
   */
  uid: number;
  /**
   * related site
   */
  relatedSiteKey: string;
  /**
   * page key
   */
  pageKey: string;
  /**
   * page name
   */
  pageName: string;
}

/**
 * page comment(s)
 */
export interface PageComment {
  /**
   * db uid, primary key
   */
  uid: number;
  /**
   * The nickname of the person who left the comment
   */
  userNickname: string;
  /**
   * email id after algorithm digest
   */
  userEmailId: string;
  /**
   * desensitized email string
   * for example, "abc@xxx.com" will convert to "a***c@xxx.com"
   */
  userEmail: string;
  /**
   * the comment content
   */
  content: string;
  /**
   * the comment submit time
   * UTC second timestamp
   */
  submitTime: number;
  /**
   * if this comment is reply for another one comment,
   * this field will record the context.
   */
  relatedCommentUid?: number;
}
