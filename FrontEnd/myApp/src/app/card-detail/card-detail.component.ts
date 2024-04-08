import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { CardInfo } from '../shared/types/card-detail.type';
import { Card } from '../shared/types/card.type';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit{
  private readonly _backendURL: any;
  private _cardInfo: CardInfo | null = null;
  private _card: Card | null = null;
  private _cardName: string|null = null;


  constructor(private _http: HttpClient, private _route: ActivatedRoute) {
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
    this._cardName = this._route.snapshot.paramMap.get('name');

    if (this._cardName) {
      this._http.get<CardInfo>(`${this._backendURL.cardDetailByName}/${this._cardName}`).subscribe({
        next: (cardInfo: CardInfo) => {
          this._cardInfo = cardInfo;
          this._http.get<Card>(`${this._backendURL.cardByName}/${this._cardName}`).subscribe({
            next: (card: Card) => this._card = card,
            error: (error: any) => console.error('Error fetching card:', error)
          });
        },
        error: (error: any) => console.error('Error fetching card info:', error)
      });
    }
  }

  get cardInfo(): CardInfo | null {
    return this._cardInfo;
  }

  get card(): Card | null {
    return this._card;
  }

  get cardName(): string | null {
    return this._cardName;
  }
}
