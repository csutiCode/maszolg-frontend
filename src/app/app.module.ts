import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { ClassificationComponent } from './components/classification/classification.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './components/news/news.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ListComponent,
    LoginComponent,
    RegComponent,
    AccountDetailsComponent,
    ClassificationComponent,
    UpdateFormComponent,
    LoggedInComponent,
    NewsComponent,
    DataProtectionComponent,
    ContactComponent,
    FaqComponent,
    PasswordUpdateComponent
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    NgMultiSelectDropDownModule,
    NgbModule,
    BrowserAnimationsModule
    

  ],
  providers: [
    [CookieService],
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ]
    

  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
