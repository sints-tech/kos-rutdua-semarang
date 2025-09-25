import {
    useState,
    useEffect
} from "react";
export const isBrowser = () => typeof document === "object";
export function usePageVisibility() {
    if (!isBrowser()) return;
    const [isVisible, setIsVisible] = useState(!document.hidden);
    useEffect(() => {
        const onVisibilityChange = () => setIsVisible(!document.hidden);
        document.addEventListener("visibilitychange", onVisibilityChange, false);
        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);
    return isVisible;
}
export const __FramerMetadata__ = {
    "exports": {
        "isBrowser": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "usePageVisibility": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./UsePageVisibility.map