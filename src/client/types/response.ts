export type Response<T> = {
  meta: {
    status: string;
    message: string;
  };
  data: T;
};

export type ErrorMessage = "LOGIN_INVALID";
