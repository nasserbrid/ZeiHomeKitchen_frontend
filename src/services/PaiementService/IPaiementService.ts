import {Paiement} from "../../Models/Paiement";

export default interface IPaiementService {
  GetAllPaiements(): Promise<Paiement[]>;
  GetPaiementById(idPaiement: number): Promise<Paiement>;
  CreatePaiement(paiement: Paiement): Promise<Paiement>;
  GetPaiementByReservationId(idReservation: number): Promise<Paiement>;
}
