import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { find, from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as CARDS_INFO from '../data/cards_info.json';
import { CardInfo } from './cardsInfo.types';

@Injectable()
export class CardDetailService {
    // private property to store all cardsInfo
    private _cardsInfo: CardInfo[];
  
    /**
     * Class constructor
     */
    constructor() {
      this._cardsInfo = [].concat(CARDS_INFO).map((cardInfo) => ({
          ...cardInfo,
          }));
    }
  
    /**
     * Returns all existing cardsInfo in the list
     *
     * @returns {Observable<CardInfo[] | void>}
     */
    findAll = (): Observable<CardInfo[] | void> =>
      of(this._cardsInfo).pipe(
        map((cardsInfo: CardInfo[]) =>
          !!cardsInfo && !!cardsInfo.length ? cardsInfo : undefined,
        ),
      );
  
    /**
     * Returns one CardInfo of the list matching name in parameter
     *
     * @param {string} name of the CardInfo
     *
     * @returns {Observable<CardInfo>}
     */
    findOne = (name: string): Observable<CardInfo> =>
      from(this._cardsInfo).pipe(
        find((CardInfo: CardInfo) => CardInfo.name.toLowerCase() === name.toLowerCase()),
        mergeMap((CardInfo: CardInfo) =>
          !!CardInfo
            ? of(CardInfo)
            : throwError(
                () => new NotFoundException(`CardInfo with name '${name}' not found`),
              ),
        ),
      );
}