import { ChangeEvent, Component, FormEvent } from "react";
import IUserService from "../../services/User/IUserService";
import "../../styles/global.css";
import { ReservationPageFormProps } from "./ReservationPageFormProps";
import { ReservationPageFormState } from "./ReservationPageFormStates";
import { ReservationStatus } from "../../Models/Reservation";

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
  };

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

    // Construction de l'objet selon le format attendu par le backend
    const reservationData = {
      IdReservation: 0,
      DateReservation: DateReservation.toISOString(),
      Adresse,
      Statut: ReservationStatus.Annulee,
      Nom,
      Prenom,
      NombrePersonnes,
      PlatIds: PlatIds.length > 0 ? PlatIds : [0],
      IdUtilisateur: IdUtilisateur 
    };

    console.log("Statut:", ReservationStatus.Annulee); 


    console.log("Données de réservation avant envoi:", reservationData);

    this.setState({ loading: true, error: null });

    try {
      const createdReservation =
        await this.props.reservationService.CreateReservation(reservationData);
      console.log("Réservation créée:", createdReservation);
      this.setState({
        successMessage: "Réservation créée avec succès !",
        // Réinitialisation le formulaire
        Nom: "",
        Prenom: "",
        Adresse: "",
        NombrePersonnes: 0,
        DateReservation: new Date(),
      });
    } catch (error) {
      console.error("Erreur:", error);
      this.setState({ error: "Erreur lors de la création de la réservation" });
    } finally {
      this.setState({ loading: false });
    }
  }
  // private async handleSubmit(event: FormEvent) {
  //     event.preventDefault(); // Empêche le comportement par défaut du formulaire
  //     const { DateReservation, Nom, Prenom, Adresse, NombrePersonnes, IdUtilisateur, PlatIds } = this.state; // Extraction des valeurs de l'état

  //     if (NombrePersonnes <= 0) {
  //         this.setState({ error: "Le nombre de personnes doit être supérieur à 0." });
  //         return;
  //     }

  //     // Préparation des données de réservation à envoyer au service
  //     const reservationData = {
  //         IdReservation: 0, // À générer par le backend ou une logique
  //         DateReservation: DateReservation.toISOString(), // Conversion au format ISO (string)
  //         Nom,
  //         Prenom,
  //         Adresse,
  //         Statut: "EnAttente", // Statut par défaut de la réservation
  //         IdUtilisateur, // Utilisation de l'ID de l'utilisateur connecté
  //         IdStatistique: undefined, // Ou laisse cette propriété de côté, car elle sera définie côté backend
  //         NombrePersonnes,
  //         PlatIds: PlatIds.length > 0 ? PlatIds : [0] // Tableau des IDs des plats sélectionnés
  //     };

  //     console.log('Données de réservation avant validation :', reservationData);

  //     this.setState({ loading: true, error: null }); // Mise à jour de l'état pour indiquer le début du chargement

  //     try {
  //         const createdReservation = await this.props.reservationService.CreateReservation(reservationData);
  //         console.log(`createdReservation : ${createdReservation}`);
  //         this.setState({ successMessage: "Réservation créée avec succès !" }); // Mise à jour du message de succès
  //     } catch (error) {
  //         this.setState({ error: "Erreur lors de la création d'une réservation" }); // Mise à jour de l'état en cas d'erreur
  //         console.error(error); // Journalisation de l'erreur
  //     } finally {
  //         this.setState({ loading: false }); // Réinitialisation de l'état de chargement
  //     }
  // }

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
