import { ReservationFront } from './../../Models/Reservation';
import { PaiementMoyen, PaiementStatus} from "../../Models/Paiement";
export type PaiementFormModalState = {
  montant: number;
  moyen: PaiementMoyen;
  statut: PaiementStatus;
  error: string | null;
  loading: boolean;
  success: boolean;
  reservationCreated?: ReservationFront;
}