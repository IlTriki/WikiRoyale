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

  /**
   * Check if Card already exists and add it in cards list
   *
   * @param Card to create
   *
   * @returns {Observable<Card>}
   */
//   create = (Card: CreateCardDTO): Observable<Card> =>
//     from(this._cards).pipe(
//       find(
//         (CardFound: Card) =>
//           CardFound.lastname.toLowerCase() ===
//             Card.lastname.toLowerCase() &&
//           CardFound.firstname.toLowerCase() ===
//             Card.firstname.toLowerCase(),
//       ),
//       mergeMap((CardFound: Card) =>
//         !!CardFound
//           ? throwError(
//               () =>
//                 new ConflictException(
//                   `People with lastname '${Card.lastname}' and firstname '${Card.firstname}' already exists`,
//                 ),
//             )
//           : this._addCard(Card),
//       ),
//     );

  /**
   * Add Card with good data in cards list
   *
   * @param Card to add
   *
   * @returns {Observable<Card>}
   *
   * @private
   */
//   private _addCard = (Card: CreateCardDTO): Observable<Card> =>
//     of({
//       ...Card,
//       id: this._createId(),
//       birthDate: this._parseDate('06/05/1985').toString(),
//       photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
//     } as Partial<Card>).pipe(
//       tap(
//         (createdCard: Card) =>
//           (this._cards = this._cards.concat(createdCard)),
//       ),
//     );
}
