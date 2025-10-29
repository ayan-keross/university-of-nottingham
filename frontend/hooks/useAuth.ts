// hooks/useAuth.ts
import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    isGuest: !isAuthenticated,
  };
};
// This hook provides access to the authentication state, including user details, token, and authentication status.
// It uses the custom Redux hooks to access the state from the store, making it easy to integrate authentication checks throughout the application.