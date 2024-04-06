export type Card = {
    name : string;
    id : number;
    maxLevel : number;
    maxEvolutionLevel : number;
    elixirCost : number;
    iconUrls : CardIcons;
    rarity : string;
}

export type CardIcons = {
    medium: string;
    evolutionMedium?: string;
}