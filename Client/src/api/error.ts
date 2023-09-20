export enum ErrorCode {
  NOT_AUTHORIZED = '401',
  USER_NOT_FOUND = 'U000',
  USER_DELETED = 'U001',
  PASSWORD_DUPLICATION = 'U003',
  EMAIL_DUPLICATION = 'U004',
  NICKNAME_DUPLICATION = 'U005',
  USER_CANNOT_ACCESS = 'U006',
  INVALID_INPUT = 'V000',
  FILE_NOT_FOUND = 'f000',
  FILE_SIZE_EXCEEDED = 'f001',
  FILE_NOT_IMAGE = 'I001',
  CODE_INVALID = 'P000',
  CHECK_IN_ALREADY = 'A000',
  FEED_NOT_FOUND = 'F000',
  COMMENT_NOT_FOUND = 'C000',
  LIKE_CANNOT_OWN_FEED = 'L000',
}

export const ERROR_MSG: Record<ErrorCode, string> = {
  [ErrorCode.NOT_AUTHORIZED]: 'Not authorized',
  [ErrorCode.USER_NOT_FOUND]: 'User not found',
  [ErrorCode.USER_DELETED]: 'Deleted user',
  [ErrorCode.PASSWORD_DUPLICATION]: 'Existing password',
  [ErrorCode.EMAIL_DUPLICATION]: 'Existing email address',
  [ErrorCode.NICKNAME_DUPLICATION]: 'Existing nickname',
  [ErrorCode.USER_CANNOT_ACCESS]: 'Can not access resource',
  [ErrorCode.INVALID_INPUT]: 'Invalid input',
  [ErrorCode.FILE_NOT_FOUND]: 'File not found',
  [ErrorCode.FILE_SIZE_EXCEEDED]: 'File size exceeded',
  [ErrorCode.FILE_NOT_IMAGE]: 'File is not image',
  [ErrorCode.CODE_INVALID]: 'Invalid code',
  [ErrorCode.CHECK_IN_ALREADY]: 'Already checked in',
  [ErrorCode.FEED_NOT_FOUND]: 'Feed not found',
  [ErrorCode.COMMENT_NOT_FOUND]: 'Comment not found',
  [ErrorCode.LIKE_CANNOT_OWN_FEED]: 'You can not like your own feed',
};

export interface ErrorType {
  status: number;
  message: string;
  errorCode: ErrorCode;
}
