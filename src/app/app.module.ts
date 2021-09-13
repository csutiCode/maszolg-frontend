import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './components/account/account.component';
import { AboutComponent } from './components/about/about.component';
import { ListComponent } from './components/list/list.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchComponent,
    HomeComponent,
    FooterComponent,
    AccountComponent,
    AboutComponent,
    ListComponent,
    LoginComponent,
    RegComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
