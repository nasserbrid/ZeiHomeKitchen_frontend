// pages/PlatsPage/PlatsPage.tsx
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import PlatCard from "../../components/PlatCard/PlatCard";
import { Plat } from "../../Models/Plat";
import PlatsService from "../../services/PlatsService/PlatsService";
import "../../styles/global.css";
import { PlatsPageProps } from "./PlatsPageProps";
import { PlatsPageState } from "./PlatsPageState";

//ici j'utilise le Composant wrapper pour injecter navigate dans PlatsPage
function PlatsPageWrapper(props: PlatsPageProps) {
  const navigate = useNavigate();
  return <PlatsPage {...props} navigate={navigate} />;
}

class PlatsPage extends Component<PlatsPageProps, PlatsPageState> {
  private platsService: PlatsService;

  constructor(props: PlatsPageProps) {
    super(props);
    this.state = {
      plats: [],
      loading: true,
      error: null,
      searchQuery: "",
      selectedPlatIds: []
    };
    this.platsService = new PlatsService();

    //Je lie la méthode handlePlatClick() au contexte de la classe
    this.handlePlatClick = this.handlePlatClick.bind(this);

    //Je lie la méthode handleSearch() au contexte de la classe
    this.handleSearch = this.handleSearch.bind(this);

    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleReservationClick = this.handleReservationClick.bind(this);
    this.togglePlatSelection = this.togglePlatSelection.bind(this);
  }

  public async componentDidMount() {
    await this.fetchPlats();
  }

  public componentDidUpdate(prevProps: PlatsPageProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      //console.log("Mise à jour de searchQuery :", this.props.searchQuery);
      this.setState({ searchQuery: this.props.searchQuery || "" });
    }
  }

  private async fetchPlats(): Promise<void> {
    try {
      // this.setState({ loading: true });
      const response = await this.platsService.GetAllPlats();
      const testTableauData: Plat[] = response.map((item: Plat) => item);
      console.log(`TableauData :${testTableauData}`);
      this.setState({
        plats: testTableauData,
        loading: true,
        error: null,
      });
    } catch (err) {
      this.setState({
        error: "Erreur lors du chargement des plats",
      });
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  private handleSearch(query: string): void {
    this.setState({ searchQuery: query });
  }

  private handlePlatClick(idPlat: number): void {
    // Utilisez la navigation de votre choix (history.push ou window.location)
    // window.location.href = `/plats/${idPlat}`;
    //J'utilise navigate pour ne pas avoir un rechargement complet de la page contrairement à window.location.href
    this.props.navigate?.(`/plats/${idPlat}`);
  }

  private togglePlatSelection(platId: number): void {
    this.setState(prevState => {
      const { selectedPlatIds } = prevState;
      
      // Vérifier si le plat est déjà sélectionné
      const isSelected = selectedPlatIds.includes(platId);
      
      if (isSelected) {
        // Si déjà sélectionné, on le retire
        return {
          selectedPlatIds: selectedPlatIds.filter(id => id !== platId)
        };
      } else {
        // Sinon, on l'ajoute
        return {
          selectedPlatIds: [...selectedPlatIds, platId]
        };
      }
    });
  }

  // private handleReservationClick(): void {
  //   console.log("Réserver le plat");
  //   //window.location.href = '/reservation';
  //   this.props.navigate?.("/reservation");
  // }

  private handleReservationClick(): void {
    const { selectedPlatIds } = this.state;
    
    if (selectedPlatIds.length === 0) {
      alert("Veuillez sélectionner au moins un plat avant de réserver.");
      return;
    }
    
    // Stocker les plats sélectionnés dans localStorage
    localStorage.setItem('selectedPlatsForReservation', JSON.stringify(selectedPlatIds));
    
    console.log("Plats sélectionnés pour réservation:", selectedPlatIds);
    this.props.navigate?.("/reservation");
  }

  private handleBackClick(): void {
    console.log("Retour au catalogue");
    //window.history.back();
    this.props.navigate?.("/catalogue");
  }

  render() {
    //Initialisation de l'état
    const { plats, loading, error } = this.state;

    // Je vérifie le contenu de plats
    console.log("Plats:", plats);
    //Je vérifie l'état de chargement
    console.log("Loading:", loading);
    //Jé vérifie s'il y a  une erreur
    console.log("Error:", error);

    if (loading) return <div className="loading">Chargement des plats...</div>;
    if (error) return <div className="error">{error}</div>;

    //console.log("searchQuery reçu par PlatsPage :", this.state.searchQuery);
    const filteredPlats = this.state.plats.filter((plat) =>
      //"i" signifie insensible à la casse
      new RegExp(this.state.searchQuery, "i").test(
        //.normalize("NFD").replace(/[\u0300-\u036f]/g, "") permet d'ignorer les accents.
        plat.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Ignore les accents
      )
    );

    //console.log("Plats après filtrage :", filteredPlats);

    return (
      <div className="home-container">
        <div className="welcome-header">
          <h1 className="main-title">Catalogue de plats</h1>
        </div>

        {/* Barre d'information pour les plats sélectionnés */}
      {this.state.selectedPlatIds.length > 0 && (
        <div className="selected-plats-info">
          <p>{this.state.selectedPlatIds.length} plat(s) sélectionné(s)</p>
          <button 
            className="reserve-selected-button"
            onClick={this.handleReservationClick}
          >
            Réserver les plats sélectionnés
          </button>
        </div>
      )}


        <div className="plat-container">
          {filteredPlats.map((plat) => (
            <PlatCard
              key={plat.idPlat}
              plat={plat}
              onPlatClick={() => this.handlePlatClick(plat.idPlat)}
              onReserverClick={this.handleReservationClick}
              onBackClick={this.handleBackClick}
              onToggleSelection={this.togglePlatSelection}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlatsPageWrapper;
