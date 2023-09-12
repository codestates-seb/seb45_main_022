export enum ErrorCode {
  PASSWORD_DUPLICATION = 'U003',
  EMAIL_DUPLICATION = 'U004',
  NICKNAME_DUPLICATION = 'U005',
  INVALID_INPUT = 'V000',
  FILE_NOT_FOUND = 'f000',
  FILE_SIZE_EXCEEDED = 'f001',
  FILE_NOT_IMAGE = 'I001',
}

export const ERROR_MSG: Record<ErrorCode, string> = {
  [ErrorCode.PASSWORD_DUPLICATION]: 'Existing password',
  [ErrorCode.EMAIL_DUPLICATION]: 'Existing email address',
  [ErrorCode.NICKNAME_DUPLICATION]: 'Existing nickname',
  [ErrorCode.INVALID_INPUT]: 'Invalid input',
  [ErrorCode.FILE_NOT_FOUND]: 'File not found',
  [ErrorCode.FILE_SIZE_EXCEEDED]: 'File size exceeded',
  [ErrorCode.FILE_NOT_IMAGE]: 'File is not image',
};

export interface ErrorType {
  status: number;
  message: string;
  errorCode: ErrorCode;
}
