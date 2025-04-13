//import { Ingredient } from "./Ingredient";
// import { Ingredient } from "./Ingredient";

export type Plat ={
    idPlat: number;
    nom: string;
    description?: string;
    prix: number;
    image?: string;
    imageBase64?: string;
    ingredientIds: number[];
    //ReservationIds: number[];
    
}

// Mettre à jour l'interface pour correspondre aux types de votre API
// export type PlatResponse = {
//     plats: Plat[];
// }

export type PlatByID = {
    idPlat: number;
    nom: string;
    description?: string;
    prix: number;
    image?: string;
    imageBase64?: string;
    ingredientIds: number[];
}

// export type PlatByIDResponse = {
//     platID: Plat;
// }

export type IngredientsByPlatId = {
    idIngredient: number;
    nom: string;
    platIds: number[];
}

// export type PlatIdIngredientsResponse = {
//     ingredients: Ingredient[]; 
// }

// export type PlatWithIngredients ={
//     idPlat: number;
//     nom: string;
//     description?: string;
//     image?: string;
//     prix: number;
//     ingredientIds: number[];
//     ingredients?: Ingredient[];
//     imageBase64?: string;
//     //id: number; // Alias pour idPlat pour compatibilité
// }

// export type PlatIdWithIngredientsResponse = {
//     plat: PlatWithIngredients;
// }

// export type Plat = {
//     idPlat: number;
//     nom: string;
//     description?: string;
//     prix: number;
//     image?: string;
//     imageBase64?: string;
//     ingredientIds:number[];
//   }

//   export type PlatResponse = {
//     plats:Plat[];
//   }

// export type PlatByID = {
//     idPlat: number;
//     nom: string;
//     description?: string;
//     prix: number;
//     image?: string;
//     imageBase64?: string;
//     ingredientIds:number[];
// }

// export type PlatByIDResponse = {
//     platID: Plat;
// }

// export type PlatIdIngredients = {
//     idIngredient: number;
//     nom: string;
//     platIds:number[];
// }

// export type PlatIdIngredientsResponse = {
//     ingredients: Ingredient[]; 
// }

// export type PlatWithIngredients = {
//     idPlat: number;
//     nom: string;
//     description?: string;
//     image?: string;
//     prix: number;
//     ingredientIds:number[];
//     ingredients?: Ingredient[];
//     imageBase64?: string;
// }

// export type PlatIdWithIngredientsResponse = {
//     plat: PlatWithIngredients;
// }