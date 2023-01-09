import { useCallback, useState } from "react";

export const useRerender = () => {
    const [renderState, updateState] = useState<Record<string, never>>({});
    const updateRenderState = useCallback(() => updateState({}), []);
    return { renderState, updateRenderState };
};

export const useLoadSignal = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const signalLoad = useCallback(() => {
        setLoaded(true);
    }, []);
    return { loaded, signalLoad };
};
