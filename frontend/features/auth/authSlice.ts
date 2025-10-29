// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; name: string } | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
};

// This slice manages the authentication state of the application.
// It includes actions for starting a login, successfully logging in, and logging out.
// The initial state includes user information, token, and a loading flag.
// The `loginStart` action sets the loading state to true, while `loginSuccess` updates the user and token and resets the loading state.
// The `logout` action clears the user and token, effectively logging the user out.
// The slice can be used in conjunction with Redux Toolkit's createSlice to handle authentication logic in a Redux store.
// It is typically used in applications that require user authentication, such as login and logout functionalities.
// The slice can be extended with additional actions for handling errors or other authentication-related tasks as needed.
// The `authSlice` can be integrated into the Redux store to manage authentication state across the application.
// It can be used in conjunction with other slices to create a comprehensive state management solution for user authentication.
// The slice can be imported and used in components or hooks to access the authentication state and dispatch actions.
// It can also be combined with middleware for handling asynchronous actions, such as API calls for logging in or out.
// The `authSlice` can be used in conjunction with selectors to retrieve the authentication state in a type-safe manner.
// This slice can be tested using Redux Toolkit's testing utilities to ensure that the actions and reducers work as expected.

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<{ user: { id: string; name: string } | null; token: string }>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

