// export const shakeY = {
//     keyframes: [
//         { transform: "translateY(0)", offset: 0 },
//         { transform: "translateY(1px)", offset: 0.25 },
//         { transform: "translateY(-1px)", offset: 0.5 },
//         { transform: "translateY(1px)", offset: 0.75 },
//         { transform: "translateY(0)", offset: 1 },
//     ] as Keyframe[],
//     options: { duration: 300, iterations: 1 } as KeyframeAnimationOptions,
// };

export const shakeX = {
    keyframes: [
        { transform: "translateX(0)", offset: 0 },
        { transform: "translateX(2px)", offset: 0.25 },
        { transform: "translateX(-2px)", offset: 0.5 },
        { transform: "translateX(2px)", offset: 0.75 },
        { transform: "translateX(0)", offset: 1 },
    ] as Keyframe[],
    options: { duration: 300, iterations: 1 } as KeyframeAnimationOptions,
};
