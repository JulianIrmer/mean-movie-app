import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { DetailsComponent } from './details/details.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    DetailsComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
