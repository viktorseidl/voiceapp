import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetchAuthAll } from "./useFetchAll";
// Create the context
import CryptoJS from "crypto-js";
const TransactionContext = createContext();

// Create a custom hook for easy usage
export const useLogin = () => useContext(TransactionContext);

// Provider component
export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user object
  const [token, setToken] = useState(null); // JWT or auth token
  const [loading, setLoading] = useState(null); // Login loading state
  const [error, setError] = useState(null); // Error message
  const [roles, setRoles] = useState(null); // Error message
  const [wbereiche, setWbereiche] = useState(null); // Error message
  // Mock login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    const network = await SecureStore.getItemAsync("network");
    let dbconf = null;
    try {
      if (network) {
        dbconf = JSON.parse(network).server;
      } else {
        setError("Netzwerkfehler! Bitte versuchen Sie es erneut.");
        return;
      }
      const userpass = CryptoJS.MD5(password.trim()).toString();
      const check = await useFetchAuthAll(
        dbconf + "/electronbackend/index.php?path=checkCredentials",
        "ssdsdsd",
        "POST",
        {
          dbtype: "pflege",
          user: email.toUpperCase().toString(),
          pass: userpass,
        },
        null
      );

      if (check[0]?.length > 0) {
        console.log("DB FULL OBJECT", JSON.stringify(check));
        SecureStore.setItemAsync("user", JSON.stringify(check[0][0]));
        SecureStore.setItemAsync("userRole", JSON.stringify(check[1]));
        SecureStore.setItemAsync("userWohnbereiche", JSON.stringify(check[2]));
        setRoles(JSON.stringify(check[1]));
        setWbereiche(JSON.stringify(check[2]));
        setUser(JSON.stringify(check[0][0]));
        setToken(true);
        router.push({ pathname: "/home" });
      } else {
        setError("Login fehlgeschlagen! Bitte versuchen Sie es erneut.");
      }
    } catch (err) {
      setError("Login fehlgeschlagen! Bitte versuchen Sie es erneut.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setToken(null);
    setUser(null);
    setWbereiche(null);
    setRoles(null);
    try {
      const userS = await SecureStore.deleteItemAsync("user");
      const rolesS = await SecureStore.deleteItemAsync("userRole");
      const wbereicheS = await SecureStore.deleteItemAsync("userWohnbereiche");
    } finally {
    }
  };
  useEffect(() => {
    const prepare = async () => {
      try {
        const userS = await SecureStore.getItemAsync("user");
        const rolesS = await SecureStore.getItemAsync("userRole");
        const wbereicheS = await SecureStore.getItemAsync("userWohnbereiche");
        if (userS) {
          setRoles(rolesS);
          setUser(userS);
          setWbereiche(wbereicheS);
          setToken(true);
        } else {
        }
      } finally {
      }
    };

    prepare();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        wbereiche,
        roles,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
