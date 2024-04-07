import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Card } from '../shared/types/card.type';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private _cards: Card[];
  private readonly _backendURL: any;
  private elixirValue: string | null = null;

  constructor(private _http: HttpClient, private _route: ActivatedRoute) {
    this._cards = [];
    this._backendURL = {};

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  ngOnInit(): void {
    const elixirValue = this._route.snapshot.paramMap.get('elixirValue');
  
    if (elixirValue) {
      const url = `${this._backendURL.elixir}/${elixirValue}`;
      this._http.get<Card[]>(url).subscribe({
        next: (cards: Card[]) => this._cards = cards,
        error: (error: any) => console.error('Error fetching cards:', error)
      });
    } else {
      this._http.get<Card[]>(this._backendURL.allCards).subscribe({
        next: (cards: Card[]) => this._cards = cards,
        error: (error: any) => console.error('Error fetching cards:', error)
      });
    }
  }  

  get cards(): Card[] {
    return this._cards;
  }

  getAllCards(): void {
    this._http.get<Card[]>(this._backendURL.allCards)
      .subscribe(cards => {
        this._cards = cards;
        this.sortCards('default');
      });
  }

  getCardsByType(type: string): Card[] {
    return this._cards.filter(c => c.type === type);
  }

  getCardsByElixir(elixir: string): void {
    this._http.get<Card[]>(`${this._backendURL.cardsByElixir}/${elixir}`)
      .subscribe(cards => {
        this._cards = cards;
        this.sortCards('default');
      });
  }

  sortCards(criteria: string): void {
    switch(criteria) {
        case 'name':
            this._cards.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'elixir':
            this._cards.sort((a, b) => a.elixirCost - b.elixirCost);
            break;
        case 'rarity':
            const rarityOrder: { [key: string]: number } = {
                'champion': 0,
                'legendary': 1,
                'epic': 2,
                'rare': 3,
                'common': 4
            };
            this._cards.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
            break;
        default:
            this._cards.sort((a, b) => a.id - b.id);
    }
  }

  onSortChange(event: any): void {
    const selectedValue = event.target.value;
    this.sortCards(selectedValue);
  }
}
