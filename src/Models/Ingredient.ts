export type Ingredient = {
    IdIngredient: number;
    Nom: string;
    PlatsIds:number[];
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