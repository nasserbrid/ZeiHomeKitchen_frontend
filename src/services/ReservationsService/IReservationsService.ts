import { Reservation } from "../../Models/Reservation";

export default interface IReservationsService {
  GetAllReservations(): Promise<Reservation[]>;
  GetReservationById(IdReservation: number): Promise<Reservation>;
  GetReservationForPlats(IdReservation: number): Promise<Reservation>;
  CreateReservation(reservation: Reservation): Promise<Reservation>;
}
