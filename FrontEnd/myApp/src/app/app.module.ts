import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { EmotesComponent } from './emotes/emotes.component';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
import { CardComponent } from './shared/card/card.component';
import { MapComponent } from './map/map.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    EmotesComponent,
    DescriptionComponent,
    CardComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
