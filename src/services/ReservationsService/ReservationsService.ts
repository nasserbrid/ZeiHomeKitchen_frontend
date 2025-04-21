import Ajv, { ValidateFunction } from "ajv";
import { Constants } from "../../Constants/constant";
import { ReservationSchema } from "../../Schema.Json.Validator/Reservation/Reservation.Schema.json.validator";
import { ReservationForPlatsSchema } from "../../Schema.Json.Validator/Reservation/ReservationForPlats.Schema.json.validator";
import { ReservationListSchema } from "../../Schema.Json.Validator/Reservation/ReservationList.Schema.json.validator";
import { fromApi, Reservation, ReservationFromApi, ReservationFront } from "../../Models/Reservation";
import { CreateReservationSchema } from "../../Schema.Json.Validator/Reservation/CreateReservation.Schema.json.validator";
import IReservationsService from "./IReservationsService";

export default class ReservationsService implements IReservationsService {
  private ajv: Ajv;
  private validateReservation: ValidateFunction;
  private validateReservationList: ValidateFunction;
  private validateReservationForPlats: ValidateFunction;
  private validateCreateReservation: ValidateFunction;

  constructor() {
    this.ajv = new Ajv();

    
    this.ajv.addFormat('date-time', {
      type: 'string',
      validate: (x) => {
          const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?(Z|[+-]\d{2}:\d{2})?$/;
          return regex.test(x);
      }
    });

    this.validateReservation = this.ajv.compile(ReservationSchema);
    this.validateReservationList = this.ajv.compile(ReservationListSchema);
    this.validateReservationForPlats = this.ajv.compile(ReservationForPlatsSchema);
    this.validateCreateReservation = this.ajv.compile(CreateReservationSchema);
  }

  private async fetchDataReservation<T>(url: string): Promise<T> {
   
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        mode: "cors",
      });

      // if (!response.ok) {
       
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Request failed");
      // }
      console.log(`response fetchDataReservation  : ${response}`);

      if (!response.ok) {
        const errorText = await response.text(); // Lire le texte brut
        console.error("Erreur lors de la récupération des données :", errorText);
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
          "Authorization": `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(data),
      });
      
      // Cloner la réponse pour pouvoir la lire plusieurs fois
      const responseClone = response.clone();
      console.log(`response fetchDataRequest reservation  : ${response.status} - ${await responseClone.text()}`);
  
      if (!response.ok) {
        const errorData = await response.json().catch(async () => {
          return { message: await response.text() }; 
        });
        console.error("Error lors de la reservation de(s) plat(s)", errorData);
        throw new Error(errorData.message || "Request failed");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Fetch error", error);
      throw new Error("Une erreur s'est produite lors de l'envoie des données de reservation de(s) plat(s)");
    }
  }
  
  

  public async GetAllReservations(): Promise<Reservation[]> {
    try {
      const reservations = await this.fetchDataReservation<Reservation[]>(`${Constants.API_URL_RESERVATIONS}`);

     
      const valid = this.validateReservationList(reservations);
      if (!valid) {
        console.error(this.validateReservationList.errors);
        throw new Error("Les données des reservations ne sont pas conformes au schéma");
      }

      console.log("reservations :", reservations);
      return Promise.resolve(reservations);
    } catch (error) {
      console.error("N'arrive pas à récupérer toutes les reservations", error);
      return Promise.reject(error);
    }
  }

  public async GetReservationById(idReservation: number): Promise<Reservation> {
    try {
      const reservationById = await this.fetchDataReservation<Reservation>(`${Constants.API_URL_RESERVATIONS}/${idReservation}`);

      const valid = this.validateReservation(reservationById);
      if (!valid) {
        console.error(this.validateReservation.errors);
        throw new Error("Les données de la réservation ne sont pas conformes au schéma");
      }

      console.log("reservationById :", reservationById);
      return Promise.resolve(reservationById);
    } catch (error) {
      console.error("N'arrive pas à récupérer une seule réservation par son id", error);
      return Promise.reject(error);
    }
  }

  public async GetReservationForPlats(idReservation: number): Promise<Reservation> {
    try {
      const reservationForPlats = await this.fetchDataReservation<Reservation>(`${Constants.API_URL_RESERVATIONS}/${idReservation}/plats`);

      // Validation des données
      const valid = this.validateReservationForPlats(reservationForPlats);
      if (!valid) {
        console.error(this.validateReservationForPlats.errors);
        throw new Error("Les données des ingrédients ne sont pas conformes au schéma");
      }

      console.log("reservationForPlats:",reservationForPlats);
      return Promise.resolve(reservationForPlats);
    } catch (error) {
      console.error("N'arrive pas à récupérer les ingrédients pour une réservation", error);
      return Promise.reject(error);
    }
  }

  public async CreateReservation(reservation: Reservation): Promise<ReservationFront> {
    try {
      
      console.log('Données avant validation :', reservation);
      console.log('Type de NombrePersonnes:', typeof reservation.NombrePersonnes);
      console.log('Type de DateReservation:', typeof reservation.DateReservation);
      console.log("Type de Statut:", typeof reservation.Statut);
      console.log("Valeur de Statut:", reservation.Statut);

      console.log('Données à valider :', reservation);

      // Validation avant envoi
      const isValid = this.validateCreateReservation(reservation);
      console.log('Validation résultat:', isValid);
      if (!isValid) {
        console.error(this.validateCreateReservation.errors);
        throw new Error("Les données de la réservation ne sont pas conformes au schéma");
      }

      // Envoi de la requête avec les données
      const createdReservation = await this.fetchDataRequest<ReservationFromApi>(
        `${Constants.API_URL_RESERVATIONS}`,
        reservation
      );

      console.log("createdReservation",createdReservation);
      return Promise.resolve(fromApi(createdReservation));
    } catch (error) {
      console.error("Erreur lors de la création de la réservation", error);
      return Promise.reject(error);
    }
  }
}
