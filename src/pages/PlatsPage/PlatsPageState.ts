import { Plat } from "../../Models/Plat";

export type PlatsPageState ={
  plats: Plat[];
  loading: boolean;
  error: string | null;
}
