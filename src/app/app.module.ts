import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from '../CacheInterceptor';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule, MatSnackBarModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { SnackbarComponent } from './showvalidationinfo/component/snackbar/snackbar.component';




// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};
const routes: Routes = [

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SignupComponent,
    RegisterComponent,
    SnackbarComponent
  ],
  entryComponents:[SnackbarComponent],
  imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  HttpModule,
  ReactiveFormsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    }
  }),  
  RouterModule.forRoot(routes, { useHash: true }) ,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }/*{provide: LocationStrategy, useClass: HashLocationStrategy}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
