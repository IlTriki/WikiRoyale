import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  private _speeches = [
    "Bienvenue sur Clash Royale...c'est parti !",
    "Vous trouverez ici toutes les cartes que vous pouvez utiliser immediatement !",
    "Detruisez les tours de votre adversaire pour gagner !",
    "Votre prochaine carte se trouve ici !",
    "Vous ne disposez que de 10 elixirs maximum, utilisez les avec sagesse !"];
  private _kingSpeech: string = this._speeches[0];

  get kingSpeech(): string {
    return this._kingSpeech;
  }

  onMouseMove() {
    this._kingSpeech = this._speeches[0];
  }

  setSpeech(index: number) {
    this._kingSpeech = this._speeches[index];
  }
}
