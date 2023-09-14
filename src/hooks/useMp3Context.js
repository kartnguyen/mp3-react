import { useContext } from "react";
import { Mp3context } from "../context/Mp3context";

export const useMp3Context = () => {
  const context = useContext(Mp3context);

  return { ...context };
};
