import { AccountService, AuthService, AuthRequest, ConstantsService, ContentService, LoginService } from './shared/services/';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AuthenticateXHRBackend } from '../authenticate-xhr.backend';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './shared/utils/config.service';
import { ContentContainerModule } from './main-content/content-container/content-container.module';
import { FooterComponent } from './main-content/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './main-content/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, XHRBackend } from '@angular/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ErrorGuard } from './guards/error.guard';
import { ErrorModule } from './error/error.module';
import { RootGuard } from './guards/root.guard';
import { BLACKLISTED_ROUTES } from './shared/constants/blacklisted-routes';
import { HeaderHomeComponent } from './main-content/header/header-home/header-home.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './main-content/header/header.module';
import { MainContentRoutingModule } from './main-content/main-content-routing.module';




@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    ContentContainerModule,
    ErrorModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: BLACKLISTED_ROUTES
      }
    }),
    MainContentRoutingModule,
    NgbModule.forRoot(),
    RouterModule,
    HeaderModule,
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    routedComponents,
  ],
  providers: [
    { provide: XHRBackend, useClass: AuthenticateXHRBackend },
    AccountService,
    AuthRequest,
    AuthService,
    ConfigService,
    ConstantsService,
    ContentService,
    ErrorGuard,
    JwtHelperService,
    LoginService,
    RootGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  /* constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  } */
 }

export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

export function nameof(obj) {
  return Object.keys(obj)[0];
}
