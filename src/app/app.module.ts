import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {FuseModule} from '@fuse';
import {FuseConfigModule} from '@fuse/services/config';
import {FuseMockApiModule} from '@fuse/lib/mock-api';
import {CoreModule} from 'app/core/core.module';
import {appConfig} from 'app/core/config/app.config';
import {mockApiServices} from 'app/mock-api';
import {LayoutModule} from 'app/layout/layout.module';
import {AppComponent} from 'app/app.component';
import {appRoutes} from 'app/app.routing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AUTH_TOKEN_INTERCEPTOR} from "./shared/interceptor/interceptor";
import {ToastrModule} from "ngx-toastr";

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

registerLocaleData(localeFr);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        ToastrModule.forRoot({
            timeOut: 6000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'fr-FR'},
        {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        AUTH_TOKEN_INTERCEPTOR
        /*{
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }*/
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
