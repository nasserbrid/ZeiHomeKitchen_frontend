import { Paiement } from "../../Models/Paiement";

export interface PaiementFormModalProps {
  paiement?: Paiement;
  idReservation: number;
  onClose: () => void;
}
