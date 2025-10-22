import { pinyin } from "pinyin-pro";
import type { QuoteToken } from "./types";

type TokenType = "punct" | "hanzi" | "other";

const REGEX_TOKEN = // Clumps up Chinese characters and punctuation marks into capture groups.
    /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2EBEF]+|[\u3000-\u303F\uFF00-\uFFEF]+/g;
const REGEX_HANZI = // Matches Chinese characters.
    /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2EBEF]/;
const REGEX_PUNCT = // Matches Chinese punctuation marks.
    /[\u3000-\u303F\uFF00-\uFFEF]/;

function classifyToken(token: string): TokenType {
    if (REGEX_HANZI.test(token)) return "hanzi";
    if (REGEX_PUNCT.test(token)) return "punct";
    return "other";
}

export function tokenizeQuote(quote: string): QuoteToken[] {
    const segments = quote.match(REGEX_TOKEN) || [];

    let counter = 0;
    const tokens = segments.flatMap((segment) => {
        const type = classifyToken(segment);
        return [...segment].map((char) => ({
            id: counter++,
            char,
            type,
            pinyin: type === "hanzi" ? pinyin(char) || "" : null,
        }));
    });

    return tokens;
}
