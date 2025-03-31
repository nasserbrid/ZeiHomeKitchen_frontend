export type Ingredient = {
    idIngredient: number;
    nom: string;
    platsIds:number[];
  }

export type IngredientResponse = {
    ingredients:Ingredient[];
  }


export type IngredientById = {
    idIngredient: number;
    nom: string;
    platsIds:number[];
  }


export type IngredientByIDResponse = {
    ingredientID: Ingredient;
}