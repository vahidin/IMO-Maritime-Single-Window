import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfigService } from './shared/utils/config.service';
import { AuthenticateXHRBackend } from '../authenticate-xhr.backend';
import { LoginService } from './shared/services/login.service';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ContentService } from './shared/services/content.service';
import { HeaderComponent } from './main-content/header/header.component';
import { ContentContainerModule } from './main-content/content-container/content-container.module';
import { AccountService } from './shared/services/account.service';
import { AuthRequest } from './shared/services/auth.request.service';
import { AuthService } from './shared/services/auth-service';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/confirmation-modal.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginAuthGuard } from './auth/guards/login-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ContentContainerModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: XHRBackend, useClass: AuthenticateXHRBackend },
    ConfigService,
    LoginService,
    AccountService,
    ContentService,
    AuthService,
    AuthRequest,
    AuthGuard,
    LoginAuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
