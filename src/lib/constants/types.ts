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

// types related to the InteractiveQuote component

export type Mapping = {
    from: number[]; // The characters in the original quote.
    to: number[]; // The words in the translated text.
};

export type QuoteTextData = {
    original: string;
    translation: string;
    source: string;
};

export type Quote = QuoteToken[][][];
export type Trans = TransToken[][][];

// export type Quote = QuoteParagraph[];
// export type Trans = TransParagraph[];
// export type QuoteParagraph = QuoteSentence[];
// export type TransParagraph = TransSentence[];
// export type QuoteSentence = QuoteToken[];
// export type TransSentence = TransToken[];

export type QuoteToken = {
    id: number;
    type: "hanzi" | "punct" | "other";
    char: string;
    pinyin: string | null;
    // mappingId: number | null; // the index of its mapping in the mappings array (?)
};

export type TransToken = {
    id: number;
    text: string;
    type: "hanzi" | "latin" | "punct";
};
