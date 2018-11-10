import {Const} from './const';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Injectable, OnInit} from '@angular/core';
import {FxLayoutOption, MediaQuery} from './types';

@Injectable()
export abstract class NgmBaseComponent implements OnInit {
    public dir;
    public cols = Const.cols;
    public gap = Const.gap;
    public margin = Const.margin;
    public padding = Const.padding;
    public mq: MediaQuery = undefined;
    protected grid: Map<MediaQuery, FxLayoutOption> = Const.fxLayoutOption;

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
        this.dir = Const.rtlLangs.includes(translate.currentLang) ? 'rtl' : 'ltr';
        translate.onLangChange.subscribe(
            (event: LangChangeEvent) => {
                this.dir = Const.rtlLangs.includes(translate.currentLang) ? 'rtl' : 'ltr';
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
        me.padding = this.grid.get(this.mq).padding;
        me.gap = this.grid.get(this.mq).gap;
    }
}
