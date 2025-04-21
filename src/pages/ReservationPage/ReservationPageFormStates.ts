import { ReservationFront } from './../../Models/Reservation';
// import { ReservationFront } from "../../Models/Reservation";

export type ReservationPageFormState ={
    DateReservation: Date,
    Nom:string,
    Prenom:string,
    Adresse:string,
    NombrePersonnes: number,
    PlatIds: number[],
    error: string | null;
    loading: boolean;
    successMessage: string;
    IdUtilisateur: number;
    reservationCreated: ReservationFront | null;
    showPaymentModal:boolean;
  }