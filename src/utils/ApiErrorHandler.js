const selectErrorCode = (error) => {
  if (error && error.response) {
    return Number(error.response.status);
  }

  if (error && error.request) {
    return 500;
  }

  return 500;
};

const selectErrorMessage = (error) => {
  if (error && error.response) {
    return error.response.data.error || error.response.data.message;
  }

  if (error && error.request) {
    return error.message;
  }
};

export default class ApiErrorHandler {
  static handle(error) {
    if (selectErrorCode(error) === 403) {
      return;
    }

    if (
      selectErrorCode(error) === 400 ||
      selectErrorCode(error) === 401 ||
      selectErrorCode(error) === 404 ||
      selectErrorCode(error) === 409 ||
      selectErrorCode(error) === 415 ||
      selectErrorCode(error) === 422
    ) {
      return;
    }
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }
}
