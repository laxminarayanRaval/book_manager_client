import React, { createContext, useContext } from "react";

const BookFormContext = createContext();

export const BookFormProvider = BookFormContext.Provider;

export const useBookForm = () => {
  const context = useContext(BookFormContext);
  if (!context) {
    throw new Error("useBookForm must be used within a BookFormProvider");
  }
  return context;
};
