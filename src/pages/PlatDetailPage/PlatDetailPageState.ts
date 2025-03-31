import { Ingredient } from "../../Models/Ingredient";
import {Plat } from "../../Models/Plat";

export type PlatDetailPageState ={
  plat: (Plat & { ingredients: Ingredient[] }) | null;
  loading: boolean;
  error: string | null;
}
