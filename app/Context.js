"use client";
import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();

function Context({ children }) {
  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    const id = window.sessionStorage.getItem("id");
    if (id) {
      setSessionId(id);
    }
  }, []);
  return (
    <MyContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </MyContext.Provider>
  );
}

export default Context;
