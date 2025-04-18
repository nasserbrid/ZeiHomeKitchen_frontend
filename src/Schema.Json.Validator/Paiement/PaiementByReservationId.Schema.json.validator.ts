export const PaiementByReservationIdSchema = {
    type: "object",
    properties: {
      idPaiement: { type: "number" },
      montant: { type: "number" },
      statut: { type: "string" },
      moyen: { type: "string" },
      idReservation: { type: "number" },
    },
    required: ["idPaiement", "montant", "statut", "moyen", "idReservation"],
    additionalProperties: false,
  };