import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    addPropertyControls,
    ControlType
} from "framer";
/**
 * Responsive Image
 * By Benjamin
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight any
 * @framerDisableUnlink
 *
 */
export default function Image(props) {
    const {
        image,
        alt,
        radius,
        padding,
        link,
        newTab,
        style,
        borderOptions,
        shadowOptions
    } = props;
    const wrapperStyle = {
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        width: "100%",
        height: "100%",
        padding: padding
    };
    const borderAndShadow = (borderOptions, shadowOptions) => {
        if (!shadowOptions && !borderOptions) return undefined;
        if (shadowOptions && !borderOptions) {
            return `${shadowOptions.shadowX}px ${shadowOptions.shadowY}px ${shadowOptions.shadowBlur}px ${shadowOptions.shadowColor}`;
        }
        if (!shadowOptions && borderOptions) {
            return `inset 0 0 0 ${borderOptions.borderWidth}px ${borderOptions.borderColor}`;
        }
        if (shadowOptions && borderOptions) {
            return `inset 0 0 0 ${borderOptions.borderWidth}px ${borderOptions.borderColor}, ${shadowOptions.shadowX}px ${shadowOptions.shadowY}px ${shadowOptions.shadowBlur}px ${shadowOptions.shadowColor}`;
        }
    };
    const imageStyle = {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: radius,
        webkitUserDrag: "none",
        userDrag: "none",
        userSelect: "none"
    };
    const shadowStyle = {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: radius,
        boxShadow: borderAndShadow(borderOptions, shadowOptions)
    };
    const imageSource = (image === null || image === void 0 ? void 0 : image.src) || "https://framerusercontent.com/images/64n4wnVJKDJspLlFZ6DarCP0M4.jpg";
    return link ? /*#__PURE__*/ _jsxs("a", {
        href: link,
        title: alt,
        target: newTab ? "_blank" : "_self",
        style: wrapperStyle,
        children: [ /*#__PURE__*/ _jsx("img", {
            style: imageStyle,
            src: imageSource,
            srcSet: image === null || image === void 0 ? void 0 : image.srcSet,
            alt: alt
        }), /*#__PURE__*/ _jsx("div", {
            style: shadowStyle
        })]
    }) : /*#__PURE__*/ _jsxs("div", {
        style: wrapperStyle,
        children: [ /*#__PURE__*/ _jsx("img", {
            style: imageStyle,
            src: imageSource,
            srcSet: image === null || image === void 0 ? void 0 : image.srcSet,
            alt: alt
        }), /*#__PURE__*/ _jsx("div", {
            style: shadowStyle
        })]
    });
}
addPropertyControls(Image, {
    image: {
        title: "Image",
        type: ControlType.ResponsiveImage
    },
    alt: {
        type: ControlType.String,
        title: "Alt",
        placeholder: "Alt Text"
    },
    radius: {
        title: "Radius",
        type: ControlType.Number,
        min: 0,
        max: 100,
        step: 1,
        displayStepper: true
    },
    padding: {
        title: "Padding",
        type: ControlType.Number,
        min: 0,
        max: 100,
        step: 1,
        displayStepper: true
    },
    link: {
        type: ControlType.Link,
        title: "Link"
    },
    newTab: {
        type: ControlType.Boolean,
        title: "New Tab",
        hidden: props => !props.link
    },
    borderOptions: {
        type: ControlType.Object,
        optional: true,
        title: "Border",
        icon: "effect",
        controls: {
            borderColor: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: "rgba(0,0,0,0.2)"
            },
            borderWidth: {
                type: ControlType.Number,
                title: "Width",
                min: 0,
                displayStepper: true,
                defaultValue: 1
            }
        }
    },
    shadowOptions: {
        type: ControlType.Object,
        title: "Shadow",
        optional: true,
        icon: "effect",
        controls: {
            shadowX: {
                type: ControlType.Number,
                title: "X",
                min: 0,
                defaultValue: 0
            },
            shadowY: {
                type: ControlType.Number,
                title: "Y",
                min: 0,
                defaultValue: 2
            },
            shadowBlur: {
                type: ControlType.Number,
                title: "Blur",
                min: 0,
                defaultValue: 4
            },
            shadowColor: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: "rgba(0,0,0,0.2)"
            }
        }
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "Image",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerSupportedLayoutWidth": "fixed",
                "framerSupportedLayoutHeight": "any",
                "framerDisableUnlink": "*"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Image.map