import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    createStore
} from "https://framer.com/m/framer/store.js@^1.0.0";
import {
    randomColor
} from "https://framer.com/m/framer/utils.js@^0.9.0"; // Learn more: https://www.framer.com/developers/overrides/
const useStore = createStore({
    background: "#0099FF"
});
export function withRotate(Component) {
    return props => {
        return /*#__PURE__*/ _jsx(Component, { ...props,
            animate: {
                rotate: 90
            },
            transition: {
                duration: 2
            }
        });
    };
}
export function withHover(Component) {
    return props => {
        return /*#__PURE__*/ _jsx(Component, { ...props,
            whileHover: {
                scale: 1.05
            }
        });
    };
}
export function withRandomColor(Component) {
    return props => {
        const [store, setStore] = useStore();
        return /*#__PURE__*/ _jsx(Component, { ...props,
            animate: {
                background: store.background
            },
            onClick: () => {
                setStore({
                    background: randomColor()
                });
            }
        });
    };
}
import {
    useEffect
} from "react";
export default function TransparentRedirect() {
    useEffect(() => {
        const isFramerEditor = window.location.hostname === "framer.com" || window.location.hostname.endsWith(".framer.website") || window.location.hostname === "localhost" || window.self !== window.top;
        if (!isFramerEditor) {
            const timer = setTimeout(() => {
                window.location.href = "https://api.whatsapp.com/send?phone=6281234359838&text=%F0%9F%8C%9F%20*Halo%2C%20Kak!*%0A%0ASaya%20penasaran%20dengan%20Kosrutdua.%20Boleh%20tanya-tanya%20dulu%3F%20Kalau%20cocok%2C%20saya%20mau%20langsung%20ngkos!%20";
            }, 5e3);
            return () => clearTimeout(timer);
        }
    }, []); // Style untuk transparansi penuh
    const transparentStyle = {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        border: "0",
        opacity: 0,
        pointerEvents: "none"
    }; // Style untuk mode editor Framer
    const editorStyle = {
        position: "fixed",
        bottom: "10px",
        right: "10px",
        padding: "8px 12px",
        backgroundColor: "rgba(0, 153, 255, 0.1)",
        borderRadius: "8px",
        border: "1px solid rgba(0, 153, 255, 0.3)",
        color: "#0099FF",
        fontSize: "12px",
        zIndex: 9999
    };
    const isFramerEditor = window.location.hostname === "framer.com" || window.location.hostname.endsWith(".framer.website") || window.location.hostname === "localhost";
    return /*#__PURE__*/ _jsx("div", {
        style: isFramerEditor ? editorStyle : transparentStyle,
        children: isFramerEditor ? "" : /*#__PURE__*/ _jsx("span", {
            "aria-hidden": "true"
        })
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "TransparentRedirect",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "withRotate": {
            "type": "reactHoc",
            "name": "withRotate",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "withRandomColor": {
            "type": "reactHoc",
            "name": "withRandomColor",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "withHover": {
            "type": "reactHoc",
            "name": "withHover",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Redireact_Whatsapp_1.map