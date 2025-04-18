
export enum ReservationStatus {
    EnAttente = "EnAttente",
    Confirmee = "Confirmee",
    Annulee = "Annulee",
}


export type Reservation ={
    IdReservation: number;
    DateReservation: string;
    Adresse: string;
    Statut: ReservationStatus;
    Nom: string;
    Prenom: string;
    NombrePersonnes: number;
    PlatIds: number[];
    IdUtilisateur: number;  
}

export type ReservationFront = {
    idReservation: number;
    dateReservation: string;
    adresse: string;
    statut: ReservationStatus;
    nom: string;
    prenom: string;
    nombrePersonnes: number;
    platIds: number[];
    idUtilisateur: number;
  };
  
  // Conversion de l'API vers le format front-end
export function fromApi(r: Reservation): ReservationFront {
    return {
      idReservation: r.IdReservation,
      dateReservation: new Date(r.DateReservation).toISOString(),  // Conversion de la chaîne en Date
      adresse: r.Adresse,
      statut: r.Statut,
      nom: r.Nom,
      prenom: r.Prenom,
      nombrePersonnes: r.NombrePersonnes,
      platIds: r.PlatIds,
      idUtilisateur: r.IdUtilisateur,
    };
  }
  
  // Conversion du format front-end vers l'API
  export function toApi(r: ReservationFront): Reservation {
    return {
      IdReservation: r.idReservation,
      DateReservation: new Date(r.dateReservation).toISOString(),  // Conversion de la Date en chaîne
      Adresse: r.adresse,
      Statut: r.statut,
      Nom: r.nom,
      Prenom: r.prenom,
      NombrePersonnes: r.nombrePersonnes,
      PlatIds: r.platIds,
      IdUtilisateur: r.idUtilisateur,
    };
  }
  
  




