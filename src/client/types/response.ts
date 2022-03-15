export type Response<T> = {
  meta: {
    status: string;
    message: string;
  };
  data: T;
};
