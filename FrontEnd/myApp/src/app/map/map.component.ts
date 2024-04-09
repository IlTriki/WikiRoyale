import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  showKing: number = 1;

  onMouseMove() {
    this.showKing = 1;
  }
}
