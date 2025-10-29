// store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import { authApi } from "@/features/auth/authApi";
import usersReducer from "@/features/users/usersSlice";
import { usersApi } from "@/features/users/usersApi";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
