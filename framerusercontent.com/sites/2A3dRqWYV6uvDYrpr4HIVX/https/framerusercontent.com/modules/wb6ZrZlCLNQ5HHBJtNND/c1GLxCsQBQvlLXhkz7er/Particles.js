import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    addPropertyControls,
    ControlType,
    Color,
    RenderTarget
} from "framer";
import Particles from "react-tsparticles";
import {
    loadFull
} from "tsparticles";
import {
    useCallback
} from "react";
/**
 * PARTICLES FOR FRAMER
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 200
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function ParticleWrapper(props) {
    const {
        background,
        color,
        radius,
        number,
        densityOptions,
        sizeOptions,
        opacityOptions,
        linksOptions,
        modeOptions,
        moveOptions,
        shapeOptions,
        clickOptions,
        hoverOptions,
        rotateOptions,
        particlesID,
        fpsOptions,
        colors
    } = props;
    const {
        densityEnable,
        densityArea,
        densityFactor
    } = densityOptions;
    const {
        linksEnabled,
        linksColor,
        linksOpacity,
        linksDistance,
        linksWidth
    } = linksOptions;
    const {
        size,
        sizeType,
        sizeMin,
        sizeMax
    } = sizeOptions;
    const {
        opacity,
        opacityType,
        opacityMin,
        opacityMax
    } = opacityOptions;
    const {
        connectDistance,
        connectRadius,
        connectLinksOpacity,
        grabDistance,
        grabLinksOpacity,
        bubbleDistance,
        bubbleSize,
        bubbleDuration,
        repulseDistance,
        repulseDuration,
        pushQuantity,
        removeQuantity,
        trailQuantity,
        trailDelay
    } = modeOptions;
    const {
        moveEnabled,
        moveDirection,
        moveSpeed,
        moveRandom,
        moveStraight,
        moveOut,
        moveVibrate,
        moveGravityEnabled,
        moveGravityAcceleration,
        moveGravityMaxSpeed,
        moveTrailEnabled,
        moveTrailAmount,
        moveSpinEnabled,
        moveSpinAcceleration,
        moveAttractEnabled,
        moveAttractDistance
    } = moveOptions;
    const {
        shapeType,
        characterType,
        imageSource,
        imageWidth,
        imageHeight
    } = shapeOptions;
    const {
        clickEnabled,
        clickModes
    } = clickOptions;
    const {
        hoverEnabled,
        hoverModes,
        hoverParallax,
        hoverForce,
        hoverSmooth
    } = hoverOptions;
    const {
        rotateDirection,
        rotateValue,
        rotateAnimation,
        rotateSpeed,
        rotateSync
    } = rotateOptions;
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);
    const isCanvas = RenderTarget.current() === RenderTarget.canvas;
    const hasMultipleColors = colors.length > 0;
    return /*#__PURE__*/ _jsx("div", {
        style: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: background,
            transform: "translateZ(0)",
            borderRadius: radius,
            position: "relative"
        },
        children: /*#__PURE__*/ _jsx(Particles, {
            id: particlesID,
            init: particlesInit,
            style: {
                width: "100%",
                height: "100%",
                position: "absolute"
            },
            options: { // autoPlay: !isCanvas,
                background: {
                    color: {
                        value: "transparent"
                    }
                },
                fpsLimit: isCanvas ? 1 : fpsOptions,
                fullScreen: false,
                pauseOnBlur: true,
                pauseOnOutsideViewport: true,
                interactivity: isCanvas ? {} : {
                    events: {
                        resize: true,
                        onClick: {
                            enable: isCanvas ? false : clickEnabled,
                            mode: clickModes
                        },
                        onHover: {
                            enable: isCanvas ? false : hoverEnabled,
                            mode: hoverModes,
                            parallax: {
                                enable: isCanvas ? false : hoverEnabled ? hoverParallax : false,
                                force: hoverForce,
                                smooth: hoverForce
                            }
                        }
                    },
                    modes: {
                        connect: {
                            distance: connectDistance,
                            radius: connectRadius,
                            links: {
                                opacity: connectLinksOpacity
                            }
                        },
                        grab: {
                            distance: grabDistance,
                            links: {
                                opacity: grabLinksOpacity
                            }
                        },
                        bubble: {
                            distance: bubbleDistance,
                            size: bubbleSize,
                            duration: bubbleDuration
                        },
                        repulse: {
                            distance: repulseDistance,
                            duration: repulseDuration
                        },
                        push: {
                            quantity: pushQuantity
                        },
                        remove: {
                            quantity: removeQuantity
                        },
                        trail: {
                            delay: trailDelay,
                            quantity: trailQuantity
                        }
                    }
                },
                particles: {
                    color: {
                        value: hasMultipleColors ? colors.map(color => makeHex(color)) : makeHex(color)
                    },
                    collisions: {
                        enable: false
                    },
                    rotate: {
                        direction: rotateDirection,
                        value: rotateValue,
                        animation: !isCanvas && {
                            enable: rotateAnimation,
                            speed: rotateSpeed
                        }
                    },
                    move: {
                        direction: moveDirection,
                        outMode: moveOut,
                        enable: isCanvas ? false : moveEnabled,
                        random: moveRandom,
                        speed: moveSpeed,
                        straight: moveStraight,
                        trail: {
                            enable: moveTrailEnabled,
                            length: moveTrailAmount
                        },
                        spin: {
                            enable: moveSpinEnabled,
                            acceleration: moveSpinAcceleration
                        },
                        attract: {
                            enable: moveAttractEnabled,
                            distance: moveAttractDistance
                        },
                        gravity: {
                            enable: moveGravityEnabled,
                            acceleration: moveGravityAcceleration,
                            maxSpeed: moveGravityMaxSpeed
                        },
                        vibrate: moveVibrate
                    },
                    links: {
                        enable: linksEnabled,
                        color: makeHex(linksColor),
                        opacity: linksOpacity,
                        distance: linksDistance,
                        width: linksWidth
                    },
                    number: {
                        value: number,
                        density: {
                            enable: densityEnable,
                            area: densityEnable && densityArea,
                            factor: densityEnable && densityFactor
                        }
                    },
                    opacity: {
                        value: opacityType ? opacity : {
                            min: opacityMin,
                            max: opacityMax
                        }
                    },
                    shape: {
                        type: shapeType,
                        character: {
                            value: characterType
                        },
                        image: {
                            src: imageSource,
                            width: imageWidth,
                            height: imageHeight
                        }
                    },
                    size: {
                        value: sizeType ? size : {
                            min: sizeMin,
                            max: sizeMax
                        }
                    }
                },
                detectRetina: true
            }
        })
    });
}; /* Default properties */
ParticleWrapper.defaultProps = {
    background: "#000000",
    color: "#ffffff",
    radius: 0,
    number: 100,
    densityOptions: {
        densityEnable: false,
        densityArea: 5e3,
        densityFactor: 50
    },
    sizeOptions: {
        sizeType: true,
        size: 1,
        sizeMin: 1,
        sizeMax: 10
    },
    opacityOptions: {
        opacityType: true,
        opacity: 1,
        opacityMin: 0,
        opacityMax: 1
    },
    linksOptions: {
        linksEnabled: false,
        linksColor: "#ffffff",
        linksOpacity: .2,
        linksDistance: 100,
        linksWidth: 1
    },
    modeOptions: {
        connectDistance: 100,
        connectRadius: 50,
        connectLinksOpacity: .2,
        grabDistance: 100,
        grabLinksOpacity: .2,
        bubbleDistance: 100,
        bubbleSize: 40,
        bubbleDuration: .4,
        repulseDistance: 200,
        repulseDuration: 1.2,
        pushQuantity: 4,
        removeQuantity: 4,
        trailDelay: .1,
        trailQuantity: 10
    },
    moveOptions: {
        moveEnabled: true,
        moveDirection: "none",
        moveSpeed: 1,
        moveRandom: false,
        moveStraight: false,
        moveOut: "out",
        moveVibrate: false,
        moveGravityEnabled: false,
        moveGravityAcceleration: 1,
        moveGravityMaxSpeed: 2,
        moveTrailEnabled: false,
        moveTrailAmount: 100,
        moveSpinEnabled: false,
        moveSpinAcceleration: 1,
        moveAttractEnabled: false,
        moveAttractDistance: 100
    },
    shapeOptions: {
        shapeType: "circle",
        characterType: "😎",
        imageWidth: 100,
        imageHeight: 100
    },
    clickOptions: {
        clickEnabled: false,
        clickModes: "push"
    },
    hoverOptions: {
        hoverEnabled: true,
        hoverModes: "none",
        hoverParallax: true,
        hoverForce: 10,
        hoverSmooth: 10
    },
    rotateOptions: {
        rotateDirection: "random",
        rotateValue: 0,
        rotateAnimation: false,
        rotateSpeed: 5,
        rotateSync: false
    },
    particlesID: "Unique ID",
    colors: []
};
ParticleWrapper.displayName = "Particles";
addPropertyControls(ParticleWrapper, {
    background: {
        type: ControlType.Color,
        defaultValue: ParticleWrapper.defaultProps.background,
        title: "Backdrop"
    },
    color: {
        type: ControlType.Color,
        defaultValue: ParticleWrapper.defaultProps.color,
        title: "Color"
    },
    colors: {
        type: ControlType.Array,
        control: {
            type: ControlType.Color
        },
        defaultValue: ParticleWrapper.defaultProps.colors
    },
    fpsOptions: {
        type: ControlType.Enum,
        title: "FPS",
        options: [30, 60, 120],
        optionTitles: ["30", "60", "120"],
        defaultValue: 60,
        displaySegmentedControl: true
    },
    number: {
        type: ControlType.Number,
        title: "Amount",
        min: 0,
        max: 1e3,
        step: 1,
        defaultValue: ParticleWrapper.defaultProps.number
    },
    densityOptions: {
        type: ControlType.Object,
        title: "Density",
        controls: {
            densityEnable: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: ParticleWrapper.defaultProps.densityOptions.densityEnable
            },
            densityArea: {
                type: ControlType.Number,
                title: "Area",
                min: 100,
                max: 1e4,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.densityOptions.densityArea,
                hidden: props => !props.densityEnable
            },
            densityFactor: {
                type: ControlType.Number,
                title: "Factor",
                min: 0,
                max: 100,
                step: .5,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.densityOptions.densityFactor,
                description: "Decrease the amount property when using these, as too many particles in dense areas can cause slowdowns.",
                hidden: props => !props.densityEnable
            }
        }
    },
    sizeOptions: {
        type: ControlType.Object,
        title: "Size",
        controls: {
            sizeType: {
                type: ControlType.Boolean,
                title: "Type",
                enabledTitle: "Value",
                disabledTitle: "Range",
                defaultValue: ParticleWrapper.defaultProps.sizeOptions.sizeType
            },
            size: {
                type: ControlType.Number,
                title: "Size",
                min: 0,
                max: 1e3,
                step: .5,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.sizeOptions.size,
                hidden: props => !props.sizeType
            },
            sizeMin: {
                type: ControlType.Number,
                title: "Min",
                min: 0,
                max: 1e3,
                step: .5,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.sizeOptions.sizeMin,
                hidden: props => props.sizeType
            },
            sizeMax: {
                type: ControlType.Number,
                title: "Max",
                min: 0,
                max: 1e3,
                step: .5,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.sizeOptions.sizeMax,
                hidden: props => props.sizeType
            }
        }
    },
    opacityOptions: {
        type: ControlType.Object,
        title: "Opacity",
        controls: {
            opacityType: {
                type: ControlType.Boolean,
                title: "Type",
                enabledTitle: "Value",
                disabledTitle: "Range",
                defaultValue: ParticleWrapper.defaultProps.opacityOptions.opacityType
            },
            opacity: {
                type: ControlType.Number,
                title: "Opacity",
                min: 0,
                max: 1,
                step: .1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.opacityOptions.opacity,
                hidden: props => !props.opacityType
            },
            opacityMin: {
                type: ControlType.Number,
                title: "Min",
                min: 0,
                max: 1,
                step: .05,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.opacityOptions.opacityMin,
                hidden: props => props.opacityType
            },
            opacityMax: {
                type: ControlType.Number,
                title: "Max",
                min: 0,
                max: 1,
                step: .05,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.opacityOptions.opacityMax,
                hidden: props => props.opacityType
            }
        }
    },
    linksOptions: {
        type: ControlType.Object,
        title: "Links",
        controls: {
            linksEnabled: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: ParticleWrapper.defaultProps.linksOptions.linksEnabled
            },
            linksColor: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: ParticleWrapper.defaultProps.linksOptions.linksColor,
                hidden: props => !props.linksEnabled
            },
            linksOpacity: {
                type: ControlType.Number,
                title: "Opacity",
                min: 0,
                max: 1,
                step: .1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.linksOptions.linksOpacity,
                hidden: props => !props.linksEnabled
            },
            linksDistance: {
                type: ControlType.Number,
                title: "Distance",
                min: 0,
                max: 500,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.linksOptions.linksDistance,
                hidden: props => !props.linksEnabled
            },
            linksWidth: {
                type: ControlType.Number,
                title: "Width",
                min: 0,
                max: 10,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.linksOptions.linksWidth,
                hidden: props => !props.linksEnabled
            }
        }
    },
    modeOptions: {
        type: ControlType.Object,
        title: "Modes",
        controls: {
            connectDistance: {
                type: ControlType.Number,
                title: "Connect",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.connectDistance
            },
            connectRadius: {
                type: ControlType.Number,
                title: "Connect Radius",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.connectRadius
            },
            connectLinksOpacity: {
                type: ControlType.Number,
                title: "Connect Links",
                min: 0,
                max: 1,
                step: .1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.connectLinksOpacity
            },
            grabDistance: {
                type: ControlType.Number,
                title: "Grab",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.grabDistance
            },
            grabLinksOpacity: {
                type: ControlType.Number,
                title: "Grab Links",
                min: 0,
                max: 1,
                step: .1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.grabLinksOpacity
            },
            bubbleDistance: {
                type: ControlType.Number,
                title: "Bubble",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.bubbleDistance
            },
            bubbleSize: {
                type: ControlType.Number,
                title: "Bubble Size",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.bubbleSize
            },
            bubbleDuration: {
                type: ControlType.Number,
                title: "Bubble Duration",
                min: 0,
                max: 1,
                step: .1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.bubbleDuration
            },
            repulseDistance: {
                type: ControlType.Number,
                title: "Repulse",
                min: 0,
                max: 1e3,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.repulseDistance
            },
            repulseDuration: {
                type: ControlType.Number,
                title: "Repulse Duration",
                min: 0,
                max: 10,
                step: .1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.repulseDuration
            },
            pushQuantity: {
                type: ControlType.Number,
                title: "Push",
                min: 0,
                max: 100,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.pushQuantity
            },
            removeQuantity: {
                type: ControlType.Number,
                title: "Remove",
                min: 0,
                max: 100,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.removeQuantity
            },
            trailQuantity: {
                type: ControlType.Number,
                title: "Trail",
                min: 0,
                max: 100,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.trailQuantity
            },
            trailDelay: {
                type: ControlType.Number,
                title: "Trail Delay",
                min: 0,
                max: 10,
                step: .1,
                defaultValue: ParticleWrapper.defaultProps.modeOptions.trailDelay
            }
        }
    },
    moveOptions: {
        type: ControlType.Object,
        title: "Move",
        controls: {
            moveEnabled: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveEnabled
            },
            moveDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["none", "bottom", "left", "right", "top", "bottom-left", "bottom-right", "top-left", "top-right", "outside", "inside", ],
                optionTitles: ["Random", "Bottom", "Left", "Right", "Top", "Bottom Left", "Bottom Right", "Top Left", "Top Right", "Outside", "Inside", ],
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveDirection,
                hidden: props => !props.moveEnabled
            },
            moveSpeed: {
                type: ControlType.Number,
                title: "Speed",
                min: 0,
                max: 100,
                step: .1,
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveSpeed,
                hidden: props => !props.moveEnabled
            },
            moveRandom: {
                type: ControlType.Boolean,
                title: "Random",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveRandom,
                hidden: props => !props.moveEnabled
            },
            moveStraight: {
                type: ControlType.Boolean,
                title: "Straight",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveStraight,
                hidden: props => !props.moveEnabled
            },
            moveOut: {
                type: ControlType.Enum,
                title: "Out",
                options: ["none", "split", "bounce", "destroy", "out", "bounceHorizontal", "bounceVertical", ],
                optionTitles: ["None", "Split", "Bounce", "Destroy", "Out", "Bounce Horizontal", "Bounce Vertical", ],
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveOut,
                hidden: props => !props.moveEnabled
            },
            moveVibrate: {
                type: ControlType.Boolean,
                title: "Vibrate",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveVibrate,
                hidden: props => !props.moveEnabled
            },
            moveGravityEnabled: {
                type: ControlType.Boolean,
                title: "Gravity",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveGravityEnabled,
                hidden: props => !props.moveEnabled
            },
            moveGravityAcceleration: {
                type: ControlType.Number,
                title: "Gravity Acceleration",
                min: 0,
                max: 100,
                step: .1,
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveGravityAcceleration,
                hidden: props => !props.moveEnabled || !props.moveGravityEnabled
            },
            moveGravityMaxSpeed: {
                type: ControlType.Number,
                title: "Gravity Max Speed",
                min: 0,
                max: 100,
                step: .1,
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveGravityAcceleration,
                hidden: props => !props.moveEnabled || !props.moveGravityEnabled
            },
            moveTrailEnabled: {
                type: ControlType.Boolean,
                title: "Trail",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveTrailEnabled,
                hidden: props => !props.moveEnabled
            },
            moveTrailAmount: {
                type: ControlType.Number,
                title: " ",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveTrailAmount,
                hidden: props => !props.moveEnabled || !props.moveTrailEnabled
            },
            moveSpinEnabled: {
                type: ControlType.Boolean,
                title: "Spin",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveSpinEnabled,
                hidden: props => !props.moveEnabled
            },
            moveSpinAcceleration: {
                type: ControlType.Number,
                title: " ",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveSpinAcceleration,
                hidden: props => !props.moveEnabled || !props.moveSpinEnabled
            },
            moveAttractEnabled: {
                type: ControlType.Boolean,
                title: "Attract",
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveAttractEnabled,
                hidden: props => !props.moveEnabled
            },
            moveAttractDistance: {
                type: ControlType.Number,
                title: " ",
                min: 0,
                max: 1e3,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.moveOptions.moveAttractDistance,
                hidden: props => !props.moveEnabled || !props.moveAttractEnabled
            }
        }
    },
    shapeOptions: {
        type: ControlType.Object,
        title: "Shape",
        controls: {
            shapeType: {
                type: ControlType.Enum,
                title: "Shape",
                options: ["circle", "edge", "triangle", "polygon", "star", "character", "image", ],
                optionTitles: ["Circle", "Square", "Triangle", "Polygon", "Star", "Character", "Image", ],
                defaultValue: ParticleWrapper.defaultProps.shapeOptions.characterType
            },
            characterType: {
                type: ControlType.String,
                title: "Character",
                defaultValue: ParticleWrapper.defaultProps.shapeOptions.characterType,
                hidden: props => props.shapeType !== "character"
            },
            imageSource: {
                type: ControlType.Image,
                title: "Image",
                hidden: props => props.shapeType !== "image"
            },
            imageWidth: {
                type: ControlType.Number,
                title: "Width",
                min: 0,
                max: 1e3,
                defaultValue: ParticleWrapper.defaultProps.shapeOptions.imageWidth,
                hidden: props => props.shapeType !== "image"
            },
            imageHeight: {
                type: ControlType.Number,
                title: "Height",
                min: 0,
                max: 1e3,
                defaultValue: ParticleWrapper.defaultProps.shapeOptions.imageWidth,
                hidden: props => props.shapeType !== "image"
            }
        }
    },
    clickOptions: {
        type: ControlType.Object,
        title: "Click",
        controls: {
            clickEnabled: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: ParticleWrapper.defaultProps.clickOptions.clickEnabled
            },
            clickModes: {
                type: ControlType.Enum,
                title: "Mode",
                options: ["attract", "bubble", "push", "remove", "repulse", "pause", "trail", ],
                optionTitles: ["Attract", "Bubble", "Push", "Remove", "Repulse", "Pause", "Trail", ],
                defaultValue: ParticleWrapper.defaultProps.clickOptions.clickModes,
                hidden: props => !props.clickEnabled
            }
        }
    },
    hoverOptions: {
        type: ControlType.Object,
        title: "Hover",
        controls: {
            hoverEnabled: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: ParticleWrapper.defaultProps.hoverOptions.hoverEnabled
            },
            hoverModes: {
                type: ControlType.Enum,
                title: "Mode",
                options: ["none", "attract", "bounce", "bubble", "connect", "grab", "light", "repulse", "slow", "trail", ],
                optionTitles: ["None", "Attract", "Bounce", "Bubble", "Connect", "Grab", "Light", "Repulse", "Slow", "Trail", ],
                defaultValue: ParticleWrapper.defaultProps.hoverOptions.hoverModes,
                hidden: props => !props.hoverEnabled
            },
            hoverParallax: {
                type: ControlType.Boolean,
                title: "Parallax",
                defaultValue: ParticleWrapper.defaultProps.hoverOptions.hoverParallax,
                hidden: props => !props.hoverEnabled
            },
            hoverForce: {
                type: ControlType.Number,
                min: 0,
                max: 50,
                step: 1,
                displayStepper: true,
                title: "Force",
                defaultValue: ParticleWrapper.defaultProps.hoverOptions.hoverForce,
                hidden: props => !props.hoverParallax || !props.hoverEnabled
            },
            hoverSmooth: {
                type: ControlType.Number,
                min: 0,
                max: 50,
                step: 1,
                displayStepper: true,
                title: "Smooth",
                defaultValue: ParticleWrapper.defaultProps.hoverOptions.hoverSmooth,
                hidden: props => !props.hoverParallax || !props.hoverEnabled
            }
        }
    },
    rotateOptions: {
        type: ControlType.Object,
        title: "Rotate",
        controls: {
            rotateValue: {
                type: ControlType.Number,
                title: "Value",
                min: -360,
                max: 360,
                step: 1,
                displayStepper: true,
                defaultValue: ParticleWrapper.defaultProps.rotateOptions.rotateValue
            },
            rotateDirection: {
                type: ControlType.Enum,
                title: "Direction",
                options: ["clockwise", "counter-clockwise", "random"],
                optionTitles: ["Clockwise", "Counter Clockwise", "Random"],
                defaultValue: ParticleWrapper.defaultProps.rotateOptions.rotateDirection
            },
            rotateAnimation: {
                type: ControlType.Boolean,
                title: "Animate",
                defaultValue: ParticleWrapper.defaultProps.rotateOptions.rotateAnimation
            },
            rotateSpeed: {
                type: ControlType.Number,
                title: "Speed",
                min: 0,
                max: 100,
                step: 1,
                defaultValue: ParticleWrapper.defaultProps.rotateOptions.rotateSpeed,
                hidden: props => !props.rotateAnimation
            },
            rotateSync: {
                type: ControlType.Boolean,
                title: "Sync",
                defaultValue: ParticleWrapper.defaultProps.rotateOptions.rotateSync,
                hidden: props => !props.rotateAnimation
            }
        }
    },
    radius: {
        type: ControlType.Number,
        min: 0,
        max: 1e3,
        step: 1,
        displayStepper: true,
        defaultValue: ParticleWrapper.defaultProps.radius
    },
    particlesID: {
        type: ControlType.String,
        title: "ID",
        defaultValue: "One",
        placeholder: ParticleWrapper.defaultProps.particlesID
    }
}); // Converts all color values to hex strings
const makeHex = property => Color.toHexString(Color(property));
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "ParticleWrapper",
            "slots": [],
            "annotations": {
                "framerDisableUnlink": "*",
                "framerSupportedLayoutWidth": "fixed",
                "framerIntrinsicWidth": "200",
                "framerSupportedLayoutHeight": "fixed",
                "framerContractVersion": "1",
                "framerIntrinsicHeight": "200"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Particles.map