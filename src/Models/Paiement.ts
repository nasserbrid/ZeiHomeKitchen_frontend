export enum PaiementStatus {
  EnAttente = "EnAttente",
  Valide = "Valide",
  Echoue = "Echoue",
}

export enum PaiementMoyen {
  CB = "CB",
  PayPal = "PayPal",
}

export type Paiement = {
  idPaiement: number;
  montant: number;
  statut: PaiementStatus;
  moyen: PaiementMoyen;
  idReservation: number;
};

export type PaiementFront = {
  idPaiement: number;
  montant: number;
  statut: PaiementStatus;
  moyen: PaiementMoyen;
  idReservation: number;
};

export function fromApi(p: Paiement): PaiementFront {
  console.log("fromApi - p:", p);
  return {
    idPaiement: p.idPaiement,
    montant: p.montant,
    statut: p.statut,
    moyen: p.moyen,
    idReservation: p.idReservation,
  };
}

export function toApi(p: PaiementFront): Paiement {
  return {
    idPaiement: p.idPaiement,
    montant: p.montant,
    statut: p.statut,
    moyen: p.moyen,
    idReservation: p.idReservation,
  };
}


