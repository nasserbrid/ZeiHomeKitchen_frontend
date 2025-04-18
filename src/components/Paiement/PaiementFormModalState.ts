import { PaiementMoyen, PaiementStatus} from "../../Models/Paiement";
import { Reservation } from "../../Models/Reservation";
export type PaiementFormModalState = {
  montant: number;
  moyen: PaiementMoyen;
  statut: PaiementStatus;
  error: string | null;
  loading: boolean;
  success: boolean;
  reservationCreated?: Reservation;
}