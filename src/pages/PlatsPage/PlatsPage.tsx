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
    };
    this.platsService = new PlatsService();

    //Je lie la méthode handlePlatClick() au contexte de la classe
    this.handlePlatClick = this.handlePlatClick.bind(this);
  }

  public async componentDidMount() {
    await this.fetchPlats();
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

    console.log("Plats:", plats); // Vérifier le contenu de plats
    console.log("Loading:", loading); // Vérifier l'état de chargement
    console.log("Error:", error); // Vérifier l'erreur

    if (loading) return <div className="loading">Chargement des plats...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
      <div className="home-container">
        <div className="welcome-header">
          <h1 className="main-title">Catalogue de plats</h1>
        </div>

        <div className="plat-container">
          {plats.map((plat) => (
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
