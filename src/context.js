import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("vodka"); // cange leter to null
  const [cocktails, setCocktails] = useState([]);
  const [showContent, setShowContent] = useState(false)

  const fetchData = useCallback( async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${url}${searchText}`);
      const data = await resp.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((drink) => {
          const {
            strDrink,
            idDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = drink;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails)
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },[searchText])
  console.log(cocktails);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchText) {
        fetchData();
        
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchText,fetchData]);

  console.log(searchText);
  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchText,showContent,setShowContent, }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
