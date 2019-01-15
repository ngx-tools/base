import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {BaseConfig} from './types';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgmBaseService} from './ngm-base.service';
import {Error} from 'tslint/lib/error';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgHttpLoaderModule,
        FlexLayoutModule,
    ],
    declarations: [],
    providers: [NgmBaseService, TranslateService, {provide: 'NgmBaseConfig', useValue: null}],
    exports: [
        TranslateModule,
        FlexLayoutModule,
    ]
})
export class NgmBaseModule {
    constructor (@Optional() @SkipSelf() parentModule: NgmBaseModule) {
        if (parentModule) {
            throw new Error(
                'NgmBaseModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(config?: BaseConfig): ModuleWithProviders {
        return {
            ngModule: NgmBaseModule,
            providers: [
                NgmBaseService,
                TranslateService,
                {provide: 'NgmBaseConfig', useValue: config}
            ]
        };
    }
}
