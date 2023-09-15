export enum ErrorCode {
  NOT_AUTHORIZED = '401',
  PASSWORD_DUPLICATION = 'U003',
  EMAIL_DUPLICATION = 'U004',
  NICKNAME_DUPLICATION = 'U005',
  INVALID_INPUT = 'V000',
  FILE_NOT_FOUND = 'f000',
  FILE_SIZE_EXCEEDED = 'f001',
  FILE_NOT_IMAGE = 'I001',
  CATEGORY_ID_EXCEEDED = 'P000',
  CHECK_IN_ALREADY = 'A000',
}

export const ERROR_MSG: Record<ErrorCode, string> = {
  [ErrorCode.NOT_AUTHORIZED]: 'Not authorized',
  [ErrorCode.PASSWORD_DUPLICATION]: 'Existing password',
  [ErrorCode.EMAIL_DUPLICATION]: 'Existing email address',
  [ErrorCode.NICKNAME_DUPLICATION]: 'Existing nickname',
  [ErrorCode.INVALID_INPUT]: 'Invalid input',
  [ErrorCode.FILE_NOT_FOUND]: 'File not found',
  [ErrorCode.FILE_SIZE_EXCEEDED]: 'File size exceeded',
  [ErrorCode.FILE_NOT_IMAGE]: 'File is not image',
  [ErrorCode.CATEGORY_ID_EXCEEDED]: 'ID exceeded',
  [ErrorCode.CHECK_IN_ALREADY]: 'Already checked in',
};

export interface ErrorType {
  status: number;
  message: string;
  errorCode: ErrorCode;
}
