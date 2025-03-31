import { Constants } from "../Constants/constant";
import { Ingredient } from "../Models/Ingredient";
import { Plat } from "../Models/Plat";

import IPlatsService from "./IPlatsService";

export default class PlatsService implements IPlatsService {
  /**
   * Méthode qui récupère les données
   * @param url
   * @returns
   */
  private async fetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Feth erro", error);
      throw new Error("Une erreur s'est produite lors du fetch de la data");
    }
  }

  /**
   * Méthode qui récupère une liste de plats depuis l'API
   * @returns
   */
  public async GetPlats(): Promise<Plat[]> {
    try {
      const plats = await this.fetchData<Plat[]>(`${Constants.API_URL_PLATS}`);
      console.log(plats);
      return Promise.resolve(plats);
    } catch (error) {
      console.error("N'arrive pas à récupérer tous les plats", error);
      return Promise.reject(error);
    }
    // return await this.fetchData<PlatResponse>(`${Constants.API_URL_PLATS}`);
  }

  /**
   * Méthode qui récupère un plat par son ID.
   * @param idPlat
   * @returns
   */
  public async GetPlatByD(idPlat: number): Promise<Plat> {
    try {
      const platById = await this.fetchData<Plat>(
        `${Constants.API_URL_PLATS}/${idPlat}`
      );
      console.log(platById);
      return Promise.resolve(platById);
    } catch (error) {
      console.error("N'arrive pas à récupérer un seul plat par son id", error);
      return Promise.reject(error);
    }
  }

  /**
   * Méthode qui récupère les ingrédients associés à un plat.
   * @param idPlat
   * @returns
   */
  public async GetIngredientsByPlatId(idPlat: number): Promise<Ingredient[]> {
    try {
      const platIdIngredient = await this.fetchData<Ingredient[]>(
        `${Constants.API_URL_PLATS}/${idPlat}/ingredients`
      );
      console.log(platIdIngredient);
      return Promise.resolve(platIdIngredient);
    } catch (error) {
      console.error(
        "N'arrive pas à récupérer les ingrédients pour un plat",
        error
      );
      return Promise.reject(error);
    }
  }

  // public async GetPlatIdWithIngredients(idPlat: number): Promise<PlatIdWithIngredientsResponse>
  // {
  //   return await this.fetchData<PlatIdWithIngredientsResponse>(
  //     `${Constants.API_URL_PLATS}/${idPlat}/with-ingredients`
  //   );
  // }
}
