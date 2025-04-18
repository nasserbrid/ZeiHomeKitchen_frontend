import { ChangeEvent, Component, FormEvent } from "react";
import { ReservationStatus } from "../../Models/Reservation";
import IUserService from "../../services/User/IUserService";
import "../../styles/global.css";
import { ReservationPageFormProps } from "./ReservationPageFormProps";
import { ReservationPageFormState } from "./ReservationPageFormStates";
import PaiementFormModal from "../../components/Paiement/PaiementFormModal";

class ReservationPageForm extends Component<
  ReservationPageFormProps,
  ReservationPageFormState
> {
  constructor(props: ReservationPageFormProps) {
    super(props);

    this.state = {
      DateReservation: new Date(),
      Nom: "",
      Prenom: "",
      Adresse: "",
      NombrePersonnes: 0,
      PlatIds: [],
      error: null,
      loading: false,
      successMessage: "",
      IdUtilisateur: 0,
      reservationCreated: null, 
      showPaymentModal: false,  
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  // Méthode pour gérer les changements d'input
  private handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    const newValue = name === "NombrePersonnes" ? parseInt(value, 10) : value;
    this.setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }

  private handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = new Date(e.target.value);
    this.setState({ DateReservation: selectedDate });
  }

  // Méthode pour gérer la soumission du formulaire
  private async handleSubmit(event: FormEvent) {
    event.preventDefault();
    const {
      DateReservation,
      Nom,
      Prenom,
      Adresse,
      NombrePersonnes,
      IdUtilisateur,
      PlatIds,
    } = this.state;

    if (NombrePersonnes <= 0) {
      this.setState({
        error: "Le nombre de personnes doit être supérieur à 0.",
      });
      return;
    }

    if (!Nom.trim()) {
      this.setState({ error: "Le nom est requis." });
      return;
    }

    if (!Prenom.trim()) {
      this.setState({ error: "Le prénom est requis." });
      return;
    }

    if (!Adresse.trim()) {
      this.setState({ error: "L'adresse est requise." });
      return;
    }

    //Je vérifie que des plats ont été sélectionnés
    if (!PlatIds || PlatIds.length === 0) {
      this.setState({ error: "Veuillez sélectionner au moins un plat." });
      return;
    }

    // Construction de l'objet selon le format attendu par le backend
    const reservationData = {
      IdReservation: 0,
      DateReservation: DateReservation.toISOString(),
      Adresse,
      Statut: ReservationStatus.Confirmee,
      Nom,
      Prenom,
      NombrePersonnes,
      // PlatIds: PlatIds.length > 0 ? PlatIds : [0],
      PlatIds: PlatIds,
      IdUtilisateur: IdUtilisateur,
    };

    console.log("Statut:", ReservationStatus.Annulee);

    console.log("Données de réservation avant envoi:", reservationData);

    this.setState({ loading: true, error: null });

    try {
      const createdReservation = await this.props.reservationService.CreateReservation(reservationData);
      console.log("Réservation créée:", createdReservation);
    
      if (!createdReservation || createdReservation.IdReservation <=0) {
        throw new Error("La réservation n'a pas pu être créée correctement.");
      }

      console.log("createdReservation retournée:", createdReservation);
      this.setState({
        successMessage: "Réservation créée avec succès !",
        // Réinitialisation du formulaire
        Nom: "",
        Prenom: "",
        Adresse: "",
        NombrePersonnes: 0,
        DateReservation: new Date(),
        reservationCreated: createdReservation,
        // Affichage de la pop-up pour le paiement
        showPaymentModal: true,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      this.setState({
        error: "Une erreur est survenue lors de la création de la réservation. Veuillez réessayer.",
      });
    } finally {
      this.setState({ loading: false });
    }
    
  }

  // Méthode appelée lors du montage du composant pour charger les informations utilisateur et les réservations
  public async componentDidMount() {
    try {
      // Récupération de l'utilisateur courant
      const userService: IUserService = this.props.userService;
      const currentUser = await userService.getCurrentUser();

      if (currentUser) {
        console.log("Utilisateur récupéré:", currentUser);

        // Conversion de l'ID utilisateur en nombre
        const userId = parseInt(currentUser.id);
        if (!isNaN(userId)) {
          this.setState({
            IdUtilisateur: userId,
            Nom: currentUser.Nom || "",
            Prenom: currentUser.Prenom || "",
          });
          console.log(`ID Utilisateur défini: ${userId}`);
        } else {
          console.error(
            "L'ID utilisateur n'est pas un nombre valide:",
            currentUser.id
          );
        }
      } else {
        console.warn("Aucun utilisateur connecté");
      }

      // Récupérer les plats sélectionnés de localStorage
      const selectedPlatsJson = localStorage.getItem(
        "selectedPlatsForReservation"
      );
      if (selectedPlatsJson) {
        const selectedPlatIds = JSON.parse(selectedPlatsJson);
        if (Array.isArray(selectedPlatIds) && selectedPlatIds.length > 0) {
          // Mise à jour de l'état avec les plats sélectionnés
          this.setState({ PlatIds: selectedPlatIds });
          console.log("Plats sélectionnés récupérés:", selectedPlatIds);
        }
      }

      // Récupération des réservations (pour référence ou affichage)
      const reservations =
        await this.props.reservationService.GetAllReservations();
        
      console.log("Réservations récupérées:", reservations);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  }
  // public async componentDidMount() {
  //     try {
  //         // Récupération de l'utilisateur courant pour obtenir l'ID
  //         const userService: IUserService = await this.props.userService; // Assurez-vous que userService est passé en props
  //         const currentUser = await userService.getCurrentUser(); // Récupération de l'utilisateur actuel
  //         if (currentUser) {
  //             this.setState({ IdUtilisateur: parseInt(currentUser.id) }); // Mise à jour de l'ID utilisateur
  //             this.setState({ Prenom: currentUser.Prenom });
  //         }

  //         // Récupération des réservations depuis le service de réservation
  //         const reservations = await this.props.reservationService.GetAllReservations();
  //         console.log(`reservations : ${reservations}`);
  //     } catch (error) {
  //         console.error("Erreur lors du chargement des réservations", error); // Journalisation de l'erreur
  //     }
  // }

  
  // Méthode de rendu du composant
  public render() {
    const {
      DateReservation,
      Nom,
      Prenom,
      Adresse,
      NombrePersonnes,
      error,
      loading,
      successMessage,
    } = this.state;

    return (
      <div className="content">
        <h1>Réserver votre repas à domicile</h1>
        <div className="reservation-form">
          <h2 className="form-title">Réserver votre repas à domicile</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="Nom"
                placeholder="Nom"
                value={Nom}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="Prenom"
                placeholder="Prenom"
                value={Prenom}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="Adresse"
                placeholder="Adresse"
                value={Adresse}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="NombrePersonnes"
                placeholder="Nombre de Personnes"
                value={NombrePersonnes}
                onChange={this.handleChange}
                min="1"
                max="20"
                required
              />
            </div>

            <input
              type="datetime-local"
              name="DateReservation"
              value={DateReservation.toISOString().slice(0, 16)} // format pour input datetime-local
              onChange={this.handleDateChange}
              required
            />

            <div className="form-group">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Chargement..." : "Réserver maintenant"}
              </button>
            </div>
          </form>

          
         
          {this.state.showPaymentModal && this.state.reservationCreated && (
  <PaiementFormModal
    idReservation={this.state.reservationCreated.idReservation}  
    onClose={() => this.setState({ showPaymentModal: false })}
  />
)}

          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

export default ReservationPageForm;
