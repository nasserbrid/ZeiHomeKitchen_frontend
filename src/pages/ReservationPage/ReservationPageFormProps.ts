import IReservationsService from "../../services/ReservationsService/IReservationsService";
import IUserService from "../../services/User/IUserService";

export interface ReservationPageFormProps {
 
  reservationService:IReservationsService
  userService: IUserService
}