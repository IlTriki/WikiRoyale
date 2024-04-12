import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Card } from '../shared/types/card.type';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})
export class DeckComponent {
  private _cards: Card[];
  private _deck: Card[];
  private readonly _backendURL: any;

  constructor(private _http: HttpClient, private _route: ActivatedRoute) {
    this._cards = [];
    this._deck = [];
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
    this._http.get<Card[]>(this._backendURL.allCards).subscribe({
      next: (cards: Card[]) => this._cards = cards,
      error: (error: any) => console.error('Error fetching cards:', error)
    });
  }

  get cards(): Card[] {
    return this._cards;
  }

  get deck(): Card[] {
    return this._deck;
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

  addToDeck(card: Card): void {
    // si la page est "/cards" la fonction ne fait rien
    if (this._route.snapshot.routeConfig && this._route.snapshot.routeConfig.path === 'cards') {
      return;
    }
    if (this.deck.length < 8 && !this._deck.includes(card)){
        const index = this._cards.findIndex(c => c.id === card.id);
        if (index !== -1) {
            this._cards.splice(index, 1);
            this._deck.push(card);
        }
    } else {
        alert('Le deck est rempli !');
    }
  }

  removeFromDeck(card: Card, event: MouseEvent): void {
    event.preventDefault();
    const index = this._deck.findIndex(c => c.id === card.id);
    if (index !== -1) {
        this._deck.splice(index, 1);
        this._cards.push(card);
    }
  }

  exportDeck(): void {
    if (this.deck.length == 8) {
      let url = 'https://link.clashroyale.com/deck/fr/?deck=';
      this.deck.forEach(element => {
        url += `${element.id};`;
      });
      window.open(url, '_blank');
    } else {
      alert('Le deck n\'est pas rempli !');
    }
  }

  moyenneElixir(): number {
    let sum = 0;
    this._deck.forEach(element => {
      element.elixirCost != 0 ? sum += element.elixirCost : 0;
    });
    return sum == 0 ? 0 : parseFloat((sum / this._deck.length).toFixed(1));
  }

  emptySlots(): number[] {
    const totalSlots = 8;
    const filledSlots = this.deck.length;
    return Array(totalSlots - filledSlots).fill(0);
  }

  getRandomCard(): Observable<Card> {
    return this._http.get<Card>(this._backendURL.randomCard).pipe(
      concatMap((card: Card) => {
        this.addToDeck(card);
        return of(card);
      })
    );
  }

  populateRandomDeck(): void {
    this._cards.push(...this._deck);
    this._deck = [];
  
    // fonction recursive parce que avec un while ca crash le browser et vs code, et avec un for ca laisse des slots vides dans le deck à cause des duplicats
    const addRandomCard = () => {
      if (this._deck.length < 8) {
        this.getRandomCard().subscribe({
          complete: () => addRandomCard(),
          error: (error: any) => console.error('Error adding random card:', error)
        });
      }
    };
  
    addRandomCard();
  }
}
