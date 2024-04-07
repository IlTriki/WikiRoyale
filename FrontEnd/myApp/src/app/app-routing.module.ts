import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { DescriptionComponent } from './description/description.component';
import { EmotesComponent } from './emotes/emotes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'cards/elixir/:elixirValue', component: CardsComponent },
  { path: 'cards/:name', component: CardsComponent },
  { path: 'emotes', component: EmotesComponent },
  { path: 'description', component: DescriptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }