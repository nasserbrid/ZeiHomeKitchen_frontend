import { Plat } from "../../Models/Plat";

import { Ingredient } from "../../Models/Ingredient";

export default interface IPlatsService {
  GetAllPlats(): Promise<Plat[]>;
  GetPlatByID(IdPlat: number): Promise<Plat>;
  // GetPlatIdIngredients(idPlat: number): Promise<Ingredient[]>;
  GetIngredientsByPlatId(IdPlat: number): Promise<Ingredient[]>;
}
