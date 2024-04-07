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
  private rarityValue: string | null = null;
  private typeValue: string | null = null;

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
    this.elixirValue = this._route.snapshot.paramMap.get('elixirValue');
    this.rarityValue = this._route.snapshot.paramMap.get('rarity');
    this.typeValue = this._route.snapshot.paramMap.get('type');
  
    if (this.elixirValue) {
      const url = `${this._backendURL.elixir}/${this.elixirValue}`;
      this._http.get<Card[]>(url).subscribe({
        next: (cards: Card[]) => this._cards = cards,
        error: (error: any) => console.error('Error fetching cards:', error)
      });
    } else if (this.rarityValue) {
      const url = `${this._backendURL.rarity}/${this.rarityValue}`;
      this._http.get<Card[]>(url).subscribe({
        next: (cards: Card[]) => this._cards = cards,
        error: (error: any) => console.error('Error fetching cards:', error)
      });
    } else if (this.typeValue) {
      this._http.get<Card[]>(`${this._backendURL.type}/${this.typeValue}`).subscribe({
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

  get elixir(): string | null {
    return this.elixirValue;
  }

  get rarity() : string | null {
    return this.rarityValue;
  }

  get type() : string | null {
    return this.typeValue;
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
