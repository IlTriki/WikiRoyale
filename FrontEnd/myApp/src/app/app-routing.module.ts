import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardsComponent } from './cards/cards.component';
import { DeckComponent } from './deck/deck.component';
import { DescriptionComponent } from './description/description.component';
import { EmotesComponent } from './emotes/emotes.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'cards/elixir/:elixirValue', component: CardsComponent },
  { path: 'cards/rarity/:rarity', component: CardsComponent },
  { path: 'cards/type/:type', component: CardsComponent },
  { path: 'cards/detail/:name', component: CardDetailComponent },
  { path: 'emotes', component: EmotesComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'map', component: MapComponent },
  { path: 'deck', component: DeckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }