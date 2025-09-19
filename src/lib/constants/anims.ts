export const shakeY = {
    keyframes: [
        { transform: "translateY(0)", offset: 0 },
        { transform: "translateY(2px)", offset: 0.25 },
        { transform: "translateY(-2px)", offset: 0.5 },
        { transform: "translateY(2px)", offset: 0.75 },
        { transform: "translateY(0)", offset: 1 },
    ] as Keyframe[],
    options: { duration: 300, iterations: 1 } as KeyframeAnimationOptions,
};
