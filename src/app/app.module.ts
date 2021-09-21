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
import { MyClassificationsComponent } from './components/my-classifications/my-classifications.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { ProfessionComponent } from './components/profession/profession.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    MyClassificationsComponent,
    ProfessionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    NgMultiSelectDropDownModule,
    NgbModule 


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
