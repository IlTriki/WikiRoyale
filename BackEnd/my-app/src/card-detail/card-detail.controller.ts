import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CardDetailService } from './card-detail.service';
import { CardInfo } from './cardsInfo.types';


@Controller('card-detail')
export class CardDetailController {
    /**
     * Class constructor
     * @param _cardDetailService
     */
    constructor(private readonly _cardDetailService: CardDetailService) {}

    /**
     * Handler to answer to /card-detail route
     *
     * @returns Observable<CardInfo[] | void>
     */
    @Get()
    findAll(): Observable<CardInfo[] | void> {
    return this._cardDetailService.findAll();
    }

    /**
     * Handler to answer to /card-detail/:id route
     *
     * @returns Observable<CardInfo>
     */
    @Get('name/:name')
    findOne(@Param('name') name: string): Observable<CardInfo> {
    return this._cardDetailService.findOne(name);
    }
}