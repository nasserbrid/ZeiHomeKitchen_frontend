import { Component, FormEvent } from "react";
import {
  PaiementMoyen,
  PaiementStatus,
} from "../../Models/Paiement";
import PaiementService from "../../services/PaiementService/PaiementService";
import { PaiementFormModalProps } from "./PaiementFormModalProps";
import { PaiementFormModalState } from "./PaiementFormModalState";

export default class PaiementFormModal extends Component<
  PaiementFormModalProps,
  PaiementFormModalState
> {
  private paiementService = new PaiementService();

  constructor(props: PaiementFormModalProps) {
    super(props);
    this.state = {
      // montant:0,
      montant: props.paiement?.montant ?? 0,
      moyen: PaiementMoyen.CB,
      statut: PaiementStatus.EnAttente,
      error: null,
      // loading: true,
      loading: false,
      success: false,
    };
  }

  // Dans PaiementFormModal.tsx, ajoute cette méthode componentDidMount
  async componentDidMount() {
    try {
      // Si un montant est déjà défini dans les props, on l'utilise
      if (this.state.montant > 0) {
        return;
      }
      
      console.log(`idReservation : ${this.props.idReservation}`);

      // Sinon, on récupère le paiement associé à la réservation
      if (this.props.idReservation) {
      this.setState({ loading: true });

        try {
          // Utilisation de la nouvelle méthode pour récupérer par ID de réservation
          const paiement =
            await this.paiementService.GetPaiementByReservationId(
              this.props.idReservation
            );
          console.log("Paiement brut reçu :", paiement);

          // Conversion backend → frontend
          // const paiementFront = fromApi(paiement);
          // console.log("Paiement transformé :", paiementFront);

          if (paiement) {
            console.log("Paiement récupéré:", paiement);
            this.setState({
              montant: paiement.montant,
              statut: paiement.statut,
              moyen: paiement.moyen,
            });
          }

          console.log(`Données après envoi : ${paiement.montant}`);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération du paiement par ID de réservation:",
            error
          );
          this.setState({ error: "Impossible de récupérer le paiement" });
        } finally {
          this.setState({ loading: false });
        }
      }
    } catch (error) {
      console.error("Erreur générale:", error);
      this.setState({ error: "Une erreur s'est produite", loading: false });
    }
  }

  // async componentDidMount() {
  //   if (!this.props.idReservation) {
  //     this.setState({ error: "ID de réservation manquant", loading: false });
  //     return;
  //   }

  //   try {
  //     // Récupération du paiement par l'ID de réservation
  //     const paiement = await this.paiementService.GetPaiementByReservationId(
  //       this.props.idReservation
  //     );

  //     console.log("Paiement reçu:", paiement);

  //     // Conversion backend → frontend
  //     const paiementFront = fromApi(paiement);
  //     console.log("Paiement transformé :", paiementFront);
      

  //     if (paiementFront) {
  //       this.setState({
  //         montant: paiementFront.montant, // Utilisez directement la propriété telle que retournée par l'API
  //         statut: paiementFront.statut,
  //         moyen: paiementFront.moyen,
  //         loading: false
  //       });
  //     } else {
  //       this.setState({ 
  //         error: "Impossible de récupérer le paiement", 
  //         loading: false 
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération du paiement:", error);
  //     this.setState({ 
  //       error: "Erreur lors de la récupération du paiement", 
  //       loading: false 
  //     });
  //   }
  // }

  private async handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { montant } = this.state;
  
    if (!montant || montant <= 0) {
      this.setState({ error: "Montant invalide ou manquant." });
      return;
    }
  
    console.log("Montant récupéré, en attente de la logique de paiement backend.");
    this.props.onClose(); // Tu peux retirer ça si tu veux garder la modale ouverte après clic
  }
  

  // private async handleSubmit(e: FormEvent) {
  //   e.preventDefault();
  //   const { montant, moyen, statut } = this.state;

  //   try {
  //     if (!montant || montant <= 0) {
  //       this.setState({ error: "Montant invalide ou manquant." });
  //       return;
  //     }

  //     this.setState({ loading: true });

  //     const newPaiement: Paiement = {
  //       IdPaiement: 0, // ou laisse-le vide si auto-généré
  //       Montant: montant,
  //       Statut: statut,
  //       Moyen: moyen,
  //       IdReservation: this.props.idReservation,
  //     };

  //     console.log(`Données du paiement avant envoi : ${newPaiement}`);

  //     // await this.paiementService.CreatePaiement(newPaiement);

  //     await this.paiementService.GetPaiementByReservationId(
  //       this.props.idReservation
  //     );

  //     console.log(`Paiement crée : ${newPaiement}`);
  //     console.log(`Montant après création paiement : ${newPaiement.Montant}`);

  //     if (newPaiement) {
  //       console.log("Paiement effectué avec succès pour le montant :", montant);
  //       this.setState({ success: true });
  //       this.props.onClose();
  //     }
  //   } catch (error) {
  //     console.log("Erreur:", error);
  //     this.setState({
  //       error: "error lors de la création du paiement",
  //       loading: false,
  //     });
  //   }
  // }

 
  

  render() {
    console.log("reservationCreated :", this.state.reservationCreated);
    console.log("reservationCreated:", this.props.idReservation);

    const { onClose } = this.props;
    const { montant, moyen, error, loading } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">
          <h3>Paiement</h3>
          {/* {loading ? (
          <p>Chargement du montant en cours...</p>
        ) : (
          <> */}
          {error && <p className="error">{error}</p>}
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>Montant :</label>
            <input
              type="number"
              value={montant}
              readOnly
              // onChange={(e) =>
              //   this.setState({ montant: parseFloat(e.target.value) })
              // }
              required
            />
            <label>Moyen de Paiement :</label>
            <select
              value={moyen}
              onChange={(e) =>
                this.setState({ moyen: e.target.value as PaiementMoyen })
              }
            >
              <option value={PaiementMoyen.CB}>Carte Bancaire</option>
              <option value={PaiementMoyen.PayPal}>PayPal</option>
            </select>

            <div className="modal-actions">
              <button type="submit" disabled={loading}>
                Payer
              </button>
              <button type="button" onClick={onClose}>
                Annuler
              </button>
            </div>
          </form>
          {/* </>
        )} */}
        </div>
      </div>
    );
  }
}
