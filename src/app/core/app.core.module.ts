import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UserService
} from './services/index';
import {
    UserFactory
} from './factories/index';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        HttpModule,
        BrowserAnimationsModule, // required animations module
    ],
    exports: [
    ],
    providers: [
        UserService,
        UserFactory
    ]
})
export class AppCoreModule {
}
