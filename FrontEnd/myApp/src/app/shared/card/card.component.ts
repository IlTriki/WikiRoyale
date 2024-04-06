import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../types/card.type';

@Component({
  selector: 'nwt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // private property to store card value
  private _card: Card;

  /**
   * Component constructor
   */
  constructor() {
    this._card = {} as Card;
  }

  /**
   * Returns private property _card
   */
  get card(): Card {
    return this._card;
  }

  /**
   * Sets private property _card
   */
  @Input()
  set card(card: Card) {
    this._card = card;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }
}
