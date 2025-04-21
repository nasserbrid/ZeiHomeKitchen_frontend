import { Reservation, ReservationFront } from "../../Models/Reservation";
export default interface IReservationsService {
  GetAllReservations(): Promise<Reservation[]>;
  GetReservationById(idReservation: number): Promise<Reservation>;
  GetReservationForPlats(idReservation: number): Promise<Reservation>;
  CreateReservation(reservation: Reservation): Promise<ReservationFront>;
}
