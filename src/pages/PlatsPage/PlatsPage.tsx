// pages/PlatsPage/PlatsPage.tsx
import { Component } from "react";
import PlatCard from "../../components/PlatCard/PlatCard";
import { Plat } from "../../Models/Plat";
import PlatsService from "../../services/PlatsService";
import "../../styles/global.css";
import { PlatsPageProps } from "./PlatsPageProps";
import { PlatsPageState } from "./PlatsPageState";
import { useNavigate } from "react-router-dom";

//ici j'utilise le // Composant wrapper pour injecter navigate dans PlatsPage
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
    };
    this.platsService = new PlatsService();

    //Je lie la méthode handlePlatClick() au contexte de la classe
    this.handlePlatClick = this.handlePlatClick.bind(this);

    //Je lie la méthode handleSearch() au contexte de la classe
    this.handleSearch = this.handleSearch.bind(this);
  }

  public async componentDidMount() {
    await this.fetchPlats();
  }

  public componentDidUpdate(prevProps: PlatsPageProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      console.log("Mise à jour de searchQuery :", this.props.searchQuery);
      this.setState({ searchQuery: this.props.searchQuery || "" });
    }
  }

  private async fetchPlats(): Promise<void> {
    try {
      // this.setState({ loading: true });
      const response = await this.platsService.GetPlats();
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

  private handleSearch(query: string): void 
  {
    this.setState({ searchQuery: query });
  }
  

  private handlePlatClick(idPlat: number): void
  {
    // Utilisez la navigation de votre choix (history.push ou window.location)
    // window.location.href = `/plats/${idPlat}`;
    //J'utilise navigate pour ne pas avoir un rechargement complet de la page contrairement à window.location.href
    this.props.navigate?.(`/plats/${idPlat}`);
  };

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

    console.log("searchQuery reçu par PlatsPage :", this.state.searchQuery);
    const filteredPlats = this.state.plats.filter((plat) =>
      //"i" signifie insensible à la casse
      new RegExp(this.state.searchQuery, "i").test(
        //.normalize("NFD").replace(/[\u0300-\u036f]/g, "") permet d'ignorer les accents.
        plat.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Ignore les accents
      )
      
    );

    console.log("Plats après filtrage :", filteredPlats);
    

    return (
      <div className="home-container">
        <div className="welcome-header">
          <h1 className="main-title">Catalogue de plats</h1>
        </div>

        <div className="plat-container">
          {filteredPlats.map((plat) => (
            <PlatCard
              key={plat.idPlat}
              plat={plat}
              onPlatClick={() => this.handlePlatClick(plat.idPlat)}
              // onPlatClick={this.handlePlatClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlatsPageWrapper;
