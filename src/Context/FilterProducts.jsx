import { createContext, useEffect, useState } from "react";

export const FilterProducts = createContext(null);

function FilterProductsProvider({ children }) {
  const [price, setPrice] = useState(0);
  const [wordSearch, setWordSearch] = useState("");
  const [type, setType] = useState("home");

  const [expired, setExpired] = useState(true);
  const [userData, setUserData] = useState(null);

  const [messages, setMessages] = useState([]);
  const [element, setElement] = useState(() => {
    return localStorage.getItem("element")
      ? JSON.parse(localStorage.getItem("element"))
      : null;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "ع";
  });

  // Save language only
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Save element only if exists
  useEffect(() => {
    if (element !== null && element !== undefined) {
      localStorage.setItem("element", JSON.stringify(element));
    }
  }, [element]);

  return (
    <FilterProducts.Provider
      value={{
        price,
        setPrice,
        wordSearch,
        setWordSearch,
        type,
        setType,

        expired,
        setExpired,

        userData,
        setUserData,

        messages,
        setMessages,

        element,
        setElement,

        language,
        setLanguage,
      }}
    >
      {children}
    </FilterProducts.Provider>
  );
}

export default FilterProductsProvider;
