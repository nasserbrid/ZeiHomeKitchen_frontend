import Ajv, { ValidateFunction } from "ajv";
import { Constants } from "../../Constants/constant";
import { Paiement} from "../../Models/Paiement";
import { CreatePaiementSchema } from "../../Schema.Json.Validator/Paiement/CreatePaiement.Schema.json.validator";
import { PaiementSchema } from "../../Schema.Json.Validator/Paiement/Paiement.Schema.json.validator";
import { PaiementListSchema } from "../../Schema.Json.Validator/Paiement/PaiementList.Schema.json.validator";
import IPaiementService from "./IPaiementService";
import { PaiementByReservationIdSchema } from "../../Schema.Json.Validator/Paiement/PaiementByReservationId.Schema.json.validator";

export default class PaiementService implements IPaiementService {
  private ajv: Ajv;
  private validatePaiement: ValidateFunction;
  private validatePaiementList: ValidateFunction;
  private validateCreatePaiement: ValidateFunction;
  private validatePaiementByReservationId: ValidateFunction;

  constructor() {
    this.ajv = new Ajv();
    this.validatePaiement = this.ajv.compile(PaiementSchema);
    this.validatePaiementList = this.ajv.compile(PaiementListSchema);
    this.validateCreatePaiement = this.ajv.compile(CreatePaiementSchema);
    this.validatePaiementByReservationId = this.ajv.compile(PaiementByReservationIdSchema);
  }

  private async fetchDataPaiement<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      console.log(`response fetchDataPaiement  : ${response}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Erreur lors de la récupération des données :",
          errorText
        );
        throw new Error(errorText || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error", error);
      throw new Error("Une erreur s'est produite lors du fetch des données");
    }
  }

  private async fetchDataRequest<T>(url: string, data: object): Promise<T> {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Aucun token trouvé dans localStorage.");
      throw new Error("Token manquant");
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(data),
      });

      //Je clone la réponse pour pouvoir la lire plusieurs fois
      const responseClone = response.clone();
      console.log(
        `response fetchDataRequest paiement  : ${
          response.status
        } - ${await responseClone.text()}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(async () => {
          return { message: await response.text() };
        });
        console.error("Error lors du paiement", errorData);
        throw new Error(errorData.message || "Request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error", error);
      throw new Error(
        "Une erreur s'est produite lors de l'envoie des données de paiements suite à une reservation"
      );
    }
  }

  public async GetAllPaiements(): Promise<Paiement[]> {
    try {
      const paiements = await this.fetchDataPaiement<Paiement[]>(
        `${Constants.API_URL_PAIEMENT}`
      );

      
      const valid = this.validatePaiementList(paiements);
      if (!valid) {
        console.error(this.validatePaiementList.errors);
        throw new Error(
          "Les données des paiements ne sont pas conformes au schéma"
        );
      }

      console.log("paiements (API - PascalCase):", paiements);

      // const paiementFront = paiements.map(fromApi);

      // console.log("paiements (Frontend - camelCase):", paiementFront)
      return Promise.resolve(paiements);
    } catch (error) {
      console.error("N'arrive pas à récupérer tous les paiements", error);
      return Promise.reject(error);
    }
  }

  public async GetPaiementById(idPaiement: number): Promise<Paiement> {
    try {
      const paiementById = await this.fetchDataPaiement<Paiement>(
        `${Constants.API_URL_PAIEMENT}/${idPaiement}`
      );

      const valid = this.validatePaiement(paiementById);
      if (!valid) {
        console.error(this.validatePaiement.errors);
        throw new Error(
          "Les données de paiement ne sont pas conformes au schéma"
        );
      }

      console.log("paiementById (API - PascalCase):", paiementById);
      // const paiementFront = fromApi(paiementById);
      // console.log("paiementById (Frontend - camelCase):", paiementFront);
      return Promise.resolve(paiementById);
    } catch (error) {
      console.error(
        "N'arrive pas à récupérer un seul paiement par son id",
        error
      );
      return Promise.reject(error);
    }
  }

  public async GetPaiementByReservationId(idReservation: number): Promise<Paiement> {
    const url = `${Constants.API_URL_PAIEMENT}/reservation/${idReservation}`;
    console.log("Appel API:", url);
    try {
      console.log("Appel API URL:", `${Constants.API_URL_PAIEMENT}/reservation/${idReservation}`);

      const paiementByReservationId = await this.fetchDataPaiement<Paiement>(url);
      console.log("Réponse brute du backend :", paiementByReservationId);

      console.log("Avant validation JSON", paiementByReservationId);
      const valid = this.validatePaiementByReservationId(paiementByReservationId);
      if (!valid) {
        console.error(this.validatePaiementByReservationId.errors);
        throw new Error(
          "Les données de paiement ne sont pas conformes au schéma"
        );
      }
  
      console.log("paiementByReservationId (API - PascalCase):", paiementByReservationId);
      console.log("Avant transformation:", paiementByReservationId);
      // const paiementFront = fromApi(paiementByReservationId);
      // console.log("Après transformation:", paiementFront);
      // console.log("paiementByReservationId (Frontend - camelCase):", paiementFront);
      return Promise.resolve(paiementByReservationId);
    } catch (error) {
      console.error(
        "N'arrive pas à récupérer le paiement par id de réservation",
        error
      );
      return Promise.reject(error);
    }
      
  }

  public async CreatePaiement(paiement: Paiement): Promise<Paiement> {
    try {
      console.log("Données avant validation :", paiement);
      console.log("Type de Montant:", typeof paiement.montant);
      console.log("Type de Statut:", typeof paiement.statut);
      console.log("Valeur de Statut:", paiement.statut);
      console.log("Type de Moyen:", typeof paiement.moyen);
      console.log("Valeur de Moyen:", paiement.moyen);

      console.log("Données à valider :", paiement);

      // const paiementToSend = toApi(paiement);
      // console.log("Données à valider et envoyer (PascalCase):", paiementToSend);

      // Validation avant envoi
      const isValid = this.validateCreatePaiement(paiement);
      console.log("Validation résultat:", isValid);

      if (!isValid) {
        console.error(this.validateCreatePaiement.errors);
        throw new Error(
          "Les données du paiement de createPaiement ne sont pas conformes au schéma"
        );
      }

      // Envoi de la requête avec les données
      const createdPaiement = await this.fetchDataRequest<Paiement>(
        `${Constants.API_URL_PAIEMENT}`,
        paiement
      );

      console.log("Réponse brute backend (PascalCase):", createdPaiement);
      // const paiementFront = fromApi(createdPaiement);
      return Promise.resolve(paiement);
    } catch (error) {
      console.error("Erreur lors de la création du Paiement", error);
      return Promise.reject(error);
    }
  }
}
