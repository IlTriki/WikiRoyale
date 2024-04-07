export type Card = {
    name : string;
    id : number;
    maxLevel : number;
    maxEvolutionLevel : number;
    elixirCost : number;
    type : string;
    iconUrls : CardIcons;
    rarity : string;
}

export type CardIcons = {
    medium: string;
    evolutionMedium?: string;
}