import { Plat } from "../Models/Plat";

import { Ingredient } from "../Models/Ingredient";

export default interface IPlatsService {
  GetPlats(): Promise<Plat[]>;
  GetPlatByD(idPlat: number): Promise<Plat>;
  // GetPlatIdIngredients(idPlat: number): Promise<Ingredient[]>;
  GetIngredientsByPlatId(idPlat: number): Promise<Ingredient[]>;
}
