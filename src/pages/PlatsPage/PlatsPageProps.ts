import { NavigateFunction } from "react-router-dom";
//import { Plat } from "../../Models/Plat";

export interface PlatsPageProps {
  //plats: Plat[];
  //Ajout de navigate dans PlatsPageProps mais elle sera optionnelle.
  navigate?: NavigateFunction;
  searchQuery: string;
}
