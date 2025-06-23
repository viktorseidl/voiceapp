import React, { createContext, useContext, useState } from "react";

// Create the context
const TransactionContext = createContext();

// Create a custom hook for easy usage
export const useLogin = () => useContext(TransactionContext);

// Provider component
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user object
  const [token, setToken] = useState(null); // JWT or auth token
  const [loading, setLoading] = useState(true); // Login loading state
  const [error, setError] = useState(null); // Error message

  // Mock login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with real API call
      const fakeResponse = {
        token: "fake-jwt-token",
        user: {
          id: 1,
          name: "Harald Eber",
          kuerzel: "HAE",
          abteilung: "Pflege",
          gruppenzugehoerigkeit: "Pflegefachkraft",
        },
      };
      setToken(fakeResponse.token);
      setUser(fakeResponse.user);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <TransactionContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
