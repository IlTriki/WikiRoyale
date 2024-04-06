export class Card {
    name : string;
    id : number;
    maxLevel : number;
    maxEvolutionLevel : number;
    elixirCost : number;
    iconUrls : CardIcons;
    rarity : string;
}

export class CardIcons {
    medium: string;
    evolutionMedium?: string;
}