// context/authHandlers.ts
type AuthHandler = () => void;

// External handlers for use outside React components
let loginHandler: AuthHandler = () => {};
let logoutHandler: AuthHandler = () => {};

export const authHandlers = {
  login: () => loginHandler(),
  logout: () => logoutHandler()
};

export const setAuthHandlers = (
  login: AuthHandler,
  logout: AuthHandler
) => {
  loginHandler = login;
  logoutHandler = logout;
};

// Export a function to get the handlers
export const getExternalAuthHandlers = () => authHandlers;