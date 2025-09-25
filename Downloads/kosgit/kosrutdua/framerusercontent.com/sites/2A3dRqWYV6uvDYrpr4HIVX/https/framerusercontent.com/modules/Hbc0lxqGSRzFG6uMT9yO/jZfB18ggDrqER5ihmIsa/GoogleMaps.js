import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    addPropertyControls,
    ControlType,
    motion
} from "framer";
import {
    containerStyles,
    useRadius,
    borderRadiusControl
} from "https://framer.com/m/framer/default-utils.js@^0.45.0";
const coordinatesRegex = /^((?:\-?|\+?)?\d+(?:\.\d+)?),\s*((?:\-?|\+?)?\d+(?:\.\d+)?)$/;
/**
 * GOOGLE MAPS
 *
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 400
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function GoogleMaps({
    coordinates,
    zoom,
    style,
    ...props
}) {
    const borderRadius = useRadius(props);
    return /*#__PURE__*/ _jsx(motion.div, {
        style: { ...style,
            ...containerStyles,
            overflow: "hidden",
            borderRadius
        },
        ...props,
        children: /*#__PURE__*/ _jsx("iframe", {
            style: {
                height: "100%",
                width: "100%",
                border: 0
            },
            src: `https://maps.google.com/maps?q=${encodeURIComponent(coordinates)}&z=${zoom}&output=embed`
        })
    });
}
addPropertyControls(GoogleMaps, {
    coordinates: {
        type: ControlType.String,
        title: "Location",
        placeholder: "Framer B.V.",
        defaultValue: "Framer B.V.",
        description: "The name of the place or its GPS coordinates."
    },
    zoom: {
        type: ControlType.Number,
        step: 1,
        min: 0,
        max: 25,
        title: "Zoom",
        defaultValue: 15
    },
    ...borderRadiusControl
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "GoogleMaps",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerIntrinsicHeight": "400",
                "framerIntrinsicWidth": "600",
                "framerSupportedLayoutWidth": "fixed",
                "framerSupportedLayoutHeight": "fixed"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./GoogleMaps.map