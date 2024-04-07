import { EmoteIconsDTO } from './emote-icons.dto';

export class CreateEmoteDTO {
    readonly id : number;
    readonly iconUrls : EmoteIconsDTO;
}