export interface IKeywords {
    keywords: KeywordsClass;
}

export interface KeywordsClass {
    keywords: Keyword[];
}

export interface Keyword {
    id:   number;
    name: string;
}
