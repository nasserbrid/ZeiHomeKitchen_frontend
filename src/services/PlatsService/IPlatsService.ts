import { Plat } from "../../Models/Plat";

import { Ingredient } from "../../Models/Ingredient";

export default interface IPlatsService {
  GetAllPlats(): Promise<Plat[]>;
  GetPlatByID(idPlat: number): Promise<Plat>;
  // GetPlatIdIngredients(idPlat: number): Promise<Ingredient[]>;
  GetIngredientsByPlatId(idPlat: number): Promise<Ingredient[]>;
}
