import {MediaQuery} from "./types";

export class Const {
    static rtlLangs = ['fa'];
    static defaultLang = 'fa';
    static fxLayoutOption = new Map([
        [MediaQuery.xs, {cols: 4, margin: '5.6%', padding: '5.6%', gap: '6.4%'}],
        [MediaQuery.sm, {cols: 4, margin: '5.6%', padding: '5.6%', gap: '6.4%'}],
        [MediaQuery.md, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}],
        [MediaQuery.lg, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}],
        [MediaQuery.xl, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}]
    ]);
    static cols = 12;
    static gap = '2.5%';
    static margin = '2.5%';
    static padding = '2.5%';
}
