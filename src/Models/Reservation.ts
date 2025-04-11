
export enum ReservationStatus {
    EnAttente = "EnAttente",
    Confirmee = "Confirmee",
    Annulee = "Annulee",
}


export type Reservation ={
    IdReservation: number;
    DateReservation: string;
    Adresse: string;
    Statut: string;
    Nom: string;
    Prenom: string;
    NombrePersonnes: number;
    PlatIds: number[];  
}




