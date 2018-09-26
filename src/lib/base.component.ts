import {Const} from './const';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Injectable, OnInit} from '@angular/core';

export enum MediaQuery {xs, sm, md, lg, xl}

@Injectable()
export abstract class BaseComponent implements OnInit {
    public dir;
    public cols = 12;
    public gap = '2.5%';
    public margin = '2.5%';
    public mq: MediaQuery = undefined;
    protected grid = new Map([
        [MediaQuery.xs, {cols: 4, margin: '5.6%', gap: '6.4%'}],
        [MediaQuery.sm, {cols: 4, margin: '5.6%', gap: '6.4%'}],
        [MediaQuery.md, {cols: 12, margin: '2.5%', gap: '2.5%'}],
        [MediaQuery.lg, {cols: 12, margin: '2.5%', gap: '2.5%'}],
        [MediaQuery.xl, {cols: 12, margin: '2.5%', gap: '2.5%'}]
    ]);

    constructor(public translate: TranslateService, private breakpointObserver: BreakpointObserver) {
        translate.setDefaultLang(Const.defaultLang);
        const locale = localStorage.getItem('locale');
        if (locale && locale !== 'undefined') {
            translate.use(locale);
        } else {
            translate.use(Const.defaultLang);
            localStorage.setItem('locale', translate.currentLang);
        }
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            localStorage.setItem('locale', event.lang);
        });

        this.dir = Const.rtlLangs[translate.currentLang] ? 'rtl' : 'ltr';
        translate.onLangChange.subscribe(
            (event: LangChangeEvent) => {
                this.dir = Const.rtlLangs[translate.currentLang] ? 'rtl' : 'ltr';
            }
        );
    }

    calc(num: number, cols: number = this.cols, gap: string = this.gap) {
        return 'calc(100% / ' + cols + ' * ' + num + ' - (' + gap + ' / ' + cols + ' * (' + cols + ' - ' + num + '))';
    }

    ngOnInit(): void {
        this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.setValues(MediaQuery.xs);
            }
        });
        this.breakpointObserver.observe(Breakpoints.Small).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.setValues(MediaQuery.sm);
            }
        });
        this.breakpointObserver.observe(Breakpoints.Medium).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.setValues(MediaQuery.md);
            }
        });
        this.breakpointObserver.observe(Breakpoints.Large).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.setValues(MediaQuery.lg);
            }
        });
        this.breakpointObserver.observe(Breakpoints.XLarge).subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.setValues(MediaQuery.xl);
            }
        });
    }

    private setValues(mq: MediaQuery) {
        const me = this;
        this.mq = mq;
        me.cols = this.grid.get(this.mq).cols;
        me.margin = this.grid.get(this.mq).margin;
        me.gap = this.grid.get(this.mq).gap;
    }
}
