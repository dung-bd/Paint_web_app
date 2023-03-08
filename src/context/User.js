import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(() => true);
      setUserInfo(() => user);
    }
    if (isLogin) navigate("/");
  }, [isLogin]);

  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};
