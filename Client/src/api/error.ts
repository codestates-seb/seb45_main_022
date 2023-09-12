export enum ErrorCode {
  PASSWORD_DUPLICATION = 'U003',
  EMAIL_DUPLICATION = 'U004',
  NICKNAME_DUPLICATION = 'U005',
  INVALID_INPUT = 'V000',
}

export const ERROR_MSG = {
  [ErrorCode.PASSWORD_DUPLICATION]: 'Existing password',
  [ErrorCode.EMAIL_DUPLICATION]: 'Existing email address',
  [ErrorCode.NICKNAME_DUPLICATION]: 'Existing nickname',
  [ErrorCode.INVALID_INPUT]: 'Invalid input',
};

export interface ErrorType {
  status: number;
  message: string;
  errorCode: ErrorCode;
}
