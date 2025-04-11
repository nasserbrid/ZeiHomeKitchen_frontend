export type ReservationPageFormState ={
    DateReservation: Date,
    Nom:string,
    Prenom:string,
    Adresse:string,
    NombrePersonnes: number,
    PlatIds: number[],
    error: string | null;
    loading: boolean;
    successMessage: string;
    IdUtilisateur: number
  }