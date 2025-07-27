export { PageInfo, ResponseData, PageResult } from "./communication";

/**
 * site page(s) info
 */
export interface SitePage {
  /**
   * db uid, primary key
   */
  uid: number;
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
   * page key
   */
  pageKey: string;
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
