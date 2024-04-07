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
     * Handler to answer to /cards route
     *
     * @returns Observable<Card[] | void>
     */
    @Get()
    findAll(): Observable<Card[] | void> {
    return this._cardsService.findAll();
    }

    /**
     * Handler to answer to /cards/random route
     *
     * @returns Observable<Card | void>
     */
    @Get('random')
    findRandom(): Observable<Card | void> {
    return this._cardsService.findRandom();
    }

    /**
     * Handler to answer to /cards/:id route
     *
     * @returns Observable<Card>
     */
    @Get('name/:name')
    findOne(@Param('name') name: string): Observable<Card> {
    return this._cardsService.findOne(name);
    }

    @Get('elixir/:elixir')
    findByElixir(@Param('elixir') elixir: number): Observable<Card[]> {
    return this._cardsService.findByElixir(elixir);
    }

    @Get('rarity/:rarity')
    findByRarity(@Param('rarity') rarity: string): Observable<Card[]> {
    return this._cardsService.findByRarity(rarity);
    }

    @Get('type/:type')
    findByType(@Param('type') type: string): Observable<Card[]> {
    return this._cardsService.findByType(type);
    }

    /**
     * Handler to answer to /cards route
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