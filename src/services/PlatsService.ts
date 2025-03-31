import { ingredientsByPlatSchema } from './../Schema.Json.Validator/IngredientsByPlat.Schema.json.validator';
import { platListSchema } from './../Schema.Json.Validator/PlatList.Schema.json.validator';
import { Constants } from "../Constants/constant";
import { Ingredient } from "../Models/Ingredient";
import { Plat } from "../Models/Plat";
import IPlatsService from "./IPlatsService";
import Ajv,{ ValidateFunction } from 'ajv';


import { platSchema } from '../Schema.Json.Validator/Plat.Schema.json.validator';

export default class PlatsService implements IPlatsService {
  private ajv: Ajv;
  private validatePlatList: ValidateFunction;
  private validatePlat: ValidateFunction;
  private validateIngredientsByPlat: ValidateFunction;

  /**
   * Constructeur de la classe PlatsService.
   * Initialise Ajv et compile les schémas JSON pour la validation des données.
   */
  constructor() {
    this.ajv = new Ajv();
    this.validatePlatList = this.ajv.compile(platListSchema);
    this.validatePlat = this.ajv.compile(platSchema);
    this.validateIngredientsByPlat = this.ajv.compile(ingredientsByPlatSchema);
  }

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
      console.error("Fetch error", error);
      throw new Error("Une erreur s'est produite lors du fetch des données");
    }
  }

  /**
   * Méthode qui récupère une liste de plats depuis l'API
   * @returns
   */
  public async GetPlats(): Promise<Plat[]> {
    try {
      const plats = await this.fetchData<Plat[]>(`${Constants.API_URL_PLATS}`);
      
      // Validation des données
      const valid = this.validatePlatList(plats);
      if (!valid) {
        console.error(this.validatePlatList.errors);
        throw new Error("Les données des plats ne sont pas conformes au schéma");
      }

      console.log(plats);
      return plats;
    } catch (error) {
      console.error("N'arrive pas à récupérer tous les plats", error);
      return Promise.reject(error);
    }
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

      // Validation des données
      const valid = this.validatePlat(platById);
      if (!valid) {
        console.error(this.validatePlat.errors);
        throw new Error("Les données du plat ne sont pas conformes au schéma");
      }

      console.log(platById);
      return platById;
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

      // Validation des données
      const valid = this.validateIngredientsByPlat(platIdIngredient);
      if (!valid) {
        console.error(this.validateIngredientsByPlat.errors);
        throw new Error("Les données des ingrédients ne sont pas conformes au schéma");
      }

      console.log(platIdIngredient);
      return platIdIngredient;
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
