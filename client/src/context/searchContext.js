import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  destination: undefined,
  date: [
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("date", JSON.stringify(state.date));
  }, [state.date]);

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(state.options));
  }, [state.options]);

  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        date: state.date,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
