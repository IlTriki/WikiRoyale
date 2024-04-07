import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmotesService } from './emotes.service';
import { Emote } from './emotes.types';

@Controller('emotes')
export class EmotesController {
    /**
     * Class constructor
     * @param _emotesService
     */
    constructor(private readonly _emotesService: EmotesService) {}

    /**
     * Handler to answer to /people route
     *
     * @returns Observable<Emote[] | void>
     */
    @Get()
    findAll(): Observable<Emote[] | void> {
    return this._emotesService.findAll();
    }

    /**
     * Handler to answer to /people/random route
     *
     * @returns Observable<Emote | void>
     */
    @Get('random')
    findRandom(): Observable<Emote | void> {
    return this._emotesService.findRandom();
    }

    /**
     * Handler to answer to /people/:id route
     *
     * @returns Observable<Emote>
     */
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Emote> {
    return this._emotesService.findOne(id.toString());
    }

}