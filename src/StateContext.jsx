import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function StateContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const states = {
    user,
    setUser,
  };

  return (
    <StateContext.Provider value={states}>
      {children}
    </StateContext.Provider>
  );
}

export default StateContext;
