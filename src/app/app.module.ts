import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app.routing.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpErrorInterceptor } from './commons/interceptor/http-error.interceptor';
import { UserModule } from './modules/user/user-admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 20, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    appRoutes
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
