import { createContext, useContext } from "react";

const GlobalState = createContext([]); //criar o contexto

export const GlobalStateProvider = GlobalState.Provider;

export function useGlobalStateContext() {
  return useContext(GlobalState);
}

export function useGlobalState() {
  const [globalState] = useGlobalStateContext();
  return globalState;
}

export function useSetGlobalState() {
  const [globalState, setGlobalState] = useGlobalStateContext();
  return setGlobalState;
}
