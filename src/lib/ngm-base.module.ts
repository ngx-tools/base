import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {BaseConfig} from './types';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgmBaseService} from './ngm-base.service';

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
    providers: [NgmBaseService, TranslateService],
    exports: [
        TranslateModule,
        FlexLayoutModule,
    ]
})
export class NgmBaseModule {
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
