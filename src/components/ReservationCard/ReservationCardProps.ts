import { Reservation } from "../../Models/Reservation";

export interface ReservationCardProps { 
    reservation : Reservation;
  onReservationClick: (PlatIds: number) => void;
}