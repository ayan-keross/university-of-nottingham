// store/middlewares.ts
 import { authApi } from "@/features/auth/authApi";
 import { usersApi } from "@/features/users/usersApi";

export const middlewares = [authApi.middleware, usersApi.middleware];
