import { createContext, useContext } from "react";

interface DirectionContextType {
  isRtl: boolean;
  currentLang: string;
}

export const DirectionContext = createContext<DirectionContextType>({
  isRtl: false,
  currentLang: "en",
});

export const useDirection = () => useContext(DirectionContext);
