import { Component, Input } from '@angular/core';
import { Card } from '../types/card.type';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  @Input() card!: Card;
}
