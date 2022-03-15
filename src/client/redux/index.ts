import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { authApiReducer, authApiMiddleware } from "./modules/auth";

export const makeStore = () =>
  configureStore({
    reducer: {
      ...authApiReducer,
    },
    middleware: (gDM) => gDM().concat([authApiMiddleware]),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
