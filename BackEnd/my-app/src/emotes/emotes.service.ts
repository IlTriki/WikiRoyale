import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { find, from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as EMOTES from '../data/emotes.json';
import { Emote } from './emotes.types';

@Injectable()
export class EmotesService {
    // private property to store all emotes
  private _emotes: Emote[];

  /**
   * Class constructor
   */
  constructor() {
    this._emotes = [].concat(EMOTES.items).map((emote) => ({
        ...emote,
        }));
  }

  /**
   * Returns all existing emotes in the list
   *
   * @returns {Observable<Card[] | void>}
   */
  findAll = (): Observable<Emote[] | void> =>
    of(this._emotes).pipe(
      map((emotes: Emote[]) =>
        !!emotes && !!emotes.length ? emotes : undefined,
      ),
    );

  /**
   * Returns randomly one Emote of the list
   *
   * @returns {Observable<Emote | void>}
   */
  findRandom = (): Observable<Emote | void> =>
    of(this._emotes[Math.round(Math.random() * this._emotes.length)]).pipe(
      map((Emote: Emote) => (!!Emote ? Emote : undefined)),
    );

  /**
   * Returns one Emote of the list matching name in parameter
   *
   * @param {string} id of the Emote
   *
   * @returns {Observable<Emote>}
   */
  findOne = (id: string): Observable<Emote> =>
    from(this._emotes).pipe(
      find((Emote: Emote) => Emote.id.toString() === id),
      mergeMap((Emote: Emote) =>
        !!Emote
          ? of(Emote)
          : throwError(
              () => new NotFoundException(`Emote with id '${id}' not found`),
            ),
      ),
    );
}