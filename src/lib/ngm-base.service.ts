import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Inject, Injectable} from '@angular/core';
import {BaseConfig, FxLayoutOption, MediaQuery} from './types';

@Injectable({
    providedIn: 'root'
})
export class NgmBaseService {
    private defaultLang = 'fa';
    private rtlLangs = ['fa'];
    public dir;
    public cols = 12;
    public gap = '2.5%';
    public margin = '2.5%';
    public padding = '2.5%';
    public mq: MediaQuery = undefined;
    public grid: Map<MediaQuery, FxLayoutOption> = new Map([
        [MediaQuery.xs, {cols: 4, margin: '5.6%', padding: '5.6%', gap: '6.4%'}],
        [MediaQuery.sm, {cols: 4, margin: '5.6%', padding: '5.6%', gap: '6.4%'}],
        [MediaQuery.md, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}],
        [MediaQuery.lg, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}],
        [MediaQuery.xl, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}]
    ]);

    constructor(public translate: TranslateService,
                private breakpointObserver: BreakpointObserver,
                @Inject('NgmBaseConfig') config: BaseConfig) {
        if (config) {
            if (config.defaultLang) {
                this.defaultLang = config.defaultLang;
            }
            if (config.fxLayoutOption) {
                this.grid = config.fxLayoutOption;
            }
            if (config.rtlLangs) {
                this.rtlLangs = config.rtlLangs;
            }
        }
        translate.setDefaultLang(this.defaultLang);
        const locale = localStorage.getItem('locale');
        if (locale && locale !== 'undefined') {
            translate.use(locale);
        } else {
            translate.use(this.defaultLang);
            localStorage.setItem('locale', translate.currentLang);
        }
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            localStorage.setItem('locale', event.lang);
        });
        this.dir = this.rtlLangs.includes(translate.currentLang) ? 'rtl' : 'ltr';
        translate.onLangChange.subscribe(
            (event: LangChangeEvent) => {
                this.dir = this.rtlLangs.includes(translate.currentLang) ? 'rtl' : 'ltr';
            }
        );
        this.update();
    }

    calc(num: number, cols: number = this.cols, gap: string = this.gap) {
        return 'calc(100% / ' + cols + ' * ' + num + ' - (' + gap + ' / ' + cols + ' * (' + cols + ' - ' + num + '))';
    }

    update() {
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
        this.mq = mq;
        this.cols = this.grid.get(this.mq).cols;
        this.margin = this.grid.get(this.mq).margin;
        this.padding = this.grid.get(this.mq).padding;
        this.gap = this.grid.get(this.mq).gap;
    }
}
