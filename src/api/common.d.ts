export enum ErrorType {
    NeedLogin = 'NEED_LOGIN',
    LoginExpired = 'LOGIN_EXPIRED',
    DataExists = 'DATA_EXISTS',
    DataNotFound = 'DATA_NOT_FOUND',
    DataNotFoundCannotBeDeleted = 'DATA_NOT_FOUND_CAN_NOT_DELETED',
    DataNotFoundCannotBeUpdated = 'DATA_NOT_FOUND_CAN_NOT_UPDATED',
    InvalidPassword = 'INVALID_PASSWORD',
    InvalidAccount = 'INVALID_ACCOUNT',
    DisabledUser = 'DISABLED_USER',
  }