// Schema.Json.Validator/Reservation/ReservationList.Schema.json.validator.ts
export const PaiementListSchema = {
  type: "array",
  items: {
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
  },
};
