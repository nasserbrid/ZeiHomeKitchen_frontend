
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

export type ReservationFromApi = {
    idReservation: number;
    dateReservation: string;
    adresse: string;
    statut: string;
    nom: string;
    prenom: string;
    nombrePersonnes: number;
    platIds: number[];
    idUtilisateur: number;
  };
  
  
  // Conversion de l'API vers le format front-end
// export function fromApi(r: Reservation): ReservationFront {
//   console.log("Date reçue :", r.DateReservation);

//   // const parsedDate = new Date(r.DateReservation);
//   // if (isNaN(parsedDate.getTime())) {
//   //   throw new Error(`Date invalide reçue de l'API : ${r.DateReservation}`);
//   // }
//     return {
//       idReservation: r.IdReservation,
//       dateReservation: new Date(r.DateReservation).toISOString(), 
//       // dateReservation: parsedDate.toISOString(),  
//       adresse: r.Adresse,
//       statut: r.Statut,
//       nom: r.Nom,
//       prenom: r.Prenom,
//       nombrePersonnes: r.NombrePersonnes,
//       platIds: r.PlatIds,
//       idUtilisateur: r.IdUtilisateur,
//     };
//   }


  
  // // Conversion du format front-end vers l'API
  // export function toApi(r: ReservationFront): Reservation {
  //   return {
  //     IdReservation: r.idReservation,
  //     DateReservation: new Date(r.dateReservation).toISOString(),
  //       // Conversion de la Date en chaîne
  //     Adresse: r.adresse,
  //     Statut: r.statut,
  //     Nom: r.nom,
  //     Prenom: r.prenom,
  //     NombrePersonnes: r.nombrePersonnes,
  //     PlatIds: r.platIds,
  //     IdUtilisateur: r.idUtilisateur,
  //   };
  // }
  
  export function fromApi(r: ReservationFromApi): ReservationFront {
    console.log("fromApi reçu :", r); 
  
    if (!r.dateReservation) {
      throw new Error(`Date invalide reçue de l'API : ${r.dateReservation}`);
    }
  
    const parsedDate = new Date(r.dateReservation);
  
    
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Date invalide reçue de l'API : ${r.dateReservation}`);
    }
  
    // Conversion de statut (string => ReservationStatus)
    let statut: ReservationStatus;
    if (Object.values(ReservationStatus).includes(r.statut as ReservationStatus)) {
      statut = r.statut as ReservationStatus;
    } else {
      throw new Error(`Statut invalide reçu de l'API : ${r.statut}`);
    }
  
    return {
      idReservation: r.idReservation,
      dateReservation: parsedDate.toISOString(), 
      adresse: r.adresse,
      statut: statut,  
      nom: r.nom,
      prenom: r.prenom,
      nombrePersonnes: r.nombrePersonnes,
      platIds: r.platIds,
      idUtilisateur: r.idUtilisateur,
    };
  }
  
  // Conversion du format front-end vers l'API
  export function toApi(r: ReservationFront): Reservation {
    return {
      IdReservation: r.idReservation,
      DateReservation: new Date(r.dateReservation).toISOString(), 
      Adresse: r.adresse,
      Statut: r.statut, 
      Nom: r.nom,
      Prenom: r.prenom,
      NombrePersonnes: r.nombrePersonnes,
      PlatIds: r.platIds,
      IdUtilisateur: r.idUtilisateur,
    };
  }




