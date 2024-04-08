import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { find, from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as CARDS from '../data/cards.json';
import { Card } from './cards.types';

@Injectable()
export class CardsService {
    // private property to store all cards
  private _cards: Card[];

  /**
   * Class constructor
   */
  constructor() {
    this._cards = [].concat(CARDS.items).map((card) => ({
        ...card,
        }));
  }

  /**
   * Returns all existing cards in the list
   *
   * @returns {Observable<Card[] | void>}
   */
  findAll = (): Observable<Card[] | void> =>
    of(this._cards).pipe(
      map((cards: Card[]) =>
        !!cards && !!cards.length ? cards : undefined,
      ),
    );

  /**
   * Returns randomly one Card of the list
   *
   * @returns {Observable<Card | void>}
   */
  findRandom = (): Observable<Card | void> =>
    of(this._cards[Math.round(Math.random() * this._cards.length)]).pipe(
      map((Card: Card) => (!!Card ? Card : undefined)),
    );

  /**
   * Returns one Card of the list matching name in parameter
   *
   * @param {string} name of the Card
   *
   * @returns {Observable<Card>}
   */
  findOne = (name: string): Observable<Card> =>
    from(this._cards).pipe(
      find((Card: Card) => Card.name.toLowerCase() === name.toLowerCase()),
      mergeMap((Card: Card) =>
        !!Card
          ? of(Card)
          : throwError(
              () => new NotFoundException(`Card with name '${name}' not found`),
            ),
      ),
    );

    findByElixir = (elixir: number): Observable<Card[]> =>
      of(this._cards).pipe(
        map((cards: Card[]) =>
          cards.filter((card: Card) => card.elixirCost == elixir),
        ),
      );
    
    findByRarity = (rarity: string): Observable<Card[]> =>
      of(this._cards).pipe(
        map((cards: Card[]) =>
          cards.filter((card: Card) => card.rarity.toLowerCase() === rarity.toLowerCase()),
        ),
      );

    findByType = (type: string): Observable<Card[]> =>
      of(this._cards).pipe(
        map((cards: Card[]) =>
          cards.filter((card: Card) => card.type.toLowerCase() === type.toLowerCase()),
        ),
      );

  /**
   * Check if Card already exists and add it in cards list
   *
   * @param Card to create
   *
   * @returns {Observable<Card>}
   */
}
