import { Reservation } from "../../Models/Reservation";

export type ReservationPageFormState ={
    dateReservation: Date,
    nom:string,
    prenom:string,
    adresse:string,
    nombrePersonnes: number,
    platIds: number[],
    error: string | null;
    loading: boolean;
    successMessage: string;
    idUtilisateur: number;
    reservationCreated: Reservation | null;
    showPaymentModal:boolean;
  }