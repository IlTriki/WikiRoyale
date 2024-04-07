import { Component, Input } from '@angular/core';
import { SortCriteria } from '../enums/sort.enum';
import { Card } from '../types/card.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;
  currentSortCriteria: SortCriteria = SortCriteria.Name;

  // Function to change sort criteria
  changeSortCriteria(criteria: SortCriteria): void {
    this.currentSortCriteria = criteria;
  }
}
