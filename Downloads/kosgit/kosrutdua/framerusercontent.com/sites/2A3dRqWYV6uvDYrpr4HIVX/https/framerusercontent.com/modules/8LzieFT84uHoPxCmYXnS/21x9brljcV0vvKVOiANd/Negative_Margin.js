// Welcome to Code in Framer
// Get Started: https://www.framer.com/developers/
import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    useRef
} from "react";
import {
    useEffect
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 * @framerDisableUnlink
 */
export default function Negative_Margin(props) {
    const qrRef = useRef(null); // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => { // Update the document title using the browser API
        qrRef.current.parentNode.style.marginLeft = props.margin + props.unit;
        qrRef.current.parentNode.style.marginTop = props.margin + props.unit;
    }); // This is a React component containing an Example component
    // - Replace <Example /> with your own code
    // - Find inspiration: https://www.framer.com/developers/
    return /*#__PURE__*/ _jsx("div", {
        ref: qrRef
    });
}
addPropertyControls(Negative_Margin, {
    /*
        direction: {
            type: ControlType.Enum,
            defaultValue: "vertical",
            displaySegmentedControl: true,
            segmentedControlDirection: "vertical",
            options: ["horizontal", "vertical"],
            optionTitles: ["Horizontal", "Vertical"],
        },
        */
    unit: {
        type: ControlType.Enum,
        defaultValue: "px",
        displaySegmentedControl: true,
        segmentedControlDirection: "horizontal",
        options: ["px", "%"],
        optionTitles: ["Pixel", "Percent"]
    },
    margin: {
        type: ControlType.Number,
        max: 0,
        min: -1e3,
        defaultValue: -3
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "Negative_Margin",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerSupportedLayoutHeight": "auto",
                "framerDisableUnlink": "",
                "framerSupportedLayoutWidth": "auto"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Negative_Margin.map