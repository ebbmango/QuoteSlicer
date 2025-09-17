export type IconSVG = {
    viewBox: string;
    path: string;
};

export type Theme = {
    dark: boolean;
};

export type Mode = {
    current: number;
    /*
    0 - Text Input
    1 - Mapping
    2 - Versification: Join
    3 - Versification: Split
    4 - Preview
    */
};
