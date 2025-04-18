import { PaiementFront } from "../../Models/Paiement";

export interface PaiementFormModalProps {
  paiement?: PaiementFront;
  idReservation: number;
  onClose: () => void;
}
