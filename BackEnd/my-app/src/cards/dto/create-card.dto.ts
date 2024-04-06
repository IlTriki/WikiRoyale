import { CardIconsDTO } from "./card-icons.dto";

export class CreateCardDTO {
    readonly name : string;
    readonly id : number;
    readonly maxLevel : number;
    readonly maxEvolutionLevel : number;
    readonly elixirCost : number;
    readonly iconUrls : CardIconsDTO;
    readonly rarity : string;
}