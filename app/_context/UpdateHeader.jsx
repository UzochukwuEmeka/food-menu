"use client";

import { createContext, useState } from "react";

export const UpdateHeader = createContext(null);

const UpdateProvider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <UpdateHeader.Provider value={{ updateCart, setUpdateCart }}>
      {children}
    </UpdateHeader.Provider>
  );
};

export default UpdateProvider