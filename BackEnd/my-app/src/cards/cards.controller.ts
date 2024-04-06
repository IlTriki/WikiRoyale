import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CardsService } from './cards.service';
import { Card } from './cards.types';

@Controller('cards')
export class CardsController {
    /**
     * Class constructor
     * @param _cardsService
     */
    constructor(private readonly _cardsService: CardsService) {}

    /**
     * Handler to answer to /people route
     *
     * @returns Observable<Card[] | void>
     */
    @Get()
    findAll(): Observable<Card[] | void> {
    return this._cardsService.findAll();
    }

    /**
     * Handler to answer to /people/random route
     *
     * @returns Observable<Card | void>
     */
    @Get('random')
    findRandom(): Observable<Card | void> {
    return this._cardsService.findRandom();
    }

    /**
     * Handler to answer to /people/:id route
     *
     * @returns Observable<Card>
     */
    @Get(':name')
    findOne(@Param('name') name: string): Observable<Card> {
    return this._cardsService.findOne(name);
    }

    /**
     * Handler to answer to /people route
     *
     * @param createCardDto
     *
     * @returns Observable<Card>
     */
    // @Post()
    // create(@Body() createCardDto: CreateCardDTO): Observable<Card> {
    // return this._cardsService.create(createCardDto);
    // }
}