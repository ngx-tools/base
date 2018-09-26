import {ModuleWithProviders, NgModule} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {Const} from './const';

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
    ],
    declarations: [],
    providers: [],
    exports: []
})
export class BaseModule {
    static forRoot(config?: BaseConfig): ModuleWithProviders {
        if (config) {
            if (config.default_lang) {
                Const.defaultLang = config.default_lang;
            }
        }
        return {
            ngModule: BaseModule,
            providers: [BaseService, TranslateService]
        };
    }
}

export interface BaseConfig {
    default_lang: string;
}
