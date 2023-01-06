import { useCallback } from "react";

export const useRerender = (updateState: (value: {}) => void) => useCallback(() => updateState({}), []);
