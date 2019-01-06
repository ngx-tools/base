export enum MediaQuery {xs, sm, md, lg, xl}

export interface FxLayoutOption {
    cols: number;
    margin: string;
    padding: string;
    gap: string;
}

export interface BaseConfig {
    rtlLangs?: string[];
    defaultLang?: string;
    fxLayoutOption?: Map<MediaQuery, FxLayoutOption>;
}