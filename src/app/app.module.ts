import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule} from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinners/loading-spinner/loading-spinner.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
